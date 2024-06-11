<script setup>
import { ref, onMounted } from 'vue'
import useUpload from '@/store/upload.pinia.js'
import useCore from '@/store/core.pinia.js'
import {useI18n} from "vue-i18n";
import IconInbox from '@/components/icons/IconInbox.vue'
import ProgressComponent from '@/components/ProgressComponent.vue'
import { storeToRefs } from 'pinia'
import { fileBaseUrl } from '@/utils/conf.js'
import PostImageAndVideoViewComponent from '@/pages/dashboard/post/kiosk/component/PostImageAndVideoViewComponent.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconFile from '@/components/icons/IconFile.vue'
import { useRoute } from 'vue-router'
import useKioskPost from "@/store/kiosk-post.pinia.js";
const { t } = useI18n()

const route = useRoute()
const hashId = defineModel('hashId')

const props = defineProps({
  snapshotHashId: String,
  type: String,
  fileName: String
})

const coreStore = useCore()
const uploadStore = useUpload()
const kioskPostStore = useKioskPost()

const { visibleDrawer } = storeToRefs(coreStore)

const videoDurationLimit = ref()
const fileType = ref()
const uploadedFilename = ref(null)
const fileProgress = ref(0)
const snapshot = ref()


function checkVideoDuration(file) {
  return new Promise((resolve,reject)=>{
    let url = URL.createObjectURL(file);
    let audioElement = new Audio(url);
    audioElement.addEventListener("loadedmetadata", (_event)=> {
      resolve(parseInt(audioElement.duration))
    });
  })
}


const uploadFile = async (file) => {
  if (file.type.includes('video')) {
    const res = await checkVideoDuration(file)
    if (res > videoDurationLimit.value) {
      coreStore.setToast({
        locale: t('REQUIRE_KIOSK_POST_DURATION', { limit: videoDurationLimit.value }),
        type: 'warning'
      })
      return false
    }
  }


  uploadStore.uploadFileKiosk(
    file,
    (data) => {
      hashId.value = data.hashId
      snapshot.value = data.snapshotHashId
      fileType.value = file.type.split('/')[0]
      uploadedFilename.value = file.name
      fileProgress.value = 0
    },
    (progress) => {
      fileProgress.value = progress
    }
  )

  return false
}

function openImageVideoModal() {
  coreStore.visibleDrawer.add('image-vide0/view')
}
function clearFile() {
  hashId.value = null
  snapshot.value = null
  fileType.value = null
  uploadedFilename.value = null
  fileProgress.value = 0
}
onMounted(() => {
  kioskPostStore.getDurationLimit((data) => {
    videoDurationLimit.value = data?.limitSeconds
  })
})
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
        :before-upload="uploadFile"
        accept="image/jpeg, image/jpg, image/png, application/*, text/*, video/mp4"
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
          :src="`${fileBaseUrl}/file/${(type?.toLowerCase() || fileType) === 'image' ? hashId : snapshot || snapshotHashId}`"
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
    <template v-else>
      <div class="document justify-between align-center p-2">
        <span class="flex align-center">
          <IconFile />
          <span>{{ fileName || uploadedFilename }}</span>
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
