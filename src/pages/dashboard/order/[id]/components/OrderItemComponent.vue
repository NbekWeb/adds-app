<script setup>
import { fileBaseUrl } from '@/utils/conf.js'
import StatusTagComponent from '@/components/StatusTagComponent.vue'
import dayjs from 'dayjs'
import { formatAmount } from '@/composables'
import OrderItemViewDrawerComponent from '@/pages/dashboard/order/[id]/components/OrderItemViewDrawerComponent.vue'
import { ref } from 'vue'

const props = defineProps({
  order: Object
})

const open = ref(false)
</script>

<template>
  <a-card class="order-item-card" @click="open = true">
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
      <a-col :span="3" class="item border">
        <p class="m-0">
          {{ order?.configuration.name }}
        </p>
        <span class="text-muted">
          {{ $t('RATE') }}
        </span>
      </a-col>
      <a-col :span="5" class="item border">
        <p class="m-0">
          {{ dayjs(order?.startDate).format('DD.MM.YYYY, HH:mm') }},
        </p>
        <span class="text-muted">
          {{ $t('THE_TIME_OF_PUBLICATION') }}
        </span>
      </a-col>
      <a-col :span="5" class="item border">
        <p class="m-0">
          {{ dayjs(order?.endDate).format('DD.MM.YYYY, HH:mm') }}
        </p>
        <span class="text-muted">
          {{ $t('POST_DELETED_DATE') }}
        </span>
      </a-col>
      <a-col :span="3" class="item border">
        <p class="m-0">
          {{ formatAmount(order?.amount) }}
        </p>
        <span class="text-muted">
          {{ $t('AMOUNT') }}
        </span>
      </a-col>
      <a-col :span="3" class="flex justify-end">
        <span>
          <status-tag-component :status="order?.status" />
        </span>
      </a-col>
    </a-row>
    <order-item-view-drawer-component :item="order" v-model:open="open" />
    <!--      <a-col :span="7">-->
    <!--        <reactions-component :reactions="order?.taskResponse.reactions" />-->
    <!--      </a-col>-->

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
    cursor: pointer;
    &:hover {
      background-color: rgb($light, 0.3);
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
