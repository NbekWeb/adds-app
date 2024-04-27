<script setup>
import { ref } from 'vue'
import useUpload from '@/store/upload.pinia.js'
import useCore from '@/store/core.pinia.js'
import IconInbox from '@/components/icons/IconInbox.vue'
import ProgressComponent from '@/components/ProgressComponent.vue'
import { storeToRefs } from 'pinia'
import { fileBaseUrl } from '@/utils/conf.js'
import PostImageAndVideoViewComponent from '@/pages/dashboard/post/component/PostImageAndVideoViewComponent.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconFile from '@/components/icons/IconFile.vue'

const hashId = defineModel('hashId')

const props = defineProps({
  snapshotHashId: String,
  type: String
})

const corePinia = useCore()
const uploadPinia = useUpload()
const { visibleDrawer, screenWidth, screenHeight } = storeToRefs(corePinia)

const fileTypes = ref(['image', 'video', 'application'])
const fileType = ref()
const fileName = ref(null)
const fileProgress = ref(0)
const snapshot = ref()

const uploadLogo = (file) => {
  if (fileTypes.value.includes(file.type.split('/')[0])) {
    uploadPinia.uploadFile(
      file,
      'TELEGRAM',
      (data) => {
        hashId.value = data.hashId
        snapshot.value = data.snapshotHashId
        fileType.value = file.type.split('/')[0]
        fileName.value = file.name
        fileProgress.value = 0
      },
      (progress) => {
        fileProgress.value = progress
      }
    )
  } else {
    corePinia.setToast({
      type: 'warning',
      locale: 'THE_UPLOADED_FILE_IS_INVALID'
    })
  }

  return false
}

function openImageVideoModal() {
  corePinia.visibleDrawer.add('image-vide0/view')
}
function clearFile() {
  hashId.value = null
  snapshot.value = null
  fileType.value = null
  fileName.value = null
  fileProgress.value = 0
}
</script>

<template>
  <template v-if="!hashId">
    <progress-component
      loading-url="file/upload"
      :percent="fileProgress"
      :size="40"
      type="circle"
    >
      <a-upload-dragger
        list-type="picture-card"
        :multiple="false"
        :show-upload-list="false"
        :before-upload="uploadLogo"
      >
        <span class="upload-drag-icon">
          <IconInbox />
        </span>
        <p class="ant-upload-text">{{ $t('CLICK_TO_UPLOAD_FILE') }}</p>
      </a-upload-dragger>
    </progress-component>
  </template>
  <template v-else>
    <template
      v-if="
        type?.toLowerCase() === 'image' ||
        type?.toLowerCase() === 'video' ||
        fileType === 'image' ||
        fileType === 'video'
      "
    >
      <div class="post-file">
        <img
          :src="`${fileBaseUrl}/file/${type?.toLowerCase() || fileType === 'image' ? hashId : snapshotHashId || snapshot}`"
          alt=""
        />
        <div class="post-file-actions">
          <a-space>
            <a-button
              @click="clearFile"
              class="btn"
              size="large"
              type="text"
              danger
            >
              <template #icon>
                <IconTrash />
              </template>
            </a-button>
            <a-button
              @click="openImageVideoModal"
              class="btn"
              size="large"
              type="text"
            >
              <template #icon>
                <IconEye />
              </template>
            </a-button>
          </a-space>
        </div>
      </div>
    </template>
    <template
      v-if="type?.toLowerCase() === 'DOCUMENT' || fileType === 'application'"
    >
      <div class="document justify-between align-center p-2">
        <span class="flex align-center">
          <IconFile />
          <span>{{ fileName }}</span>
        </span>
        <a-space class="ml-3">
          <a
            target="_blank"
            rel="opener"
            :href="`${fileBaseUrl}/file/${hashId}`"
          >
            <a-button class="btn" type="text">
              <template #icon>
                <IconEye />
              </template>
            </a-button>
          </a>

          <a-button type="text" class="btn ml-2" @click="clearFile">
            <template #icon>
              <IconTrash />
            </template>
          </a-button>
        </a-space>
      </div>
    </template>
    <a-modal
      centered
      destroy-on-close
      class="modal-view"
      :footer="null"
      :closable="false"
      :open="visibleDrawer.has('image-vide0/view')"
      @cancel="visibleDrawer.delete('image-vide0/view')"
    >
      <post-image-and-video-view-component
        :type="type || fileType"
        :hash-id="hashId"
        :snapshot-hash-id="snapshotHashId"
      />
    </a-modal>
  </template>
</template>

<style lang="scss">
@import '@/assets/styles/variable';
.upload-drag-icon {
  font-size: 32px;
}
.post-file {
  position: relative;
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .post-file-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(#fff, 0.7);
    opacity: 0;
    transition: opacity 0.3s;
    button {
      //color: white;
      font-size: 24px;
    }
  }
  &:hover {
    .post-file-actions {
      opacity: 1;
    }
  }
}
.document {
  display: inline-flex;
  min-width: 400px;
  background: $light;
  font-size: 24px;
  border-radius: 4px;
  span {
    margin-left: 4px;
  }
  button {
    font-size: 18px;
  }
}
.modal-view {
  width: max-content !important;
  .ant-modal-content {
    width: max-content;
    background: transparent;
    box-shadow: none;
    .ant-modal-body {
      width: max-content;
      //height: 100%;
    }
  }
}
</style>
