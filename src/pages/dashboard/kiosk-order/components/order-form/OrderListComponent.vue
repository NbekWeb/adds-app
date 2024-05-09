<script setup>
import { computed,onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useOrder from '@/store/kiosk-order.pinia.js'
import IconLoader from '@/components/icons/IconLoader.vue'
import OrderListItemComponent from '@/pages/dashboard/order/[id]/components/OrderListItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'

const route = useRoute()

const corePinia = useCore()
const orderPinia = useOrder()

const { loadingUrl, collapsed } = storeToRefs(corePinia)
const { orders, page, totalElements, totalPages } = storeToRefs(orderPinia)

const orderStatus = computed(() => route.query.status)

function getPaginationAllOrders(page) {
  orderPinia.getAllOrders(page, orderStatus.value)
}

onMounted(() => {
      console.log(orderPinia.getAllOrders(0, orderStatus.value));
    });
</script>

<template>
  <a-spin class="loader" :spinning="loadingUrl.has('get/order/all')">
    <template #indicator>
      <icon-loader />
    </template>
    <scrollbar-component
      :total-pages="totalPages"
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
              v-for="(item,i) in orders"
              :key="i"
            >
              <order-list-item-component :item="item" />
            </a-col>
          </a-row>
        </template>
      </template>
    </scrollbar-component>
  </a-spin>
</template>

<style scoped lang="scss"></style>
