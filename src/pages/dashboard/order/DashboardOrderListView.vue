<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useOrder from '@/store/order.pinia.js'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import OrderListComponent from '@/pages/dashboard/order/components/order-form/OrderListComponent.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const router = useRouter()
const route = useRoute()
const orderPinia = useOrder()

const { orderInfo } = storeToRefs(orderPinia)

const statuses = ref(['PENDING', 'APPROVED', 'REJECTED', 'CANCELED'])

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
            v-for="status in statuses"
            :value="status"
            :key="status"
          >
            {{ $t(status) }}
          </a-select-option>
        </a-select>
        <a-button
          class="btn"
          type="primary"
          @click="router.push({ name: 'DashboardPostView' })"
        >
          <template #icon>
            <IconPlus />
          </template>
          <span class="isDesktop">{{ $t('CREATE_AN_ORDER') }}</span>
        </a-button>
      </a-space>
    </template>
  </page-header-component>
  <order-list-component />
</template>

<style scoped lang="scss">
@import '@/assets/styles/responsive';
.order-status {
  width: 200px;
  @include responsive-md {
    width: 150px;
  }
}
</style>
