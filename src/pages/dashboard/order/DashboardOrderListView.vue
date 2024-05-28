<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useOrder from '@/store/order.pinia.js'
import useKioskOrder from '@/store/kiosk-order.pinia.js'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import TelegramOrderListComponent from '@/pages/dashboard/order/components/TelegramOrderListComponent.vue'
import KioskOrderListComponent from '@/pages/dashboard/order/components/KioskOrderListComponent.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import TelegramPostListDrawerComponent from '@/pages/dashboard/order/components/TelegramPostListDrawerComponent.vue'
import KioskPostListDrawerComponent from '@/pages/dashboard/order/components/KioskPostListDrawerComponent.vue'
import OrderPageMobileFilterComponent from '@/pages/dashboard/order/components/OrderPageMobileFilterComponent.vue'

const router = useRouter()
const route = useRoute()

const orderPinia = useOrder()
const kioskOrderPinia = useKioskOrder()

const statuses = ref([
  'PENDING',
  'AWAITING_BOARD_OWNER',
  'APPROVED',
  'STARTED',
  'FINISHED',
  'CANCELED',
  'REJECTED_BY_MODERATOR',
  'REJECTED_BY_BOARD_OWNER',
  'FAILED'
])

const selectedChannel = computed(() => route.query.channel || 'telegram')

const orderStatus = ref(route.query.status)
const open = ref(false)

const handleChangeType = (val) => {
  router.push({ query: { ...route.query, channel: val } })

  orderPinia.clearOrders()
  if (val === 'kiosk') {
    kioskOrderPinia.getAllOrders(0, orderStatus.value)
  } else {
    orderPinia.getAllOrders(0, orderStatus.value)
  }
}

const handleChangeStatus = (val) => {
  router.push({ query: { ...route.query, select: val } })
  if (selectedChannel.value === 'kiosk') {
    kioskOrderPinia.getAllOrders(0, orderStatus.value)
  } else {
    orderPinia.getAllOrders(0, orderStatus.value)
  }
}

const pushToCreate = () => {
  if (route.query.channel === 'kiosk') {
    router.push({
      name: 'KioskPostCreateView'
    })
  } else {
    router.push({
      name: 'TelegramPostCreateView'
    })
  }
}

onMounted(() => {
  if (selectedChannel.value === 'kiosk') {
    kioskOrderPinia.getAllOrders(0, orderStatus.value)
  } else {
    orderPinia.getAllOrders(0, orderStatus.value)
  }
})
</script>

<template>
  <page-header-component :title="$t('DashboardOrderListView')">
    <template #actions>
      <a-space class="flex">
        <div class="isDesktop">
          <a-select
            style="width: 120px"
            :value="selectedChannel"
            @change="handleChangeType"
            class="mr-2"
          >
            <a-select-option value="telegram">Telegram</a-select-option>
            <a-select-option value="kiosk">Kiosk</a-select-option>
          </a-select>

          <a-select
            class="order-status"
            style="width: 270px"
            allow-clear
            :placeholder="$t('FILTER_BY_STATUS')"
            v-model:value="orderStatus"
            @change="handleChangeStatus"
          >
            <a-select-option
              v-for="status in statuses"
              :value="status"
              :key="status"
            >
              {{ $t(status) }}
            </a-select-option>
          </a-select>
        </div>
        <order-page-mobile-filter-component
          :selectChannel="selectedChannel"
          :statuses="statuses"
          :orderStatus="orderStatus"
          @openPost="open = true"
        />
        <a-button class="btn" type="primary" @click="open = true">
          <template #icon>
            <IconPlus />
          </template>
          <span>{{ $t('CREATE_AN_ORDER') }} </span>
        </a-button>
      </a-space>
    </template>
  </page-header-component>
  <a-drawer
    v-model:open="open"
    width="800px"
    destroy-on-close
    root-class-name="order-post-list"
  >
    <template #title>
      <div class="flex justify-between align-center">
        <h3 class="title m-0">{{ $t('DashboardPostListView') }}</h3>
        <a-button type="primary" class="btn" @click="pushToCreate">
          <template #icon>
            <IconPlus />
          </template>
          {{ $t('ADD') }}
        </a-button>
      </div>
    </template>
    <template v-if="selectedChannel === 'kiosk'">
      <kiosk-post-list-drawer-component />
    </template>
    <template v-else>
      <telegram-post-list-drawer-component />
    </template>
  </a-drawer>
  <template v-if="selectedChannel === 'kiosk'">
    <kiosk-order-list-component />
  </template>
  <template v-else>
    <telegram-order-list-component />
  </template>
</template>

<style lang="scss">
@import '@/assets/styles/responsive';
.order-status {
  width: 200px;
  @include responsive-md {
    width: 150px;
  }
}
.order-post-list .ant-drawer-content-wrapper {
  @include responsive-md {
    width: 100% !important;
  }
}

.title {
  line-height: 20px;
}
</style>
