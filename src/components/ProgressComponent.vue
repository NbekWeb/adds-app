<script setup>
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { percent } = defineProps({
  loadingUrl: String,
  percent: Number,
  type: String,
  size: Number
})
const corePinia = useCore()
//percent === 100 ? percent - 1 : percent
</script>

<template>
  <a-spin
    :spinning="corePinia.loadingUrl.has(loadingUrl)"
    class="spinner flex justify-center align-center"
  >
    <template #indicator>
      <a-progress
        :percent="percent === 100 ? percent - 1 : percent"
        :type="type"
        :size="size"
      />
    </template>
    <slot />
  </a-spin>
</template>

<style scoped lang="scss">
.spinner {
  .ant-spin-dot {
    position: static !important;
    margin: 0 !important;
  }

  .ant-progress {
    width: auto;
    height: auto;
  }
}
.ant-spin-nested-loading {
  &:deep(.ant-spin-blur) {
    opacity: 0.1;
  }
}
.ant-spin {
  position: static;
}
</style>
