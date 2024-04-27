<script setup>
import { reactive } from 'vue'

const { status } = defineProps({
  status: {
    type: String
  }
})
const statusIcon = reactive({
  CREATED: '📌',
  APPROVED: '✅',
  BOARD_OWNER_APPROVED: '✅',
  PENDING: '🕒',
  STARTED: '💼',
  FINISHED: '✅',
  CANCELED: '🚫',
  REJECTED: '🚫',
  FAILED: '🚫'
})
</script>

<template>
  <a-tag
    :color="
      status === 'CREATED'
        ? 'magenta'
        : status === 'PENDING' || status === 'AWAITING_BOARD_OWNER'
          ? 'processing'
          : status === 'APPROVED' ||
              status === 'BOARD_OWNER_APPROVED' ||
              status === 'ACCEPTED'
            ? 'lime'
            : status === 'CANCELED' ||
                status === 'REJECTED' ||
                status === 'FAILED'
              ? 'error'
              : status === 'FINISHED'
                ? 'success'
                : status === 'STARTED'
                  ? 'warning'
                  : ''
    "
    :bordered="false"
    class="m-0"
    v-bind="$attrs"
  >
    <template #icon> {{ statusIcon[status] }} </template>
    {{ $t(status) }}
  </a-tag>
</template>

<style scoped lang="scss"></style>
