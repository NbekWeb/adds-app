<script setup>
import { fileBaseUrl } from '@/utils/conf.js'
import ConfigurationComponent from '@/pages/dashboard/order/[id]/components/ConfigurationComponent.vue'
import ReactionsComponent from '@/pages/dashboard/order/[id]/components/ReactionsComponent.vue'
import ConfigurationStatisticsComponent from '@/pages/dashboard/order/[id]/components/ConfigurationStatisticsComponent.vue'

const props = defineProps({
  item: { type: Object, required: true }
})
const model = defineModel('open')
</script>

<template>
  <a-drawer width="600" v-model:open="model">
    <template #title>
      <div class="flex align-center">
        <a-avatar :src="`${fileBaseUrl}/file/${item?.board.logoHashId}`" />
        <h3 class="m-0 ml-2">
          {{ item.board.name }}
        </h3>
      </div>
    </template>
    <configuration-component :configuration="item?.configuration" />
    <template v-if="item?.taskResponse?.startDate">
      <configuration-statistics-component :statistics="item?.taskResponse" />
    </template>
    <template v-if="item?.taskResponse?.reactions?.length">
      <reactions-component :reactions="item?.taskResponse?.reactions" />
    </template>
  </a-drawer>
</template>

<style scoped lang="scss"></style>
