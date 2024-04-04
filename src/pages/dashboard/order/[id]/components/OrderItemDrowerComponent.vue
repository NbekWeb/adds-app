<script setup>
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import OrderItemComponent from '@/pages/dashboard/order/[id]/components/OrderItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import { formatAmount } from '../../../../../composables/index.js'

const { order } = defineProps({
  order: {
    type: [Object, null, undefined],
    required: true
  }
})

const corePinia = useCore()
const { visibleDrawer, loadingUrl } = storeToRefs(corePinia)
</script>

<template>
  <a-drawer
    :open="visibleDrawer.has('order/items/drawer')"
    class="custom-class"
    :title="`#${order ? order?.id : ''}`"
    width="500px"
    placement="right"
    @close="visibleDrawer.delete('order/items/drawer')"
  >
    <a-spin :spinning="loadingUrl.has('get/order/one')">
      <template #indicator>
        <icon-loader />
      </template>
      <scrollbar-component height="calc(100vh - 105px)">
        <template #content>
          <order-item-component v-for="item in order?.items" :item="item" />
          <div class="total-amount flex justify-between pb-2">
            <span> Jami to'lov: </span>
            <span class="text-bold">
              {{ formatAmount(order?.totalAmount) }}
              <span class="currency">UZS</span>
            </span>
          </div>
        </template>
      </scrollbar-component>
    </a-spin>

    <!--    <pre>{{ order }}</pre>-->
  </a-drawer>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
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
</style>
