<script setup>
import { reactive, ref } from 'vue'
import IconInbox from '@/components/icons/IconInbox.vue'
import useUpload from '@/store/upload.pinia.js'
import IconLoader from '@/components/icons/IconLoader.vue'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'

const corePinia = useCore()
const uploadPinia = useUpload()

const { loadingUrl } = storeToRefs(corePinia)

const messageTypes = ref(['DOCUMENT', 'IMAGE', 'VIDEO', 'TEXT'])

const form = reactive({
  messageType: 'TEXT',
  fileHashId: null,
  text: null
})

const uploadLogo = (file) => {
  if (file.type === 'image/jpeg' || file.type === 'image/png') {
    uploadPinia.uploadFile(file, (hashId) => {
      form.fileHashId = hashId
    })
  }
  return false
}
</script>

<template>
  <a-form>
    <a-form-item>
      <a-spin :spinning="loadingUrl.has('file/upload')">
        <template #indicator>
          <icon-loader size="small" />
        </template>
        <a-upload-dragger
          name="file"
          :multiple="false"
          :show-upload-list="false"
          :before-upload="uploadLogo"
        >
          <p class="upload-drag-icon mb-1">
            <icon-inbox />
          </p>
          <p class="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p class="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </a-upload-dragger>
      </a-spin>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="scss">
.upload-drag-icon {
  font-size: 32px;
}
</style>
