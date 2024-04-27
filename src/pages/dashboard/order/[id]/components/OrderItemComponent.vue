<script setup>
import { fileBaseUrl } from '@/utils/conf.js'
import StatusTagComponent from '@/components/StatusTagComponent.vue'
import { formatHourAndMinute, formatTime } from '@/composables/index.js'
import ConfigurationComponent from '@/pages/dashboard/order/[id]/components/ConfigurationComponent.vue'
import ReactionsComponent from '@/pages/dashboard/order/[id]/components/ReactionsComponent.vue'
import dayjs from 'dayjs'
import amount from '../../../../../composables/amount.js'

const props = defineProps({
  order: Object
})
</script>

<template>
  <a-card class="order-item-card">
    <a-row>
      <a-col :span="5" class="flex justify-start">
        <a-avatar
          :src="`${fileBaseUrl}/file/${order?.board.logoHashId}`"
          size="large"
        />
        <div class="item ml-2">
          <p class="m-0">
            {{ order?.board.name }}
          </p>
          <span class="text-muted">
            {{ $t('NAME') }}
          </span>
        </div>
      </a-col>
      <a-col :span="1" class="item border">
        <p class="m-0">
          {{ order?.configuration.name }}
        </p>
        <span class="text-muted">
          {{ $t('RATE') }}
        </span>
      </a-col>
      <a-col :span="3" class="item border">
        <p class="m-0">
          {{ dayjs(order?.taskResponse.startDate).format('DD.MM.YYYY') }},
          {{ formatHourAndMinute(order?.taskResponse.startDate) }}
        </p>
        <span class="text-muted">
          {{ $t('START_DATE') }}
        </span>
      </a-col>
      <a-col :span="3" class="item border">
        <p class="m-0">
          {{ dayjs(order?.taskResponse.endDate).format('DD.MM.YYYY') }},
          {{ formatHourAndMinute(order?.taskResponse.endDate) }}
        </p>
        <span class="text-muted">
          {{ $t('END_DATE') }}
        </span>
      </a-col>
      <a-col :span="3" class="item border">
        <p class="m-0">
          {{ amount(order?.amount) }}
        </p>
        <span class="text-muted">
          {{ $t('AMOUNT') }}
        </span>
      </a-col>
      <a-col :span="7">
        <reactions-component :reactions="order?.taskResponse.reactions" />
      </a-col>
      <a-col :span="2">
        <status-tag-component :status="order?.status" />
      </a-col>
    </a-row>

    <!--    <configuration-component :configuration="order?.configuration" />-->

    <!--    <a-row justify="space-between">-->
    <!--      <a-col>-->
    <!--        <h4>-->
    <!--          {{ $t('AMOUNT') }}-->
    <!--        </h4>-->
    <!--      </a-col>-->
    <!--      <a-col>{{ order?.amount }}</a-col>-->
    <!--    </a-row>-->
  </a-card>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.order-item-card {
  &:deep(.ant-card-body) {
    transition: background-color 0.3s;
    &:hover {
      background-color: rgb($light, 0.5);
    }
  }
}
.item {
  p {
    font-weight: bolder;
    //font-size: 16px;
    line-height: 18px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  span {
    font-size: 14px;
    line-height: 16px;
  }
}
.border {
  //border-left: 1px solid $muted;
  //padding-left: 10px;
}
</style>
