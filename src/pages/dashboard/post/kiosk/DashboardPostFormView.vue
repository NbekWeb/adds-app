<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useKioskPost from '@/store/kiosk-post.pinia.js'
import PostEditorComponent from '@/pages/dashboard/post/kiosk/component/PostEditorComponent.vue'
import PostFileComponent from '@/pages/dashboard/post/kiosk/component/PostFileComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import LoaderComponent from '@/components/LoaderComponent.vue'
const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const corePinia = useCore()
const postPinia = useKioskPost()

const { loadingUrl } = storeToRefs(corePinia)
const formRef = ref()
const form = reactive({
  fileHashId: '',
  text: '',
  buttons: []
})
const snapshotHashId = ref()
const messageType = ref()
const fileName = ref()
const pageTitle = ref(route.params.id ? 'KioskPostEditView' : 'DashboardKioskPostFormView')

const rules = reactive({
  text: [
    {
      required: true,
      message: t('REQUIRED_FIELD'),
      trigger: 'blur'
    },
    {
      required: true,
      validator: async (_rules, value) => {
        if (value.replace(/<.*?>/g, '').replace(/&nbsp;/g, ' ').length > 1024) {
          return Promise.reject(t('POST_DESCRIPTION_LENGTH'))
        } else {
          return Promise.resolve()
        }
      },
      trigger: 'blur'
    }
  ],
  buttons: [
    {
      required: true,
      validator: async (_rules, value) => {
        if (value.length > 0) {
          return Promise.resolve()
        } else {
          return Promise.reject(t('REQUIRED_FIELD'))
        }
      },
      trigger: 'blur'
    }
  ]
})

function checkTag(value) {
  const regex = /&lt;|\&gt;/
  return regex.test(value)
}

function createPost() {
  formRef.value
    .validate()
    .then(() => {
      const checkedText = checkTag(form.text) // false = don't exist < or > true = exist
      if (!checkedText) {
        if (route.params.id) {
          postPinia.updatePost(route.params.id, form, () => {
            router.push({
              name: 'DashboardPostListView',
              query: { channel: 'kiosk' }
            })
          })
        } else {
          postPinia.createNewPost(form, () => {
            router.push({
              name: 'DashboardPostListView',
              query: { channel: 'kiosk' }
            })
          })
        }
      } else {
        corePinia.setToast({
          type: 'warning',
          locale: `NOT_ALLOWED_SYMBOL`,
          var: {
            symbol: '< , >'
          }
        })
      }
    })
    .catch(() => {})
}

onMounted(() => {
  if (route.params.id) {
    postPinia.getOnePostById(route.params.id, (data) => {
      form.fileHashId = data?.fileDto.fileHashId
      form.text = data.text
      snapshotHashId.value = data.snapshotHashId
      messageType.value = data.messageType
      fileName.value = data?.fileDto.fileName
    })
  }
})
</script>

<template>
  <page-header-component :title="$t(pageTitle)" />
  <loader-component loading-url="get/post/one">
    <scrollbar-component height="calc(100vh - 230px)" class="mb-2">
      <template #content>
        <a-form
          ref="formRef"
          layout="vertical"
          :model="form"
          :rules="rules"
          class="h-full flex flex-column"
        >
          <a-form-item :label="$t('ADD_FILE_TO_FILE')" name="fileHashId">
            <post-file-component
              v-model:hash-id="form.fileHashId"
              :snapshot-hash-id="snapshotHashId"
              :file-name="fileName"
              :type="messageType"
            />
          </a-form-item>
          <a-form-item :label="$t('POST_DESCRIPTION')" name="text">
            <post-editor-component
              v-model:value="form.text"
              :max-count="1024"
            />
          </a-form-item>
        </a-form>
      </template>
    </scrollbar-component>
    <div class="flex justify-end h-full align-end">
      <a-space>
        <a-button @click="router.back()"> {{ $t('BACK') }} </a-button>
        <a-button
          :loading="
            loadingUrl.has('kiosk-create/post') ||
            loadingUrl.has('update/kiosk-post')
          "
          @click="createPost"
          type="primary"
        >
          {{ $t('SAVE') }}
        </a-button>
      </a-space>
    </div>
  </loader-component>
</template>

<style scoped lang="scss"></style>
