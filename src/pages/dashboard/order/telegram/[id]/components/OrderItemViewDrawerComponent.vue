<script setup>
import { fileBaseUrl } from '@/utils/conf.js'
import ConfigurationComponent from '@/pages/dashboard/order/telegram/[id]/components/ConfigurationComponent.vue'
import ReactionsComponent from '@/pages/dashboard/order/telegram/[id]/components/ReactionsComponent.vue'
import ConfigurationStatisticsComponent from '@/pages/dashboard/order/telegram/[id]/components/ConfigurationStatisticsComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import StatusTagComponent from '@/components/StatusTagComponent.vue'
import { formatAmount } from '../../../../../../composables/index.js'
import ViewsComponent from '@/pages/dashboard/order/telegram/[id]/components/ViewsComponent.vue'
import WarningComponent from '@/pages/dashboard/order/telegram/[id]/components/WarningComponent.vue'
import { useRoute, useRouter } from 'vue-router'

import useOrder from '@/store/order.pinia.js'
import useUser from '@/store/user.pinia.js'

const orderPinia = useOrder()
const userPinia = useUser()

const emit = defineEmits(['canceledOrder'])

const route = useRoute()
const router = useRouter()

const props = defineProps({
  item: { type: Object, required: true }
})
const model = defineModel('open')

function cancelOrder() {
  orderPinia.putCancelOrder(
    props.item?.orderId,
    [props.item?.id],
    () => {
      emit('canceledOrder')
      userPinia.updateUserBalance(-props.item.amount)
    }
  )
  model.value = false
}
</script>

<template>
  <a-drawer
    width="600"
    v-model:open="model"
    root-class-name="order-statistics-drawer"
    class=""
  >
    <template #title>
      <div class="flex align-center">
        <a-avatar
          class="avatar"
          :src="`${fileBaseUrl}/file/${item?.board.logoHashId}`"
        />
        <h3 class="m-0 ml-2">
          {{ item.board.name }} 
          {{ item.amount }} 
        </h3>
      </div>
    </template>
    <template #extra>
      <status-tag-component :status="item.status" />
    </template>
    <scrollbar-component height="calc(100vh - 170px)">
      <template #content>
        <configuration-component
          :configuration="item?.configuration"
          :start-date="item?.startDate"
        />
        <configuration-statistics-component :statistics="item?.taskResponse" />
        <reactions-component :reactions="item?.taskResponse?.reactions" />
        <views-component :views="item?.taskResponse?.views" />
        <template v-if="item?.status === 'PENDING'">
          <a-popconfirm
            :title="$t('CONFIRMCANCELORDER')"
            :ok-text="$t('YES')"
            :cancel-text="$t('NO')"
            @confirm="cancelOrder"
          >
            <a-button class="mb-2" danger @click.stop
              >{{ $t('CANCEL') }}
            </a-button>
          </a-popconfirm>
        </template>
        <warning-component :order="item" />
      </template>
    </scrollbar-component>
    <template #footer>
      <div class="flex justify-between align-center">
        <h3 class="my-2">
          {{ $t('AMOUNT') }}
        </h3>
        <p class="m-0">{{ formatAmount(item?.amount) }} {{ $t('SOUM') }}</p>
      </div>
    </template>
  </a-drawer>
</template>

<style lang="scss">
@import '@/assets/styles/responsive';
.order-statistics-drawer {
  .ant-drawer-content-wrapper {
    @include responsive-md {
      width: 100% !important;
    }
  }
}
</style>
