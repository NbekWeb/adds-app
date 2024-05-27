<script setup>
import { fileBaseUrl } from '@/utils/conf.js'
import StatusTagComponent from '@/components/StatusTagComponent.vue'
import dayjs from 'dayjs'
import { formatAmount } from '@/composables/index.js'

import { ref } from 'vue'

import useOrder from '@/store/order.pinia.js'
import useUser from '@/store/user.pinia.js'

const orderPinia = useOrder()
const userPinia = useUser()
const emit = defineEmits(['canceledOrder'])

const props = defineProps({
  order: Object
})

function cancelOrder() {
  orderPinia.putKioskCancelOrder(
    props.order?.orderId,
    [props.order?.id],
    () => {
      emit('canceledOrder')
      userPinia.getUserMe()
    }
  )
}

const open = ref(false)
</script>

<template>
  <a-card class="order-item-card">
    <a-row justify="space-between">
      <a-col
        :span="4"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="4"
        :xl="4"
        class="flex justify-start"
      >
        <div class="item pl-2">
          <p class="m-0">
            {{ order?.board.name }}
          </p>
          <span class="sub-title text-muted">
            {{ $t('NAME') }}
          </span>
        </div>
      </a-col>
      <a-col
        :span="6"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        class="item border"
      >
        <p class="m-0">{{ order?.orderSeconds }} sekund</p>
        <span class="sub-title text-muted">
          {{ $t('THE_TIME_OF_DURATION') }}
        </span>
      </a-col>

      <a-col
        :span="6"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="6"
        :xl="6"
        class="item border pl-2 my-2"
      >
        <p class="m-0">
          {{ formatAmount(order?.amount) }} <span>{{ $t('SOUM') }}</span>
        </p>
        <span class="sub-title amount text-muted">
          {{ $t('AMOUNT') }}
        </span>
      </a-col>

      <a-col
        :span="8"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="8"
        :xl="8"
        class="item border"
      >
        <div class="pl-2 flex align-center">
          <status-tag-component
            :status="order?.status"
            class="flex align-center mr-4"
          />
          <template v-if="order?.status === 'PENDING'">
            <a-popconfirm
              :title="$t('CONFIRMCANCELORDER')"
              :ok-text="$t('YES')"
              :cancel-text="$t('NO')"
              @confirm="cancelOrder"
            >
              <a-button danger @click.stop>{{ $t('CANCEL') }} </a-button>
            </a-popconfirm>
          </template>

          <template v-else>
            <a-button danger disabled>{{ $t('CANCEL') }} </a-button>
          </template>
        </div>
      </a-col>
    </a-row>
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
  .cancel-btn {
    justify-content: end;
    @media (max-width: 992px) {
      justify-content: start;
    }
  }
  .end-item {
    display: flex;
    justify-content: start;
    @media (max-width: 992px) {
      justify-content: end;
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

  .sub-title {
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

/* .amount-status {
  display: flex;
  gap: 1rem;
  align-items: center;

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
} */
</style>
