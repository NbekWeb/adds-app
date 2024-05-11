<script setup>
import { fileBaseUrl } from '@/utils/conf.js'
import ConfigurationComponent from '@/pages/dashboard/kiosk-order/[id]/components/ConfigurationComponent.vue'
import ReactionsComponent from '@/pages/dashboard/kiosk-order/[id]/components/ReactionsComponent.vue'
import ConfigurationStatisticsComponent from '@/pages/dashboard/kiosk-order/[id]/components/ConfigurationStatisticsComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import StatusTagComponent from '@/components/StatusTagComponent.vue'
import { formatAmount } from '../../../../../composables/index.js'
import ViewsComponent from '@/pages/dashboard/kiosk-order/[id]/components/ViewsComponent.vue'
import WarningComponent from '@/pages/dashboard/kiosk-order/[id]/components/WarningComponent.vue'

const props = defineProps({
  item: { type: Object, required: true }
})
const model = defineModel('open')
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
        <h3 class="m-0 ml-2">
          {{ item.board.name }}
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
