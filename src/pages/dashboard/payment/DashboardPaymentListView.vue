<script setup>
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import PaymentItemComponent from '@/pages/dashboard/payment/components/PaymentItemComponent.vue'
import usePayment from '@/store/payment.pinia.js'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import useCore from '@/store/core.pinia.js'

const corePinia = useCore()
const paymentPinia = usePayment()

const { payments, totalElements, totalPages, page } = storeToRefs(paymentPinia)

const payment = [
  {
    id: 1,
    amount: 100000,
    ownerId: 1,
    type: 'HOLD',
    status: 'PENDING',
    orderId: 1
  },
  {
    id: 1,
    amount: 100000,
    ownerId: 1,
    type: 'HOLD',
    status: 'SUCCESS',
    orderId: 1
  },
  {
    id: 1,
    amount: 100000,
    ownerId: 1,
    type: 'HOLD',
    status: 'CANCELED',
    orderId: 1
  },
  {
    id: 1,
    amount: 100000,
    ownerId: 1,
    type: 'HOLD',
    status: 'PENDING',
    orderId: 1
  },
  {
    id: 1,
    amount: 100000,
    ownerId: 1,
    type: 'HOLD',
    status: 'SUCCESS',
    orderId: 1
  },
  {
    id: 1,
    amount: 100000,
    ownerId: 1,
    type: 'HOLD',
    status: 'CANCELED',
    orderId: 1
  },
  {
    id: 1,
    amount: 100000,
    ownerId: 1,
    type: 'HOLD',
    status: 'PENDING',
    orderId: 1
  },
  {
    id: 1,
    amount: 100000,
    ownerId: 1,
    type: 'HOLD',
    status: 'SUCCESS',
    orderId: 1
  },
  {
    id: 1,
    amount: 100000,
    ownerId: 1,
    type: 'HOLD',
    status: 'CANCELED',
    orderId: 1
  }
]

const getPayments = (page) => {
  paymentPinia.getAllPayments({ page })
}
onMounted(() => {
  paymentPinia.getAllPayments({ page: 0 })
})
</script>

<template>
  <page-header-component :title="$t('DashboardPaymentListView')" />
  <scrollbar-component
    height="calc(100vh - 190px)"
    :loading="corePinia.loadingUrl.has('get/payment/all')"
    :count="9"
    :page="page"
    :total-pages="totalPages"
    :total-count-all="totalElements"
    @get-date="getPayments"
  >
    <template #content>
      <payment-item-component :item="item" v-for="item in payment" />
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss"></style>
