<script setup>
import { fileBaseUrl } from '@/utils/conf.js'
import VideoPlayerComponent from '@/components/VideoPlayerComponent.vue'

const props = defineProps({
  hashId: String,
  snapshotHashId: String,
  type: String
})
</script>

<template>
  <div>
    <template v-if="type?.toLowerCase() === 'image'">
      <div class="image-wrapper">
        <img class="w-full" :src="`${fileBaseUrl}/file/${hashId}`" alt="" />
      </div>
    </template>
    <template v-if="type?.toLowerCase() === 'video'">
      <video-player-component
        :file="{
          snapshotHashId: props.snapshotHashId,
          hashId: props.hashId
        }"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.image-wrapper {
  width: auto;
  height: 90vh;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
