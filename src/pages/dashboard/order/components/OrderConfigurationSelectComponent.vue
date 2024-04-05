<script setup>
import { onMounted, ref } from 'vue'
import useBoardConfiguration from '@/store/board-configuration.pinia.js'
import OrderBoardConfigurationComponent from '@/pages/dashboard/order/components/OrderBoardConfigurationComponent.vue'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'

const model = defineModel('value')
const amount = defineModel('amount')
const { boardId } = defineProps({
  boardId: {
    type: [String, Number],
    required: true
  }
})

const corePinia = useCore()
const configPinia = useBoardConfiguration()

const { loadingUrl } = storeToRefs(corePinia)
const { configurations, page, totalElements, totalPages } =
  storeToRefs(configPinia)

function handleSelectConfig(e) {
  amount.value = configurations.value.find(
    (item) => item.id === e.target.value.id
  )?.amount
}
function getPaginationAllConfiguration(page) {
  configPinia.getConfigurationsByBoardId(boardId, page)
}
onMounted(() => {
  configPinia.getConfigurationsByBoardId(boardId, 0)
})
</script>

<template>
  <scrollbar-component
    height="calc(100vh - 250px)"
    :loading="loadingUrl.has('board/configurations')"
    :page="page"
    :count="12"
    :total-count-all="totalElements"
    :total-pages="totalPages"
    @get-data="getPaginationAllConfiguration"
  >
    <template #content>
      <template
        v-if="!configurations.length && !loadingUrl.has('board/configurations')"
      >
        <a-empty class="empty">
          <template #description>
            {{ $t('NO_DATA') }}
          </template>
        </a-empty>
      </template>

      <template v-if="configurations.length">
        <a-radio-group v-model:value="model" @change="handleSelectConfig">
          <order-board-configuration-component
            v-for="(item, i) in configurations"
            :item="item"
            :selected="model?.id === item.id"
            :key="i"
          />
        </a-radio-group>
      </template>
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss"></style>
