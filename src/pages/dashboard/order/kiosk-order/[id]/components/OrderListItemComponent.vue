<script setup>
import dayjs from 'dayjs'
import { formatAmount } from '@/composables'
import StatusTagComponent from '@/components/StatusTagComponent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { item } = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <a-card
    class="order-item-card"
    @click="
      router.push({
        name: 'DashboardKioskOrderItemView',
        params: { id: item.id }
      })
    "
  >
    <div class="status flex justify-between align-center">
      <status-tag-component :status="item.status" class="" />
      <p class="m-0 text-bold context">{{ item?.items?.[0]?.boardName }}</p>
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
  .context {
    font-size: 16px;
  }
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
