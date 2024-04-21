<script setup>
import { fileBaseUrl } from '@/utils/conf.js'
import useCore from '@/store/core.pinia.js'
import IconFile from '@/components/icons/IconFile.vue'
import PostFileViewModalComponent from '@/pages/dashboard/post/components/PostFileViewModalComponent.vue'
import IconDownloadCloud from '@/components/icons/IconDownloadCloud.vue'
const props = defineProps({
  file: {
    type: Object,
    required: true
  }
})
const corePinia = useCore()
function openViewModal() {
  corePinia.visibleDrawer.add(`post/file/view/${props.file?.hashId}`)
}
</script>

<template>
  <post-file-view-modal-component
    :file="{
      fileType: file?.messageType,
      hashId: file?.hashId,
      snapshotHashId: file?.snapshotHashId
    }"
  />
  <div class="post-cover">
    <template v-if="file?.messageType === 'IMAGE'">
      <div class="post-image">
        <img :src="`${fileBaseUrl}/file/${file?.hashId}`" alt="" />
      </div>
    </template>
    <template v-if="file?.messageType === 'VIDEO'">
      <div class="post-video">
        <img :src="`${fileBaseUrl}/file/${file?.snapshotHashId}`" alt="" />
        <div class="video-play flex justify-center align-center">
          <a-button
            @click="openViewModal"
            size="large"
            shape="circle"
            type="primary"
            class="btn"
          >
            <template #icon>
              <IconPlay />
            </template>
          </a-button>
        </div>
      </div>
    </template>
    <template v-if="file?.messageType === 'DOCUMENT'">
      <div class="post-document">
        <icon-file class="file" />
        <div class="download-btn flex justify-center align-center">
          <a-tooltip :title="$t('DOWNLOAD')">
            <a :href="`${fileBaseUrl}/file/${file?.hashId}`" download>
              <IconDownloadCloud />
            </a>
          </a-tooltip>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.post-cover {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  .post-image {
    width: 100%;
    height: 100%;
    object-fit: fill;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .post-video {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .video-play {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .post-document {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .file {
      font-size: 88px;
      color: $muted;
    }
    .download-btn {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 28px;
      opacity: 0;
      transition: all 0.3s;
      &:hover {
        background: rgb(#ffffff, 0.7);
        opacity: 1;
      }
    }
  }
}
</style>
