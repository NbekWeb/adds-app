<script setup>
import { formatAmount, formatTime, fileBaseUrl } from '@/composables'
import StatusTagComponent from '@/components/StatusTagComponent.vue'
import IconAnnouncementVoic from '@/components/icons/IconAnnouncementVoic.vue'
import IconPin from '@/components/icons/IconPin.vue'

const { item } = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card mb-3">
    <div class="flex align-center justify-between align-center">
      <div class="flex justify-between align-center">
        <a-avatar
          size="large"
          class="board-item-avatar avatar"
          :src="`${fileBaseUrl}/file/${item.channelHashId}`"
        />
        <div>
          <h3 class="channel-name m-0 ml-1">
            {{
              item.board.name.length > 30
                ? `${item.board.name.slice(0, 25)}...`
                : item.board.name
            }}
          </h3>
          <status-tag-component
            class="order-status ml-1 py-0"
            :status="item.status"
          />
        </div>
      </div>
      <p class="configuration">
        {{
          item.configuration.name.length > 10
            ? `${item.configuration.name.slice(0, 10)}...`
            : item.configuration.name
        }}
      </p>
    </div>

    <div class="flex justify-between align-center">
      <!--      kanal-->
      <div class="flex justify-between align-center my-2">
        <span class="mr-1">
          <icon-announcement-voic />
        </span>
        <p class="text-bold mb-1">
          {{ formatTime(item.configuration.liveTime, 'day') }}
          {{ $t('DAY').toLowerCase() }},
          {{ formatTime(item.configuration.liveTime, 'hour') }}
          {{ $t('HOUR').toLowerCase() }},
          {{ formatTime(item.configuration.liveTime, 'minute') }}
          {{ $t('MINUTE').toLowerCase() }}
        </p>
      </div>
      <!--      pin-->
      <div class="flex justify-between align-center">
        <span class="mr-1">
          <icon-pin />
        </span>
        <p class="text-bold mb-1">
          {{ formatTime(item.configuration.pinTime, 'day') }}
          {{ $t('DAY').toLowerCase() }},
          {{ formatTime(item.configuration.pinTime, 'hour') }}
          {{ $t('HOUR').toLowerCase() }},
          {{ formatTime(item.configuration.pinTime, 'minute') }}
          {{ $t('MINUTE').toLowerCase() }}
        </p>
      </div>
      <!--      top-->
      <span class="time-value text-bold">
        {{ formatTime(item.configuration.topTime, 'day') }}
        {{ $t('DAY').toLowerCase() }},
        {{ formatTime(item.configuration.topTime, 'hour') }}
        {{ $t('HOUR').toLowerCase() }},
        {{ formatTime(item.configuration.topTime, 'minute') }}
        {{ $t('MINUTE').toLowerCase() }}
      </span>
    </div>

    <div class="flex justify-between align-center">
      <span class="label">{{ $t('THE_TIME_OF_PUBLICATION') }}:</span>
      <span class="date text-bold">
        {{ item.orderDate }}, {{ item.timeConfiguration.startTime.slice(0, 5) }}
      </span>
    </div>
    <div class="flex justify-between">
      <span class="label"> {{ $t('ORDER_PRICE') }}: </span>
      <span class="amount text-bold">
        {{ formatAmount(item.amount) }}
        <span class="currency text-bold">{{ $t('SOUM') }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.card {
  border-bottom: 1px dashed $muted;
}
.board-item-avatar {
  width: 50px;
  height: 50px;
}
.label {
  margin-bottom: 8px;
  //font-weight: bolder;
  font-size: 14px;
  //color: $muted;
}
.channel-name {
  font-weight: bold;
}
.order-status {
  line-height: 15px;
}
.configuration {
  font-weight: bolder;
  font-size: 14px;
  margin: 0;
}

.currency {
  font-size: 10px;
  color: $muted;
}
.time-value {
  font-size: 14px;
}
</style>
