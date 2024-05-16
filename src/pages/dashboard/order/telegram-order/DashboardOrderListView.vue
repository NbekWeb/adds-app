<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useOrder from '@/store/order.pinia.js'
import useSelectChannel from '@/store/selectChannel.pinia.js'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import OrderListComponent from '@/pages/dashboard/order/telegram-order/components/OrderListComponent.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import PostListDrawerComponent from '@/pages/dashboard/order/telegram-order/components/PostListDrawerComponent.vue'
import { storeToRefs } from 'pinia'

const router = useRouter()
const route = useRoute()

const orderPinia = useOrder()
const selectChannelPinia = useSelectChannel()

const { selectChannel } = storeToRefs(selectChannelPinia)

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

const orderStatus = ref(route.query.status)
const open = ref(false)

function handleChange() {
  router.push({
    query: {
      status: orderStatus.value
    }
  })
  orderPinia.getAllOrders(0, orderStatus.value)
}

watch(selectChannel, (newChannel, oldChannel) => {
  if (newChannel !== oldChannel) {
    orderPinia.getAllOrders(0, orderStatus.value)
  }
})

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
          style="width: 270px"
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
        <a-button class="btn" type="primary" @click="open = true">
          <template #icon>
            <IconPlus />
          </template>
          <span class="isDesktop">{{ $t('CREATE_AN_ORDER') }} </span>
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
        <a-button
          type="primary"
          class="btn"
          @click="router.push({ name: 'DashboardPostCreateFormView' })"
        >
          <template #icon>
            <IconPlus />
          </template>
          {{ $t('ADD') }}
        </a-button>
      </div>
    </template>
    <post-list-drawer-component />
  </a-drawer>
  <order-list-component />
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
