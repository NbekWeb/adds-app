<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import useBoard from '@/store/boadr.pinia.js'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { Form } from 'ant-design-vue'
import useUpload from '@/store/upload.pinia.js'
import IconLoader from '@/components/icons/IconLoader.vue'
import { useRouter } from 'vue-router'
import IconUseEmptyLogo from '@/components/icons/IconUseEmptyLogo.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import useCore from '@/store/core.pinia.js'
import IconEdit from '@/components/icons/IconEdit.vue'

const { t } = useI18n()
const router = useRouter()
const boardPinia = useBoard()
const uploadPinia = useUpload()
const corePinia = useCore()
const useForm = Form.useForm
const { collapsed } = storeToRefs(corePinia)
const { categories, loadingCategory, loading, channel, loadingChannel } =
  storeToRefs(boardPinia)
const { fileHashId, loadingFile } = storeToRefs(uploadPinia)
const imageUrl = ref(null)
const baseUrl = ref(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/`)

const form = reactive({
  link: null,
  categoryId: null,
  name: null,
  description: null,
  logoHashId: null
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
const channelInfo = computed(() => channel.value)
const logoHashId = computed(() => fileHashId.value)

watch(channelInfo, () => {
  imageUrl.value = null
  form.link = channelInfo.value.link
  form.name = channelInfo.value.channelInfo.title
  form.description = channelInfo.value.channelInfo.description
  form.logoHashId = channelInfo.value.channelInfo.hashId
  imageUrl.value = `${baseUrl.value}file/${channelInfo.value.channelInfo.hashId}`
})
watch(logoHashId, () => {
  form.logoHashId = logoHashId.value
  imageUrl.value = `${baseUrl.value}file/${logoHashId.value}`
})
const uploadLogo = (file) => {
  if (file.type === 'image/jpeg' || file.type === 'image/png') {
    imageUrl.value = null
    uploadPinia.$reset()
    uploadPinia.uploadFile(file)
  }
  return false
}

const { validate, validateInfos } = useForm(form, rules)

const checkChannelByLink = () => {
  validate(['link'])
    .then(() => {
      boardPinia.checkChannel(form.link)
    })
    .catch(() => {})
}
const addNewBoard = () => {
  validate()
    .then(() => {
      boardPinia.addNewBoard(form)
    })
    .catch(() => {})
}
onMounted(() => {
  boardPinia.getBoardCategories()
})
onBeforeUnmount(() => {
  uploadPinia.$reset()
  boardPinia.$reset()
})
</script>

<template>
  <a-form layout="vertical" class="form scrollbar-content">
    <a-row :gutter="20" class="mx-0" justify="space-between">
      <a-col>
        <a-form-item>
          <a-spin :spinning="loadingFile">
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
                  <div
                    class="logo-empty-plus"
                    v-if="channelInfo.channelInfo.id"
                  >
                    <icon-plus />
                  </div>
                </div>
              </template>
              <a-upload
                class="btn-logo-change"
                :disabled="!channelInfo.channelInfo.id"
                name="file"
                :show-upload-list="false"
                :before-upload="uploadLogo"
              >
                <a-button
                  :disabled="!channelInfo.channelInfo.id"
                  type="primary"
                  shape="circle"
                  size="large"
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
                    <template v-if="loadingChannel">
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
          <a-col :xs="24" :sm="24" :md="24" :lg="12">
            <a-form-item
              :label="$t('CHANNEL_NAME')"
              v-bind="validateInfos.name"
            >
              <a-input
                v-model:value="form.name"
                :disabled="!channelInfo.channelInfo.id"
                size="large"
                :placeholder="$t('ENTER_CHANNEL_NAME')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="12">
            <a-form-item
              :label="$t('CATEGORY')"
              v-bind="validateInfos.categoryId"
            >
              <a-tree-select
                v-model:value="form.categoryId"
                show-search
                :loading="loadingCategory"
                :disabled="!channelInfo.channelInfo.id"
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                :placeholder="$t('SELECT_CATEGORY')"
                size="large"
                allow-clear
                tree-default-expand-all
                :tree-data-simple-mode="{ pId: 'parentId' }"
                :tree-data="categories"
                tree-node-filter-prop="label"
              >
              </a-tree-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="24">
        <a-form-item
          :label="$t('DESCRIPTION')"
          v-bind="validateInfos.description"
        >
          <a-textarea
            v-model:value="form.description"
            :placeholder="$t('WRITE_DESCRIPTION')"
            class="description"
            :auto-size="true"
            :disabled="!channelInfo.channelInfo.id"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <div class="btn-group">
      <a-space>
        <a-button @click="router.back()" size="large">
          {{ $t('BACK') }}
        </a-button>

        <a-button
          class="btn-save"
          @click="addNewBoard"
          :disabled="!channelInfo.channelInfo.id || loading"
          type="primary"
          size="large"
        >
          <template v-if="loading">
            <icon-loader size="small" class="loader" />
          </template>
          <template v-else>
            {{ $t('SAVE') }}
          </template>
        </a-button>
        <!--        <template v-else>-->
        <!--          <a-button-->
        <!--            class="btn-check-channel"-->
        <!--            :disabled="loading"-->
        <!--            @click="checkChannelByLink"-->
        <!--            type="primary"-->
        <!--            size="large"-->
        <!--          >-->
        <!--            <template v-if="loading">-->
        <!--              <icon-loader size="small" />-->
        <!--            </template>-->
        <!--            <template v-else>-->
        <!--              {{ $t('CHECK_CHANNEL') }}-->
        <!--            </template>-->
        <!--          </a-button>-->
        <!--        </template>-->
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
