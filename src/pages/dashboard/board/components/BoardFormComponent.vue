<script setup>
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch
} from 'vue'
import useBoard from '@/store/boadr.pinia.js'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { Form } from 'ant-design-vue'
import useUpload from '@/store/upload.pinia.js'
import IconLoader from '@/components/icons/IconLoader.vue'
import { useRoute, useRouter } from 'vue-router'
import IconUseEmptyLogo from '@/components/icons/IconUseEmptyLogo.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import useCore from '@/store/core.pinia.js'
import IconEdit from '@/components/icons/IconEdit.vue'

const { t } = useI18n()
const router = useRouter()
const boardPinia = useBoard()
const uploadPinia = useUpload()
const corePinia = useCore()
const useForm = Form.useForm
const { collapsed, loadingUrl } = storeToRefs(corePinia)
const { categories } = storeToRefs(boardPinia)
const imageUrl = ref(null)
const baseUrl = ref(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/`)

const route = useRoute()

const id = ref(null)
const form = reactive({
  link: null,
  categoryId: null,
  name: null,
  description: null,
  logoHashId: null,
  channelId: null
})
const rules = reactive({
  link: [
    {
      required: true,
      message: t('REQUIRED_FIELD'),
      trigger: 'blur'
    }
  ],
  categoryId: [
    {
      required: true,
      message: t('REQUIRED_FIELD'),
      trigger: 'blur'
    }
  ],
  name: [
    {
      required: true,
      message: t('REQUIRED_FIELD'),
      trigger: 'blur'
    }
  ],
  description: [
    {
      required: true,
      message: t('REQUIRED_FIELD'),
      trigger: 'blur'
    }
  ]
})

const uploadLogo = (file) => {
  if (file.type === 'image/jpeg' || file.type === 'image/png') {
    uploadPinia.uploadFile(file, (hashId) => {
      form.logoHashId = hashId
      imageUrl.value = `${baseUrl.value}file/${hashId}`
    })
  }
  return false
}

const { validate, validateInfos } = useForm(form, rules)

const checkChannelByLink = () => {
  validate(['link'])
    .then(() => {
      boardPinia.checkChannel(form.link, (data) => {
        form.name = data.title
        form.description = data.description
        form.logoHashId = data.hashId
        form.channelId = data.id
        imageUrl.value = `${baseUrl.value}file/${data.hashId}`
      })
    })
    .catch(() => {})
}
const addNewBoard = () => {
  if (id.value) {
    validate(['name', 'description', 'logoHashId', 'categoryId'])
      .then(() => {
        boardPinia.updateBoard(id.value, form)
      })
      .catch(() => {})
  } else {
    validate(['name', 'description', 'logoHashId', 'categoryId', 'channelId'])
      .then(() => {
        boardPinia.addNewBoard(form)
      })
      .catch(() => {})
  }
}

onMounted(() => {
  if (route.params.id) {
    id.value = route.params.id
    boardPinia.getOneById(route.params.id, (data) => {
      form.name = data.name
      form.description = data.description
      form.logoHashId = data.logoHashId
      form.channelId = data.id
      form.categoryId = data.category.id
      imageUrl.value = `${baseUrl.value}file/${data.logoHashId}`
    })
  }
})
</script>

<template>
  <a-form layout="vertical" class="form scrollbar-content">
    <a-row :gutter="20" class="mx-0" justify="space-between">
      <a-col>
        <a-form-item>
          <a-spin
            :spinning="
              loadingUrl.has('file/upload') || loadingUrl.has('get/board/one')
            "
          >
            <template #indicator>
              <icon-loader size="small" />
            </template>
            <div class="avatar-uploader">
              <template v-if="form.logoHashId">
                <img :src="imageUrl" alt="avatar" />
              </template>
              <template v-else>
                <div class="logo-empty">
                  <icon-use-empty-logo />
                </div>
              </template>
              <a-upload
                :disabled="!form.channelId"
                class="btn-logo-change"
                name="file"
                :show-upload-list="false"
                :before-upload="uploadLogo"
              >
                <a-button
                  :disabled="
                    !form.channelId ||
                    loadingUrl.has('file/upload') ||
                    loadingUrl.has('get/board/one')
                  "
                  type="primary"
                  shape="circle"
                  size="large"
                  class="avatar-upload-btn"
                >
                  <template #icon>
                    <icon-edit />
                  </template>
                </a-button>
              </a-upload>
            </div>
          </a-spin>
        </a-form-item>
      </a-col>
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="collapsed ? 19 : 18"
        :xl="collapsed ? 20 : 19"
        :xxl="21"
      >
        <a-row :gutter="10">
          <template v-if="!id">
            <a-col :span="24">
              <a-form-item
                :label="$t('CHANNEL_LINK')"
                v-bind="validateInfos.link"
              >
                <a-input-search
                  v-model:value="form.link"
                  allow-clear
                  :placeholder="$t('ENTER_CHANNEL_LINK')"
                  size="large"
                  @search="checkChannelByLink"
                >
                  <template #enterButton>
                    <a-button type="primary">
                      <template v-if="loadingUrl.has('channel/check')">
                        <icon-loader size="small" />
                      </template>
                      <template v-else>
                        <icon-search />
                      </template>
                    </a-button>
                  </template>
                </a-input-search>
              </a-form-item>
            </a-col>
          </template>

          <a-col :xs="24" :sm="24" :md="24" :lg="id ? 24 : 12">
            <a-form-item
              :label="$t('CHANNEL_NAME')"
              v-bind="validateInfos.name"
            >
              <template v-if="loadingUrl.has('get/board/one')">
                <a-skeleton-input style="width: 100%" block active />
              </template>
              <template v-else>
                <a-input
                  v-model:value="form.name"
                  :disabled="!form.channelId"
                  size="large"
                  :placeholder="$t('ENTER_CHANNEL_NAME')"
                />
              </template>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="id ? 24 : 12">
            <a-form-item
              :label="$t('CATEGORY')"
              v-bind="validateInfos.categoryId"
            >
              <template v-if="loadingUrl.has('get/board/one')">
                <a-skeleton-input style="width: 100%" block active />
              </template>
              <template v-else>
                <a-tree-select
                  v-model:value="form.categoryId"
                  show-search
                  :loading="loadingUrl.has('board/category/all')"
                  style="width: 100%"
                  :disabled="!form.channelId"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :placeholder="$t('SELECT_CATEGORY')"
                  size="large"
                  allow-clear
                  tree-default-expand-all
                  :tree-data-simple-mode="[categories]"
                  :tree-data="categories"
                  tree-node-filter-prop="label"
                >
                </a-tree-select>
              </template>
            </a-form-item>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="24">
        <a-form-item
          :label="$t('DESCRIPTION')"
          v-bind="validateInfos.description"
        >
          <template v-if="loadingUrl.has('get/board/one')">
            <a-skeleton active :paragraph="{ rows: 5 }" />
          </template>
          <template v-else>
            <a-textarea
              v-model:value="form.description"
              :placeholder="$t('WRITE_DESCRIPTION')"
              class="description"
              :auto-size="true"
              :disabled="!form.channelId"
            />
          </template>
        </a-form-item>
      </a-col>
    </a-row>
    <div class="btn-group">
      <a-space>
        <a-button @click="router.back()" size="middle">
          {{ $t('BACK') }}
        </a-button>

        <a-button
          class="btn-save"
          @click="addNewBoard"
          :disabled="!form.channelId || loadingUrl.has('board/create')"
          type="primary"
          size="middle"
        >
          <template v-if="loadingUrl.has('board/create')">
            <icon-loader size="small" class="loader" />
          </template>
          <template v-else>
            {{ $t('SAVE') }}
          </template>
        </a-button>
      </a-space>
    </div>
  </a-form>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 162px);
  .description {
    min-height: 200px;
  }
  .btn-group {
    display: flex;
    justify-content: flex-end;
    .loader {
      border-color: $primary !important;
    }

    .btn-save {
      min-width: 90px;
    }
    .btn-check-channel {
      min-width: 155px;
    }
    .btn-check-channel,
    .btn-save {
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        border-color: white;
      }
    }
  }
}

.avatar-uploader {
  display: block;
  width: 162px;
  height: 162px;
  position: relative;
  border-radius: 4px;
  border: 1px solid $muted;
  .btn-logo-change {
    position: absolute;
    bottom: -12px;
    right: -12px;
    color: $body;
    z-index: 11;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $white;
    }
    button[disabled] {
      background-color: rgb($muted, 1);
    }
  }
  .logo-empty {
    width: 162px;
    height: 162px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 140px;
    color: rgb($body, 0.3);
    background-color: rgb($body, 0.1);
    border-radius: 4px;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}
</style>
