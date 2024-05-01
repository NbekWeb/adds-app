<script setup>
import { fileBaseUrl } from '@/utils/conf.js'
import ConfigurationComponent from '@/pages/dashboard/order/[id]/components/ConfigurationComponent.vue'
import ReactionsComponent from '@/pages/dashboard/order/[id]/components/ReactionsComponent.vue'
import ConfigurationStatisticsComponent from '@/pages/dashboard/order/[id]/components/ConfigurationStatisticsComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'

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
        <a-avatar :src="`${fileBaseUrl}/file/${item?.board.logoHashId}`" />
        <h3 class="m-0 ml-2">
          {{ item.board.name }}
        </h3>
      </div>
    </template>
    <scrollbar-component height="calc(100vh - 115px)">
      <template #content>
        <template v-if="item?.configuration">
          <configuration-component :configuration="item?.configuration" />
        </template>
        <template v-if="item?.taskResponse?.startDate">
          <configuration-statistics-component
            :statistics="item?.taskResponse"
          />
        </template>
        <template v-if="item?.taskResponse?.reactions?.length">
          <reactions-component :reactions="item?.taskResponse?.reactions" />
        </template>
        <template v-if="item?.taskResponse?.views">
          <div class="views flex justify-between">
            <h2>Ko'rishlar</h2>
            <p class="m-0">
              {{
                item?.taskResponse?.views > 1000
                  ? `${Math.floor(item?.taskResponse?.views / 1000)}k`
                  : item?.taskResponse?.views
              }}
            </p>
          </div>
        </template>
      </template>
    </scrollbar-component>
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
