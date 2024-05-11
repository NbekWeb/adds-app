<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useOrder from '@/store/order.pinia.js'
import OrderItemComponent from '@/pages/dashboard/order/telegram-order/[id]/components/OrderItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import IconRefresh from '@/components/icons/IconRefresh.vue'

const route = useRoute()
const router = useRouter()

const corePinia = useCore()
const orderPinia = useOrder()

const { loadingUrl } = storeToRefs(corePinia)
const order = ref()
const orderId = computed(() => route.params.id)

function refreshOrder() {
  if (route.params.id) {
    orderPinia.getOrderById(route.params.id, (data) => {
      order.value = data
    })
  }
}
watch(orderId, () => {
  orderPinia.getOrderById(orderId.value, (data) => {
    order.value = data
  })
})
onMounted(() => {
  if (route.params.id) {
    orderPinia.getOrderById(route.params.id, (data) => {
      order.value = data
    })
  }
})
</script>

<template>
  <page-header-component :title="$t('DashboardOrderItemView')">
    <template #actions>
      <a-button class="btn" @click="refreshOrder">
        <template #icon>
          <IconRefresh class="mr-1" />
        </template>
        {{ $t('UPDATE') }}
      </a-button>
    </template>
  </page-header-component>
  <a-spin :spinning="loadingUrl.has('get/order/one')">
    <template #indicator>
      <IconLoader />
    </template>
    <scrollbar-component height="calc(100vh - 220px)">
      <template #content>
        <a-row :gutter="[10, 10]">
          <a-col :span="24" v-for="item in order?.items">
            <order-item-component :order="item" />
          </a-col>
        </a-row>
      </template>
    </scrollbar-component>
  </a-spin>

  <div>
    <a-button @click="router.back()">
      {{ $t('BACK') }}
    </a-button>
  </div>
</template>

<style scoped lang="scss"></style>
