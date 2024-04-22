<script setup>
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import OrderItemComponent from '@/pages/dashboard/order/[id]/components/OrderItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import { formatAmount } from '../../../../../composables/index.js'
import useOrder from '@/store/order.pinia.js'

const corePinia = useCore()
const orderPinia = useOrder()

const { visibleDrawer, loadingUrl } = storeToRefs(corePinia)
const { orderInfo } = storeToRefs(orderPinia)

function closeDrawer() {
  visibleDrawer.value.delete('order/items/drawer')
  orderPinia.clearOrderInfo()
}
</script>

<template>
  <a-drawer
    :open="visibleDrawer.has('order/items/drawer')"
    class="custom-class"
    :title="`#${orderInfo ? orderInfo?.id : ''}`"
    width="500px"
    root-class-name="order-view"
    placement="right"
    @close="closeDrawer"
  >
    <a-spin :spinning="loadingUrl.has('get/order/one')">
      <template #indicator>
        <icon-loader />
      </template>
      <scrollbar-component height="calc(100vh - 105px)">
        <template #content>
          <order-item-component v-for="item in orderInfo?.items" :item="item" />
          <div class="total-amount flex justify-between pb-2">
            <span> {{ $t('TOTAL_PRICE') }}: </span>
            <span class="text-bold">
              {{ formatAmount(orderInfo?.totalAmount) }}
              <span class="currency">{{ $t('SOUM') }}</span>
            </span>
          </div>
        </template>
      </scrollbar-component>
    </a-spin>
  </a-drawer>
</template>

<style lang="scss">
@import '@/assets/styles/variable';
@import '@/assets/styles/responsive';
.custom-class {
  width: 500px;
}
.total-amount {
  font-size: 16px;
  border-bottom: 1px dashed $muted;
}
.currency {
  font-size: 12px;
  color: $muted;
}
.order-view {
  .ant-drawer-content-wrapper {
    @include responsive-md {
      width: 100% !important;
    }
  }
}
</style>
