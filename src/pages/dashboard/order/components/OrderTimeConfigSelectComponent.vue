<script setup>
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import useBoardTimeConfiguration from '@/store/time-configuration.pinia.js'

import OrderTimeConfigComponent from '@/pages/dashboard/order/components/OrderTimeConfigComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'
import OrderDateComponent from '@/pages/dashboard/order/components/OrderDateComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const { boardId, configurationId } = defineProps({
  boardId: {
    type: [String, Number],
    required: true
  },
  configurationId: {
    type: [String, Number],
    required: true
  }
})

const model = defineModel('value')
const date = defineModel('date', { default: dayjs() })
const amount = defineModel('amount')

const corePinia = useCore()
const timeConfigBoardPinia = useBoardTimeConfiguration()

const { loadingUrl } = storeToRefs(corePinia)
const timeConfigurations = ref([])
const orderDate = ref(dayjs())

function handleChangeSelect(e) {
  amount.value = timeConfigurations.value.find(
    (item) => item.id === e.target.value.id
  )?.amount
}
function handleChangeDate() {
  date.value = orderDate.value
  timeConfigBoardPinia.getTimeConfigurationsByBoardId(
    boardId,
    configurationId,
    dayjs(orderDate.value).format('YYYY-MM-DD'),
    0,
    (data) => {
      timeConfigurations.value = data.content
    }
  )
}
onMounted(() => {
  handleChangeDate()
})
</script>

<template>
  <a-spin :spinning="loadingUrl.has('board/time-configurations')">
    <template #indicator>
      <icon-loader />
    </template>

    <div
      class="header-order-date flex my-2"
      :class="orderDate ? 'justify-between' : 'justify-end'"
    >
      <order-date-component
        v-model:value="orderDate"
        @on-change="handleChangeDate"
      />
    </div>
    <scrollbar-component height="calc(100vh - 300px)">
      <template #content>
        <template
          v-if="
            !timeConfigurations.length &&
            !loadingUrl.has('board/time-configurations')
          "
        >
          <a-empty class="empty">
            <template #description>
              {{
                orderDate ? $t('NO_DATA') : $t('SELECT_DATE_FREE_DATE_FOR_SEE')
              }}
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
