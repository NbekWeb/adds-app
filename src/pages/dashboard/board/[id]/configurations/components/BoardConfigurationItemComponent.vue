<script setup>
import { storeToRefs } from 'pinia'
import formatAmount from '@/composables/amount.js'
import formatTime from '@/composables/date.js'
import useCore from '@/store/core.pinia.js'
import useBoardTimeConfiguration from '@/store/board-time-configuration.pinia.js'
import { onMounted, reactive, ref } from 'vue'

const corePinia = useCore()
const boardTimeConfigurationPinia = useBoardTimeConfiguration()
const { item, date } = defineProps({
  item: {
    type: Object,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})
const radioStyle = reactive({
  display: 'flex',
  width: '100%',
  height: '30px',
  lineHeight: '30px'
})
const { loadingUrl } = storeToRefs(corePinia)
const { timeConfigurationList } = storeToRefs(boardTimeConfigurationPinia)

const timeConfigId = ref()
onMounted(() => {
  boardTimeConfigurationPinia.getTimeConfigurationsByBoardId(
    item.boardId,
    item.id,
    date,
    0
  )
})
</script>

<template>
  <a-card
    class="item-card w-full"
    :body-style="{
      padding: '24px'
    }"
  >
    <span class="time-label"> E'lonni kanalda turish muddati </span>
    <h1 class="time-value">
      {{ formatTime(item.liveTime, 'hh') }} soat,
      {{ formatTime(item.liveTime, 'mm') }} daqiqa
    </h1>
    <span class="time-label"> E'lonni pinda turish muddati </span>
    <h1 class="time-value">
      {{ formatTime(item.pinTime, 'hh') }} soat,
      {{ formatTime(item.pinTime, 'mm') }} daqiqa
    </h1>
    <span class="time-label"> E'lonni topda turish muddati </span>
    <h1 class="time-value">
      {{ formatTime(item.topTime, 'hh') }} soat,
      {{ formatTime(item.topTime, 'mm') }} daqiqa
    </h1>

    <div class="mt-4">
      <div class="time-label">E'lonni chiqish vaqtlari</div>
      <a-radio-group class="radio-group" v-model:value="timeConfigId">
        <a-radio :style="radioStyle" :value="1" class="radio-item">
          <div class="time-config-item w-full">
            <span class="time-config-date">08:00</span>
            <span class="time-config-amount"> +100 000 <span>so'm</span></span>
          </div>
        </a-radio>
        <a-radio :style="radioStyle" :value="2" class="radio-item">
          <div class="time-config-item w-full">
            <span class="time-config-date">12:00</span>
            <span class="time-config-amount"> +120 000 <span>so'm</span></span>
          </div>
        </a-radio>
        <a-radio :style="radioStyle" :value="3" class="radio-item">
          <div class="time-config-item w-full">
            <span class="time-config-date">15:00</span>
            <span class="time-config-amount"> +60 000 <span>so'm</span></span>
          </div>
        </a-radio>
        <a-radio :style="radioStyle" :value="4" class="radio-item">
          <div class="time-config-item w-full">
            <span class="time-config-date">18:00</span>
            <span class="time-config-amount"> +150 000 <span>so'm</span></span>
          </div>
        </a-radio>
      </a-radio-group>
    </div>
    <h1 class="amount mt-2">
      <span>Jami:</span>{{ formatAmount(item.amount) }}
      <span class="amount-label">so'm</span>
    </h1>
    <div>
      <a-button class="w-full" type="primary"> E'lon berish </a-button>
    </div>
  </a-card>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.item-card {
  position: relative;
  width: 100%;
  margin: 0;
  &:deep(.ant-card-body) {
    &:hover {
      background: $light !important;
    }
  }
  &:deep(.ant-radio) {
    width: 16px;
    height: 16px;
    display: block;
    //display: none;
    .ant-radio-inner {
      width: 16px !important;
      height: 16px;
    }
  }
  .checkbox {
    position: absolute;
    z-index: 9;
    left: 12px;
    top: 10px;
    width: 16px;
    height: 16px;
    border: 1px solid $muted;
    border-radius: 50%;
    color: white;
    font-size: 12px;
  }
  .checked {
    background: $primary;
    border-color: $primary;
  }
  .time-label {
    font-weight: bolder;
    color: $muted;
  }
  .time-value {
    font-weight: bolder;
    color: $body;
  }
  .radio-group {
    width: 100%;

    .time-config-item {
      display: flex;
      justify-content: space-between;
      .time-config-amount {
        width: max-content !important;
      }
    }
    .radio-item {
      &:deep(span:nth-child(2)) {
        width: 100%;
      }
    }
  }
  .amount {
    font-size: 16px;
    font-weight: bolder;
    text-align: right;
    .amount-label {
      font-size: 14px;
      font-weight: bolder;
      color: $muted;
    }
  }
}

.selected-radio {
  border-color: $primary !important;
}
</style>
