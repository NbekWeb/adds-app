<script setup>
import {
  formatTextLength,
  formatTime,
  formatAmount
} from '@/composables/index.js'
import dayjs from 'dayjs'
import IconX from '@/components/icons/IconX.vue'
import IconAnnouncementVoic from '@/components/icons/IconAnnouncementVoic.vue'
import IconPin from '@/components/icons/IconPin.vue'
import { fileBaseUrl } from '@/utils/conf.js'

const emits = defineEmits(['close'])

const { item } = defineProps({
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
        <h1 class="configuration-name m-0">{{ item.configuration?.name }}</h1>
      </div>
      <!--      <span> Ta'rif </span>-->
      <div class="flex flex-column justify-between my-2">
        <!--      kanal-->
        <div class="flex align-center">
          <span class="mr-1">
            <icon-announcement-voic />
          </span>
          <p class="mb-0">
            {{ formatTime(item.configuration.liveTime, 'day') }}
            {{ $t('DAY').toLowerCase() }},
            {{ formatTime(item.configuration.liveTime, 'hour') }}
            {{ $t('HOUR').toLowerCase() }}
            {{ formatTime(item.configuration.liveTime, 'minute') }}
            {{ $t('MINUTE').toLowerCase() }}
          </p>
        </div>
        <!--      pin-->
        <div class="flex align-center">
          <span class="mr-1">
            <icon-pin />
          </span>
          <p class="mb-0">
            {{ formatTime(item.configuration.pinTime, 'day') }}
            {{ $t('DAY').toLowerCase() }},
            {{ formatTime(item.configuration.pinTime, 'hour') }}
            {{ $t('HOUR').toLowerCase() }}
            {{ formatTime(item.configuration.pinTime, 'minute') }}
            {{ $t('MINUTE').toLowerCase() }}
          </p>
        </div>
        <div class="flex align-center">
          <!--      top-->
          <span class="mr-1">
            <icon-pin />
          </span>
          <p class="mb-0">
            {{ formatTime(item.configuration.topTime, 'day') }}
            {{ $t('DAY').toLowerCase() }},
            {{ formatTime(item.configuration.topTime, 'hour') }}
            {{ $t('HOUR').toLowerCase() }},
            {{ formatTime(item.configuration.topTime, 'minute') }}
            {{ $t('MINUTE').toLowerCase() }}
          </p>
        </div>
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
                item.configuration?.amount + item.timeConfiguration?.amount
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
