<script setup>
import dayjs from 'dayjs'
import { formatAmount } from '@/composables/index.js'
import { fileBaseUrl } from '@/utils/conf.js'
import StatusTagComponent from '@/components/StatusTagComponent.vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const pushItem = () => {
  if (route.query.channel === 'kiosk') {
    router.push({
      name: 'KioskOrderItemView',
      params: { id: props.item.id }
    })
  } else {
    router.push({
      name: 'TelegramOrderItemView',
      params: { id: props.item.id }
    })
  }
}
</script>

<template>
  <a-card class="order-item-card" @click="pushItem">
    <div class="status flex justify-between align-center">
      <div>
        <status-tag-component :status="item.status" />
      </div>
      <template v-if="route.query.channel !== 'kiosk'">
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
            v-for="(orderItem, i) in item.items"
            :key="i"
            :src="`${fileBaseUrl}/file/${orderItem.channelHashId}`"
          />
        </a-avatar-group>
      </template>
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
        {{ dayjs(item.createdDate).format('DD.MM.YYYY, HH:mm') }}
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
