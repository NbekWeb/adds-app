<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import useTimeConfiguration from '@/store/time-configuration.pinia.js'
import useCore from '@/store/core.pinia.js'

import OrderTimeConfigComponent from '@/pages/dashboard/order/telegram-order/components/order-form/OrderTimeConfigComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import OrderDateComponent from '@/pages/dashboard/order/telegram-order/components/order-form/OrderDateComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'

const { boardId, configurationId } = defineProps({
  boardId: {
    type: [String, Number],
    required: true
  },
  configurationId: {
    type: [String, Number]
  }
})

const orderDate = defineModel('date')
const model = defineModel('value')
const amount = defineModel('amount')

const corePinia = useCore()
const timeConfigurationPinia = useTimeConfiguration()

const { loadingUrl } = storeToRefs(corePinia)
const { timeConfigurations } = storeToRefs(timeConfigurationPinia)

function handleChangeSelect(e) {
  amount.value = timeConfigurations.value.find(
    (item) => item.id === e.target.value.id
  )?.amount
}
function handleChangeDate(date) {
  orderDate.value = date
  timeConfigurationPinia.getTimeConfigurationsByBoardId(
    boardId,
    configurationId,
    dayjs(date).format('YYYY-MM-DD'),
    0
  )
}
onMounted(() => {
  handleChangeDate()
})

onBeforeUnmount(() => {
  timeConfigurationPinia.clearTimeConfiguration()
})
</script>

<template>
  <a-spin :spinning="loadingUrl.has('board/time-configurations')">
    <template #indicator>
      <icon-loader />
    </template>

    <div class="header-order-date flex justify-between my-2">
      <order-date-component @on-change="handleChangeDate" />
    </div>
    <scrollbar-component height="calc(100vh - 300px)">
      <template #content>
        <template
          v-if="
            !timeConfigurations?.length &&
            !loadingUrl.has('board/time-configurations')
          "
        >
          <a-empty class="empty">
            <template #description>
              {{ $t('NO_DATA') }}
            </template>
          </a-empty>
        </template>
        <template v-if="timeConfigurations.length">
          <a-radio-group
            class="w-full"
            @change="handleChangeSelect"
            v-model:value="model"
          >
            <a-row :gutter="[10, 10]">
              <a-col
                :xs="24"
                :ms="24"
                :md="12"
                :lg="8"
                :xl="8"
                :xxl="6"
                v-for="(item, i) in timeConfigurations"
                :key="i"
              >
                <order-time-config-component
                  :item="item"
                  :selected="model?.id === item.id"
                />
              </a-col>
            </a-row>
          </a-radio-group>
        </template>
      </template>
    </scrollbar-component>
  </a-spin>
</template>

<style scoped lang="scss">
.header-order-date {
  height: 38px;
}
.order-date {
  width: 280px;
}
.select-date {
  width: 100%;
  height: 50%;
  .date-picker {
    width: 240px;
  }
}
.calendar-icon {
  font-size: 64px;
}
</style>
