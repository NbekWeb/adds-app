<script setup>
import { computed, reactive } from 'vue'

const { status } = defineProps({
  status: {
    type: String
  }
})
const statusIcon = reactive({
  CREATED: '📌',
  APPROVED: '✔️',
  PENDING: '🕒',
  STARTED: '💼',
  FINISHED: '✅',
  CANCELED: '🚫'
})
const statusTag = computed(() => {
  if (status === 'CREATED') {
    return 'magenta'
  } else if (status === 'PENDING') {
    return 'processing'
  } else if (status === 'APPROVED') {
    return 'lime'
  } else if (status === 'CANCELED') {
    return 'error'
  } else if (status === 'FINISHED') {
    return 'success'
  } else if (status === 'STARTED') {
    return 'warning'
  } else {
    return ''
  }
})
</script>

<template>
  <a-tag :color="statusTag" :bordered="false" v-bind="$attrs">
    <template #icon> {{ statusIcon[status] }} </template>
    {{ $t(status) }}
  </a-tag>
</template>

<style scoped lang="scss"></style>
