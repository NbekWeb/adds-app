<script setup>
import { computed, reactive } from 'vue'
import dayjs from 'dayjs'
import { formatHourAndMinute, formatAmount, fileBaseUrl } from '@/composables'
import StatusTagComponent from '@/components/StatusTagComponent.vue'

const emits = defineEmits(['getOne'])
const { item } = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <a-card class="order-item-card" @click="emits('getOne', item.id)">
    <div class="status flex justify-between align-center">
      <div>
        <status-tag-component :status="item.status" />
      </div>
      <a-avatar-group
        :max-count="3"
        :max-style="{
          color: '#9f9fa3',
          backgroundColor: '#F1F2F4'
        }"
      >
        <a-avatar
          size="middle"
          class="avatar"
          v-for="orderItem in item.items"
          :src="`${fileBaseUrl}/file/${orderItem.channelHashId}`"
        />
      </a-avatar-group>
    </div>

    <div class="order-amount flex justify-between mt-2">
      <span class="">{{ $t('ORDER_PRICE') }}:</span>
      <span>
        {{ formatAmount(item.totalAmount) }}
        <span class="currency">{{ $t('SOUM') }}</span>
      </span>
    </div>

    <div class="flex justify-between mt-1">
      <span class="order-date">
        {{ dayjs(item.createdDate).format('DD.MM.YYYY') }},
        {{ formatHourAndMinute(item.createdDate) }}
      </span>
    </div>
  </a-card>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.order-item-card {
  transition: background-color 0.5s;
  cursor: pointer;
  &:hover {
    background-color: rgb($light, 0.4);
  }
}

.order-amount {
  span {
    font-size: 16px;
    &:nth-child(1) {
      width: 50%;
      //font-weight: bold;
      color: $muted;
    }
    &:nth-child(2) {
      font-weight: bold;
    }
    .currency {
      font-size: 12px;
    }
  }
}
.progress {
  //&:deep(.ant-progress-text) {
  //  display: none;
  //}
  &:deep(.ant-progress-outer) {
    padding: 0;
  }
}
.order-date {
  font-size: 12px;
  font-weight: bolder;
  color: $muted;
}
</style>
