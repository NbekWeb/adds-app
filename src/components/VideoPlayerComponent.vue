<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { fileBaseUrl } from '@/utils/conf.js'

const props = defineProps({
  file: {
    type: Object,
    required: true
  }
})

const options = ref({ quality: { default: '1080p' } })
</script>

<template>
  <div class="plyr-video">
    <vue-plyr :options="options">
      <video
        controls
        crossorigin
        playsinline
        :data-poster="`${fileBaseUrl}/file/${file.snapshotHashId}`"
      >
        <source :src="`${fileBaseUrl}/file/${file.hashId}`" />
      </video>
    </vue-plyr>
  </div>
</template>
<style lang="scss">
.plyr-video {
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .plyr {
    height: 100%;
  }
  .plyr__video-wrapper {
    height: 100%;
  }
}
</style>
