<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import useKioskOrder from '@/store/kiosk-order.pinia.js'
import OrderItemComponent from '@/pages/dashboard/order/kiosk-order/[id]/components/OrderItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import IconRefresh from '@/components/icons/IconRefresh.vue'

const route = useRoute()
const router = useRouter()

const corePinia = useCore()
const orderPinia = useKioskOrder()

const { loadingUrl } = storeToRefs(corePinia)

const order = ref()
function refreshOrder() {
  if (route.params.id) {
    orderPinia.getOrderById(route.params.id, (data) => {
      order.value = data
    })
  }
}
onMounted(() => {
  if (route.params.id) {
    orderPinia.getOrderById(route.params.id, (data) => {
      order.value = data
    })
  }
})
</script>

<template>
  <page-header-component :title="$t('DashboardKioskOrderItemView')">
    <template #actions>
      <a-button class="btn" @click="refreshOrder">
        <template #icon>
          <IconRefresh class="mr-1" />
        </template>
        {{ $t('UPDATE') }}
      </a-button>
    </template>
  </page-header-component>
  <a-spin :spinning="loadingUrl.has('get/kiosk-order/one')">
    <template #indicator>
      <IconLoader />
    </template>
    <scrollbar-component height="calc(100vh - 220px)">
      <template #content>
        <a-row :gutter="[10, 10]">
          <a-col :span="24" v-for="(item, i) in order?.items" :key="i">
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
