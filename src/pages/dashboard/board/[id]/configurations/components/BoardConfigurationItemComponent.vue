<script setup>
import BoardConfigurationTimeComponent from '@/components/BoardConfigurationTimeComponent.vue'

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
      
    </div>
    <!-- <span class="time-label"> {{ $t('POST_LIVE_TIME') }} </span>
    <h1 class="time-value">
      {{ formatTime(item.liveTime, 'day') }} {{ $t('DAY').toLowerCase() }},
      {{ formatTime(item.liveTime, 'hour') }} {{ $t('HOUR').toLowerCase() }},
      {{ formatTime(item.liveTime, 'minute') }} {{ $t('MINUTE').toLowerCase() }}
    </h1>
    <span class="time-label"> {{ $t('POST_PIN_TIME') }} </span>
    <h1 class="time-value">
      {{ formatTime(item.pinTime, 'day') }} {{ $t('DAY').toLowerCase() }},
      {{ formatTime(item.pinTime, 'hour') }} {{ $t('HOUR').toLowerCase() }},
      {{ formatTime(item.pinTime, 'minute') }} {{ $t('MINUTE').toLowerCase() }}
    </h1>
    <span class="time-label"> {{ $t('POST_TOP_TIME') }} </span>
    <h1 class="time-value">
      {{ formatTime(item.topTime, 'day') }} {{ $t('DAY').toLowerCase() }},
      {{ formatTime(item.topTime, 'hour') }} {{ $t('HOUR').toLowerCase() }},
      {{ formatTime(item.topTime, 'minute') }} {{ $t('MINUTE').toLowerCase() }}
    </h1> -->
    <div class="board-configuration-time">
      <board-configuration-time-component
        :configuration="item"
        time-type="liveTime"
        class="mb-3"
      />
      <board-configuration-time-component
        :configuration="item"
        time-type="topTime"
        class="mb-3"
      />
      <board-configuration-time-component
        :configuration="item"
        time-type="pinTime"
        class="mb-3"
      />
    </div>

    <div class="flex mt-3 align-center justify-between">
      <a-button
        @click="router.push({ name: 'DashboardPostView' })"
        
      >
        {{ $t('CREATE_AN_ORDER') }}
      </a-button>
      <h1 class="text-center mt-2">
        <span class="config-amount">
          {{ formatAmount(item.amount) }}
          <span class="amount-label">UZS</span>
        </span>
      </h1>
    </div>
  </a-card>
</template>

<style lang="scss" scoped >
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
