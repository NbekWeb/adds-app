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
      <a-col
        :span="5"
        :xs="12"
        :sm="12"
        :md="5"
        :lg="5"
        :xl="5"
        class="flex justify-start"
      >
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
      <a-col
        :span="4"
        :xs="12"
        :sm="12"
        :md="2"
        :lg="4"
        :xl="4"
        class="item config-name border"
      >
        <template v-if="order?.configuration?.name">
          <p class="m-0">
            {{ order?.configuration?.name }}
          </p>
          <span class="text-muted">
            {{ $t('RATE') }}
          </span>
        </template>
      </a-col>
      <a-col
        :span="4"
        :xs="12"
        :sm="12"
        :md="5"
        :lg="4"
        :xl="4"
        class="item border"
      >
        <p class="m-0">
          {{ dayjs(order?.startDate).format('DD.MM.YYYY, HH:mm') }},
        </p>
        <span class="text-muted">
          {{ $t('THE_TIME_OF_PUBLICATION') }}
        </span>
      </a-col>
      <a-col
        :span="5"
        :xs="12"
        :sm="12"
        :md="6"
        :lg="5"
        :xl="5"
        class="item border"
      >
        <p class="m-0">
          <template v-if="order?.endDate">
            {{ dayjs(order?.endDate).format('DD.MM.YYYY, HH:mm') }}
          </template>
          <template v-else> - </template>
        </p>
        <span class="text-muted">
          {{ $t('POST_DELETED_DATE') }}
        </span>
      </a-col>

      <a-col :xs="24" :sm="24" :md="5" :lg="5" :xl="6" class="item border">
        <div class="amount-status">
          <div>
            <p class="m-0">
              {{ formatAmount(order?.amount) }} <span>{{ $t('SOUM') }}</span>
            </p>
            <span class="amount text-muted">
              {{ $t('AMOUNT') }}
            </span>
          </div>

          <span>
            <status-tag-component :status="order?.status" />
          </span>
        </div>
      </a-col>
    </a-row>
    <order-item-view-drawer-component :item="order" v-model:open="open" />
  </a-card>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
@import '@/assets/styles/responsive';

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
  @include responsive-md {
    margin-bottom: 8px;
  }
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
.config-name {
  @include responsive-md {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}

.amount-status {
  display: flex;
  justify-content: space-between;

  @include responsive-md {
    flex-direction: row-reverse;
    align-items: flex-start;
    justify-content: space-between;
  }

  .amount {
    @include responsive-md {
      display: none;
    }
  }
}
.border {
  //border-left: 1px solid $muted;
  //padding-left: 10px;
}
</style>
