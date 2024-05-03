<script setup>
import { ref } from 'vue'

const props = defineProps({
  order: Object
})
console.log(
  'The order has expired because it was not confirmed by the moderator or channel owner'.toUpperCase()
)

const statusList = ref({
  REJECTED_BY_MODERATOR: 'error',
  CANCELED: 'error',
  REJECTED: 'error',
  FAILED: 'error',
  EXPIRED: 'error',
  APPROVED: 'success',
  BOARD_OWNER_APPROVED: 'success',
  ACCEPTED: 'success',
  FINISHED: 'success',
  STARTED: 'warning',
  PENDING: 'info',
  AWAITING_BOARD_OWNER: 'info',
  CREATED: 'magenta'
})
const checkStatus = ref(
  new Set([
    'PENDING',
    'AWAITING_BOARD_OWNER',
    'ACCEPTED',
    'REJECTED_BY_MODERATOR',
    'REJECTED_BY_BOARD_OWNER',
    'EXPIRED'
  ])
)
</script>

<template>
  <div class="pending w-full flex justify-center align-center">
    <template v-if="order.taskResponse?.message">
      <a-alert class="w-full" type="error">
        <template #description>
          {{
            $t(
              'THE_AD_WAS_NOT_POSTED_TO_THE_CHANNEL_DUE_TO_AN_UNKNOWN_SYSTEM_ERROR'
            )
          }}
        </template>
      </a-alert>
    </template>
    <template v-else-if="checkStatus.has(order?.status)">
      <a-alert class="w-full" :type="statusList[order?.status]">
        <template #description>
          <template v-if="order.status === 'PENDING'">
            {{ $t('AWAITING_MODERATOR_APPROVAL') }}
          </template>
          <template v-else-if="order.status === 'AWAITING_BOARD_OWNER'">
            {{ $t('AWAITING_BOARD_OWNER_APPROVAL') }}
          </template>
          <template v-else-if="order.status === 'ACCEPTED'">
            {{ $t('THE_ANNOUNCEMENT_IS_EXPECTED_TO_APPEAR_ON_THE_CHANNEL') }}
          </template>
          <template v-else-if="order.status === 'REJECTED_BY_MODERATOR'">
            {{ $t('REJECTED_BY_MODERATOR') }}
          </template>
          <template v-else-if="order.status === 'REJECTED_BY_BOARD_OWNER'">
            {{ $t('REJECTED_BY_BOARD_OWNER') }}
          </template>
          <template v-else-if="order.status === 'EXPIRED'">
            {{
              $t(
                'THE_ORDER_HAS_EXPIRED_BECAUSE_IT_WAS_NOT_CONFIRMED_BY_THE_MODERATOR_OR_CHANNEL_OWNER'
              )
            }}
          </template>
        </template>
      </a-alert>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
