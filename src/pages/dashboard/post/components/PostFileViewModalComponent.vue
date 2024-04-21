<script setup>
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'
import { fileBaseUrl } from '@/utils/conf.js'
import VideoPlayerComponent from '@/components/VideoPlayerComponent.vue'

const props = defineProps({
  file: {
    type: Object,
    required: true
  }
})
const corePinia = useCore()
const { visibleDrawer } = storeToRefs(corePinia)

function modalCLose() {
  corePinia.visibleDrawer.delete(`post/file/view/${props.file?.hashId}`)
}
</script>

<template>
  <a-modal
    :open="visibleDrawer.has(`post/file/view/${file?.hashId}`)"
    centered
    width="65%"
    :body-style="{ height: `${100}%` }"
    class="modal"
    destroy-on-close
    :footer="null"
    @cancel="modalCLose"
  >
    <p class="mb-4"></p>
    <div class="modal-content flex justify-center align-center">
      <template v-if="file?.fileType?.toLowerCase() === 'video'">
        <video-player-component :file="file" />
      </template>
      <template v-if="file?.fileType?.toLowerCase() === 'image'">
        <div class="image-view">
          <img :src="`${fileBaseUrl}/file/${file?.hashId}`" />
        </div>
      </template>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.modal-content {
  height: 80vh;
  background: $muted;
}
.image-view {
  width: 100%;
  height: 100%;
  padding: 4px;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
