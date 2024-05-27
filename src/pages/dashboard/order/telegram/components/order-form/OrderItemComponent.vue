<script setup>
import { formatTextLength, formatAmount } from '@/composables/index.js'
import dayjs from 'dayjs'
import IconX from '@/components/icons/IconX.vue'
import { fileBaseUrl } from '@/utils/conf.js'
import BoardConfigurationTimeComponent from '@/components/BoardConfigurationTimeComponent.vue'

const emits = defineEmits(['close'])

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <a-card class="order-item-card">
    <a-button @click="emits('close')" class="close-btn" type="link">
      <icon-x />
    </a-button>
    <div class="order-item-info">
      <div class="flex justify-between align-center">
        <div class="flex align-center">
          <a-avatar
            :src="`${fileBaseUrl}/file/${item.board.logoHashId}`"
            size="large"
            class="avatar"
          />
          <h1 class="channel-name ml-2 m-0">
            {{ formatTextLength(item.board?.name, 25) }}
          </h1>
        </div>
        <template v-if="item?.configuration?.name"> </template>
        <h1 class="configuration-name m-0">{{ item?.configuration?.name }}</h1>
      </div>
      <div class="flex flex-column justify-between my-2">
        <template v-if="item?.configuration?.liveTime">
          <board-configuration-time-component
            icon="🕐"
            :configuration="item?.configuration"
            time-type="liveTime"
          />
          <board-configuration-time-component
            icon="🔝"
            :configuration="item?.configuration"
            time-type="topTime"
            class="my-2"
          />
          <board-configuration-time-component
            icon="📌"
            :configuration="item?.configuration"
            time-type="pinTime"
          />
        </template>
        <template v-else>
          <h1>
            {{ $t('POSTING_AN_AD_WITHOUT_RATE_ON_THE_CHANNEL') }}
          </h1>
        </template>
      </div>

      <div class="flex justify-between">
        <div class="date">
          <span>{{ $t('THE_TIME_OF_PUBLICATION') }}</span>
          <p class="m-0">
            {{ dayjs(item.orderDate).format('DD.MM.YYYY') }},
            {{ item.timeConfiguration?.startTime.slice(0, 5) }}
          </p>
        </div>
        <div class="amount">
          <span> {{ $t('AMOUNT') }} </span>
          <p class="m-0">
            {{
              formatAmount(
                (item.configuration?.amount ?? 0) +
                  (item.timeConfiguration?.amount ?? 0)
              )
            }}
          </p>
        </div>
      </div>
    </div>
  </a-card>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.order-item-card {
  position: relative;
  &:hover {
    background-color: rgb($light, 0.4);
  }
  .close-btn {
    position: absolute;
    top: 0;
    right: -5px;
    font-size: 20px;
    color: $muted;
    &:hover {
      color: $body;
    }
  }
}
.order-item-info {
  span {
    font-size: 12px;
    //font-weight: bolder;
    //color: $muted;
  }
}
.channel-name {
  font-size: 18px;
  font-weight: bold;
  color: $body;
}
.configuration-name {
  font-size: 16px;
  font-weight: bold;
  color: $body;
}
.date p {
  font-size: 14px;
  font-weight: bolder;
  color: $body;
}
.amount p {
  font-size: 14px;
  font-weight: bolder;
  color: $body;
}
</style>
