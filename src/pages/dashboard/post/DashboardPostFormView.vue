<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import usePost from '@/store/post.pinia.js'
import PostEditorComponent from '@/pages/dashboard/post/component/PostEditorComponent.vue'
import PostFileComponent from '@/pages/dashboard/post/component/PostFileComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import PostInlineButtonsComponent from '@/pages/dashboard/post/component/PostInlineButtonsComponent.vue'

const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const corePinia = useCore()
const postPinia = usePost()

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

function submitForm() {
  formRef.value
    .validate()
    .then(() => {
      if (route.params.id) {
        postPinia.updatePost(route.params.id, form, () => {
          router.push({name:'DashboardPostView'})
        })
      } else {
        postPinia.createNewPost(form, () => {
          router.back()
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
      form.buttons = data.buttons
      snapshotHashId.value = data.snapshotHashId
      messageType.value = data.messageType
      fileName.value = data?.fileDto.fileName
    })
  }
})
</script>

<template>
  <page-header-component :title="$t('DashboardPostFormView')" />
  <scrollbar-component height="93%">
    <template #content>
      <a-form ref="formRef" layout="vertical" :model="form" :rules="rules">
        <a-form-item :label="$t('ADD_FILE_TO_FILE')" name="fileHashId">
          <post-file-component
            v-model:hash-id="form.fileHashId"
            :snapshot-hash-id="snapshotHashId"
            :file-name="fileName"
            :type="messageType"
          />
        </a-form-item>
        <a-form-item :label="$t('POST_DESCRIPTION')" name="text">
          <post-editor-component v-model:value="form.text" :max-count="1024" />
        </a-form-item>
        <a-form-item
          :label="$t('POST_BUTTONS')"
          name="buttons"
        >
          <post-inline-buttons-component v-model:buttons="form.buttons" />
        </a-form-item>
        <div class="flex justify-end">
          <a-space>
            <a-button @click="router.back()">
              {{ $t('BACK') }}
            </a-button>
            <a-button
              :loading="loadingUrl.has('create/post')"
              @click="submitForm"
              type="primary"
            >
              {{ $t('SAVE') }}
            </a-button>
          </a-space>
        </div>
      </a-form>
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss"></style>
