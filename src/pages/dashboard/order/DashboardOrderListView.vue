<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useOrder from '@/store/order.pinia.js'
import useCore from '@/store/core.pinia.js'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import OrderItemDrawerComponent from '@/pages/dashboard/order/[id]/components/OrderItemDrawerComponent.vue'
import OrderListComponent from '@/pages/dashboard/order/components/OrderListComponent.vue'

const router = useRouter()
const route = useRoute()
const corePinia = useCore()
const orderPinia = useOrder()

const { loadingUrl } = storeToRefs(corePinia)
const { orderInfo, statusList } = storeToRefs(orderPinia)

const orderStatus = ref(route.query.status)

function handleChange() {
  router.push({
    query: {
      status: orderStatus.value
    }
  })
  orderPinia.getAllOrders(0, orderStatus.value)
}

onMounted(() => {
  orderPinia.getAllOrders(0, orderStatus.value)
  orderPinia.getAllOrdersStatus()
})
</script>

<template>
  <page-header-component :title="$t('DashboardOrderListView')">
    <template #actions>
      <a-space>
        <a-select
          class="order-status"
          allow-clear
          :placeholder="$t('FILTER_BY_STATUS')"
          v-model:value="orderStatus"
          @change="handleChange"
        >
          <a-select-option
            v-for="status in statusList"
            :value="status?.orderStatus"
            :key="status?.orderStatus"
          >
            {{ status?.localName }}
          </a-select-option>
        </a-select>
        <a-button
          type="primary"
          @click="router.push({ name: 'DashboardPostView' })"
        >
          {{ $t('CREATE_AN_ORDER') }}
        </a-button>
      </a-space>
    </template>
  </page-header-component>
  <order-item-drawer-component :order="orderInfo" />
  <order-list-component />
</template>

<style scoped lang="scss">
.order-status {
  width: 200px;
}
</style>
