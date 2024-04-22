<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useOrder from '@/store/order.pinia.js'
import IconLoader from '@/components/icons/IconLoader.vue'
import OrderListItemComponent from '@/pages/dashboard/order/[id]/components/OrderListItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'

const route = useRoute()

const corePinia = useCore()
const orderPinia = useOrder()

const { visibleDrawer, loadingUrl, collapsed } = storeToRefs(corePinia)
const { orders, orderInfo, page, totalElements, totalPages } =
  storeToRefs(orderPinia)

const orderStatus = computed(() => route.query.status)
const orderId = ref(null)

function handleOpenDrawer(id) {
  visibleDrawer.value.add('order/items/drawer')
  orderId.value = id
  orderInfo.value = null
  orderPinia.getOrderById(id)
}
function getPaginationAllOrders(page) {
  orderPinia.getAllOrders(page, orderStatus.value)
}
</script>

<template>
  <a-spin class="loader" :spinning="loadingUrl.has('get/order/all')">
    <template #indicator>
      <icon-loader />
    </template>
    <scrollbar-component
      :total-pages="totalPages"
      :total-count-all="totalElements"
      :count="12"
      :page="page"
      :loading="loadingUrl.has('get/order/all')"
      @get-data="getPaginationAllOrders"
      height="calc(100vh - 190px)"
    >
      <template #content>
        <template
          v-if="!orders?.length && !corePinia.loadingUrl.has('get/order/all')"
        >
          <a-empty class="empty">
            <template #description>
              {{ $t('NO_DATA') }}
            </template>
          </a-empty>
        </template>
        <template v-if="orders.length">
          <a-row :gutter="[10, 10]">
            <a-col
              :xs="24"
              :sm="12"
              :md="collapsed ? 12 : 24"
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
      </template>
    </scrollbar-component>
  </a-spin>
</template>

<style scoped lang="scss"></style>
