<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import useOrder from '@/store/order.pinia.js'
import OrderItemComponent from '@/pages/dashboard/order/[id]/components/OrderItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'

const route = useRoute()
const router = useRouter()

const orderPinia = useOrder()

const order = ref()
onMounted(() => {
  if (route.params.id) {
    orderPinia.getOrderById(route.params.id, (data) => {
      order.value = data
    })
  }
})
</script>

<template>
  <scrollbar-component height="calc(100vh - 180px)">
    <template #content>
      <a-row :gutter="[10, 10]">
        <a-col :span="24" v-for="item in order?.items">
          <order-item-component :order="item" />
        </a-col>
      </a-row>
    </template>
  </scrollbar-component>
  <div>
    <a-button @click="router.back()">
      {{ $t('BACK') }}
    </a-button>
  </div>
</template>

<style scoped lang="scss"></style>
