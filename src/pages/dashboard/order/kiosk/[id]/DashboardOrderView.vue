<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref,watch } from 'vue'
import useKioskOrder from '@/store/kiosk-order.pinia.js'
import OrderItemComponent from '@/pages/dashboard/order/kiosk/[id]/components/OrderItemComponent.vue'
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

watch(
  () =>route.params.id,
  () => {
    refreshOrder()
  }
);

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
      <a-button
        class="btn"
        @click="refreshOrder"
        :disabled="loadingUrl.has('get/order/one')"
      >
        <template #icon>
          <IconRefresh class="mr-1" />
        </template>
        <span class="refresh-text">
          {{ $t('UPDATE') }}
        </span>
      </a-button>
    </template>
  </page-header-component>
  <a-spin :spinning="loadingUrl.has('get/order/one')">
    <template #indicator>
      <IconLoader />
    </template>
    <scrollbar-component height="calc(100vh - 230px)">
      <template #content>
        <a-row :gutter="[10, 10]">
          <a-col :span="24" v-for="(item, i) in order?.items" :key="i">
            <order-item-component :order="item" @cancelOrder="refreshOrder" />
          </a-col>
        </a-row>
      </template>
    </scrollbar-component>
  </a-spin>

  <div>
    <a-button @click="router.back()" class="">
      {{ $t('BACK') }}
    </a-button>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/responsive';

.refresh-text {
  @include responsive-md {
    display: none;
  }
}
</style>
