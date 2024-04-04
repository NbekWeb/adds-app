<script setup>
import { useRouter } from 'vue-router'
import formatAmount from '@/composables/amount.js'
import { formatTime } from '@/composables'

const router = useRouter()

const { item } = defineProps({
  item: {
    type: Object,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})
</script>

<template>
  <a-card
    class="item-card w-full"
    :body-style="{
      padding: '24px'
    }"
  >
    <div class="config-name-price">
      <h1 class="config-name text-center">{{ item.name }}</h1>
      <h1 class="text-center mt-2">
        <span class="config-amount">
          {{ formatAmount(item.amount) }}
          <span class="amount-label">UZS</span>
        </span>
      </h1>
    </div>
    <span class="time-label"> E'lonni kanalda turish muddati </span>
    <h1 class="time-value">
      {{ formatTime(item.liveTime, 'hh') }} soat,
      {{ formatTime(item.liveTime, 'mm') }} daqiqa
    </h1>
    <span class="time-label"> E'lonni pinda turish muddati </span>
    <h1 class="time-value">
      {{ formatTime(item.pinTime, 'hh') }} soat,
      {{ formatTime(item.pinTime, 'mm') }} daqiqa
    </h1>
    <span class="time-label"> E'lonni topda turish muddati </span>
    <h1 class="time-value">
      {{ formatTime(item.topTime, 'hh') }} soat,
      {{ formatTime(item.topTime, 'mm') }} daqiqa
    </h1>

    <div>
      <a-button
        @click="router.push({ name: 'DashboardPostView' })"
        class="w-full"
        type="primary"
      >
        E'lon berish
      </a-button>
    </div>
  </a-card>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.item-card {
  position: relative;
  width: 100%;
  margin: 0;
  &:deep(.ant-card-body) {
    &:hover {
      background: $light !important;
    }
  }

  .config-name-price {
    border-bottom: 1px solid rgb($muted, 0.5);
    margin-bottom: 16px;
    .config-name {
      font-size: 18px;
      font-weight: bold;
      color: $body;
    }
    .config-amount {
      font-size: 24px;
      font-weight: bolder;
      text-align: right;
      .amount-label {
        font-size: 14px;
        font-weight: bolder;
        color: $muted;
      }
    }
  }
}
</style>
