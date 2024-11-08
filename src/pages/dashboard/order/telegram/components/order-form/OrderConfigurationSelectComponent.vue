<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import useBoardConfiguration from '@/store/board-configuration.pinia.js'
import OrderBoardConfigurationComponent from '@/pages/dashboard/order/telegram/components/order-form/OrderBoardConfigurationComponent.vue'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import OrderBoardDefaultConfigurationComponent from '@/pages/dashboard/order/telegram/components/order-form/OrderBoardDefaultConfigurationComponent.vue'

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
onBeforeUnmount(() => {
  configPinia.clearConfigurations()
})
</script>

<template>
  <scrollbar-component
    class="flex-grow"
    :loading="loadingUrl.has('board/configurations')"
    :page="page"
    :count="12"
    :total-pages="totalPages"
    @get-data="getPaginationAllConfiguration"
  >
    <template #content>
      
      <a-radio-group
        class="w-full"
        v-model:value="model"
        @change="handleSelectConfig"
      >
        <a-row :gutter="[10, 10]">
          <template v-if="configurations.length">
            <a-col
              :xs="24"
              :sm="24"
              :md="12"
              :lg="8"
              :xl="6"
              :xll="4"
              v-for="(item, i) in configurations"
              :key="i"
            >
              <order-board-configuration-component
                :item="item"
                :selected="model?.id === item.id"
              />
            </a-col>
          </template>
          <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" :xll="4">
            <order-board-default-configuration-component
              :selected="model === 'default'"
            />
          </a-col>
        </a-row>
      </a-radio-group>
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss"></style>
