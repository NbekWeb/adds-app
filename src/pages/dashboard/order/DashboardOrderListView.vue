<script setup>
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import { useRouter } from 'vue-router'
import useOrder from '@/store/order.pinia.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import OrderListItemComponent from '@/pages/dashboard/order/[id]/components/OrderListItemComponent.vue'
import OrderItemDrowerComponent from '@/pages/dashboard/order/[id]/components/OrderItemDrowerComponent.vue'
import useCore from '@/store/core.pinia.js'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'

const router = useRouter()

const corePinia = useCore()
const orderPinia = useOrder()

const { visibleDrawer, loadingUrl } = storeToRefs(corePinia)
const { orders, page, totalElements, totalPages } = storeToRefs(orderPinia)

const orderId = ref(null)
const orderInfo = ref(null)
function handleOpenDrawer(id) {
  visibleDrawer.value.add('order/items/drawer')
  orderId.value = id
  orderInfo.value = null
  getOrderItems(id)
}

function getOrderItems(id) {
  orderPinia.getOrderById(id, (data) => {
    orderInfo.value = data
  })
}

onMounted(() => {
  orderPinia.getAllOrders()
})
</script>

<template>
  <page-header-component :title="$t('DashboardOrderListView')" />
  <a-spin :spinning="loadingUrl.has('get/order/all')">
    <template #indicator>
      <icon-loader />
    </template>
    <scrollbar-component
      :total-pages="totalPages"
      :total-count-all="totalElements"
      @get-data="orderPinia.getAllOrders"
      height="calc(100vh - 190px)"
    >
      <template #content>
        <a-row :gutter="[10, 10]">
          <a-col
            :xs="24"
            :ms="24"
            :md="24"
            :lg="12"
            :xl="8"
            :xxl="6"
            v-for="item in orders"
          >
            <order-list-item-component
              :item="item"
              @get-one="handleOpenDrawer"
            />
          </a-col>
        </a-row>
      </template>
    </scrollbar-component>
  </a-spin>

  <order-item-drower-component :order="orderInfo" />
</template>

<style scoped lang="scss"></style>
