<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useUpload from '@/store/upload.pinia.js'
import usePost from '@/store/post.pinia.js'
import IconLoader from '@/components/icons/IconLoader.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import IconPlus from '@/components/icons/IconPlus.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconPaperClip from '@/components/icons/IconPaperClip.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconX from '@/components/icons/IconX.vue'
import { useI18n } from 'vue-i18n'
import IconLink from '@/components/icons/IconLink.vue'

const { t } = useI18n()
const router = useRouter()

const corePinia = useCore()
const uploadPinia = useUpload()
const postPinia = usePost()

const { loadingUrl } = storeToRefs(corePinia)

const imageUrl = ref(null)
const baseUrl = ref(
  `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_AOO_BASE_API_VERSION}/`
)

const formRef = ref()
const form = reactive({
  fileHashId: null,
  text: '',
  buttons: [
    {
      orderNumber: 0,
      text: null,
      url: null,
      firstUrl: null,
      open: false,
      error: false
    }
  ]
})
const rule = reactive({
  required: true,
  message: '',
  trigger: 'blur'
})
const ruleTextAndFile = reactive({
  required: true,
  message: t('REQUIRED_FIELD'),
  trigger: 'blur'
})

const editorConfig = ref({
  // The configuration of the editor.
  toolbar: ['bold', 'italic']
})

const uploadLogo = (file) => {
  uploadPinia.uploadFile(file, 'TELEGRAM', (hashId) => {
    form.fileHashId = hashId
    imageUrl.value = `${baseUrl.value}file/${hashId}`
  })
  return false
}
const clearImage = () => {
  form.fileHashId = null
  imageUrl.value = null
}
const addLinkedButton = () => {
  form.buttons.push({
    orderNumber: 0,
    text: null,
    url: null,
    firstUrl: null,
    open: false,
    error: false
  })
}

const confirmUrl = (index) => {
  form.buttons[index].open = false
  form.buttons[index].url = form.buttons[index].firstUrl
  form.buttons[index].error = false
}
const cancelUrl = (index) => {
  form.buttons[index].open = false
  form.buttons[index].firstUrl = null
  // form.buttons[index].url = null
}
const removeLinkedButton = (index) => {
  form.buttons.splice(index, 1)
}

const submitForm = (formRef) => {
  const validate = []
  form.buttons = form.buttons.map((item, index) => {
    if (!item.url) {
      item.error = true
      validate.push(index)
    } else {
      item.error = false
      validate.splice(validate.indexOf(index), 1)
    }
    return item
  })

  formRef
    .validate()
    .then(() => {
      if (!validate.length) {
        form.text = form.text.replace('<p>', '').replace('</p>', '')
        postPinia.createNewPost(form, () => {
          router.back()
        })
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
}
</script>

<template>
  <scrollbar-component height="calc(100vh - 150px)">
    <template #content>
      <div class="form-container mx-1">
        <a-form ref="formRef" :model="form">
          <a-form-item>
            <a-spin :spinning="loadingUrl.has('file/upload')">
              <template #indicator>
                <icon-loader size="small" />
              </template>
              <template v-if="imageUrl">
                <div class="post-image">
                  <img :src="imageUrl" alt="" />
                  <div class="upload-action">
                    <a-button
                      @click="clearImage"
                      class="delete-btn"
                      type="link"
                    >
                      <icon-trash />
                    </a-button>
                  </div>
                </div>
              </template>
              <template v-else>
                <a-upload
                  class="upload"
                  list-type="picture-card"
                  :multiple="false"
                  :show-upload-list="false"
                  :before-upload="uploadLogo"
                >
                  <div>
                    <icon-plus class="upload-icon" />
                    <div class="mt-1">{{ $t('CLICK_TO_UPLOAD_FILE') }}</div>
                  </div>
                </a-upload>
              </template>
            </a-spin>
          </a-form-item>
          <a-form-item :rules="ruleTextAndFile" name="text">
            <div class="editor">
              <ckeditor
                :editor="ClassicEditor"
                v-model="form.text"
                :config="editorConfig"
              ></ckeditor>
            </div>
          </a-form-item>
          <a-row :gutter="[10, 10]">
            <a-col v-for="(item, i) in form.buttons" :key="i" :lg="8">
              <a-card class="button-card">
                <div class="flex align-center">
                  <a-form-item
                    :rules="rule"
                    class="w-full mb-0"
                    :name="['buttons', i, 'text']"
                  >
                    <a-input-group compact class="flex">
                      <a-input
                        v-model:value="item.text"
                        @input="item.orderNumber = i"
                        class="button-text-input"
                        :placeholder="$t('ENTER_TEXT_LINKED_BUTTON')"
                      />
                      <a-tooltip placement="top">
                        <template #title>
                          <span>{{ $t('ATTACH_URL') }}</span>
                        </template>
                        <a-button
                          @click="item.open = true"
                          class="flex align-center"
                          :danger="item.error"
                        >
                          <template v-if="item.url">
                            <icon-check />
                          </template>
                          <template v-else>
                            <icon-link />
                          </template>
                        </a-button>
                      </a-tooltip>
                    </a-input-group>
                  </a-form-item>
                  <a-popover
                    :open="item.open"
                    :title="$t('ENTER_URL')"
                    trigger="click"
                  >
                    <template #content>
                      <a-form-item class="mb-0">
                        <a-input
                          style="width: 300px"
                          class="button-url-input"
                          v-model:value="item.firstUrl"
                          :placeholder="$t('ENTER_URL')"
                        />
                      </a-form-item>
                      <div class="flex justify-end mt-1">
                        <a-space>
                          <a-button
                            @click="confirmUrl(i)"
                            size="small"
                            type="primary"
                            class="flex align-center"
                          >
                            <icon-check />
                          </a-button>
                          <a-button
                            @click="cancelUrl(i)"
                            class="flex align-center"
                            type="primary"
                            size="small"
                            danger
                          >
                            <icon-x />
                          </a-button>
                        </a-space>
                      </div>
                    </template>
                  </a-popover>
                  <a-button
                    @click="removeLinkedButton(i)"
                    :disabled="form.buttons.length <= 1"
                    type="primary"
                    size="small"
                    class="flex justify-center align-center ml-2"
                    danger
                  >
                    <icon-x />
                  </a-button>
                </div>
              </a-card>
            </a-col>
            <a-col :lg="8">
              <a-button
                @click="addLinkedButton"
                size="large"
                class="button-add-btn py-3"
              >
                <template #icon>
                  <icon-plus />
                </template>
                {{ $t('ADD_NEW_LINKED_BUTTON') }}
              </a-button>
            </a-col>
          </a-row>
        </a-form>

        <div class="btn-group mt-3">
          <a-space>
            <a-button @click="router.back()" size="middle">{{
              $t('BACK')
            }}</a-button>
            <a-button
              @click="submitForm(formRef)"
              type="primary"
              size="middle"
              >{{ $t('SAVE') }}</a-button
            >
          </a-space>
        </div>
      </div>
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.post-image {
  position: relative;
  &:hover {
    .upload-action {
      opacity: 1;
    }
  }
  img {
    display: block;
    width: 100%;
  }

  .upload-action {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgb(#000, 0.5);
    transition: opacity 0.3s;
    .delete-btn {
      font-size: 24px;
      color: $muted;
      &:hover {
        color: $danger;
      }
    }
  }
}
.upload {
  :deep(.ant-upload.ant-upload-select) {
    width: 100%;
    height: 120px;
  }
  .upload-icon {
    font-size: 32px;
  }
}
.editor {
  min-height: 200px;
  &:deep(p) {
    margin: 0 !important;
  }
  :deep(.ck-editor__editable_inline):not(.ck-comment__input *) {
    height: 30vh;
    overflow-y: auto;
  }
}
.button-card {
  &:deep(.ant-card-body) {
    padding: 12px;
    //background-color: $light;
    .button-text-input {
      width: 100%;
    }
  }
}

.button-add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: 100%;
  color: $muted;
  //background-color: $light;
  &:hover {
    color: rgb($body, 0.7);
  }
}
.btn-group {
  display: flex;
  justify-content: flex-end;
}
</style>
