<script setup>
import { fileBaseUrl } from '@/utils/conf.js'
import { ref } from 'vue'

defineProps({
  hashId: {
    type: String,
    required: true
  },
  alt: String,
  rounded: {
    type: Boolean,
    default: false
  },
  shape: {
    type: String,
    default: 'square'
  }
})
const loaded = ref(false)

function onLoad() {
  loaded.value = true
}
</script>

<template>
  <div class="image-component" :class="{'rounded-50':rounded}" v-bind="$attrs">
    <template v-if="!loaded">
      <a-skeleton-avatar class="image-skeleton" :active="true" :shape="shape"/>
    </template>
    <img
      v-bind="$attrs"
      :src="`${fileBaseUrl}/file/${hashId}`"
      :alt="alt"
      @load="onLoad"
      class="image"
    />
  </div>
</template>

<style scoped lang="scss">
.image-component {
  position: relative;
  width: 100%;
  height: 100%;
  .image-skeleton {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: 999;
  }
  &:deep(.ant-skeleton) {
    width: 100%;
    height: 100%;
    .ant-skeleton-avatar {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }
  .image {
    width: 100%;
    height: 100%;
  }
}
.rounded-50 {
  &:deep(.ant-skeleton) {
    .ant-skeleton-avatar {
      border-radius: 50%;
    }
  }
}
</style>
