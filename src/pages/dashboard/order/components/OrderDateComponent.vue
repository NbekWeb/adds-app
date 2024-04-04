<script setup>
import { computed, ref } from 'vue'
import dayjs from 'dayjs'

const model = defineModel('value', {
  default: '',
  type: [String, Number, Object]
})
const emits = defineEmits(['onChange'])
const data = ref([])

const dataList = computed(() => {
  const startDate = ref(dayjs())
  const dateList = []

  if (model.value) {
    if (dayjs(model.value.subtract(3, 'day')).diff(dayjs()) >= 0) {
      for (let i = 0; i < 7; i++) {
        dateList.push(
          dayjs(dayjs(model.value).subtract(3, 'day')).add(i, 'day')
        )
      }
    } else {
      for (let i = 0; i < 7; i++) {
        dateList.push(dayjs(dayjs(startDate.value)).add(i, 'day'))
      }
    }
  }
  return dateList
})
</script>

<template>
  <template v-if="dataList.length">
    <div class="segmented flex py-1">
      <a-radio-group
        v-model:value="model"
        @change="emits('onChange')"
        class="segmented-radio-group"
      >
        <a-row :gutter="10" justify="space-between" class="pl-1 segment-group">
          <a-col v-for="item in dataList" :key="item.label">
            <a-radio :value="item" class="radio m-0">
              <div
                class="segmented-item flex align-center justify-between px-4 py-1"
                :class="{
                  selected:
                    dayjs(model).format('D MMM') === dayjs(item).format('D MMM')
                }"
              >
                <span>
                  {{ dayjs(item).format('D MMM') }}
                </span>
              </div>
            </a-radio>
          </a-col>
        </a-row>
      </a-radio-group>
    </div>
  </template>

  <div class="other-date flex justify-end align-center pl-3">
    <span class="label mr-2">
      {{ model ? $t('OTHER_DATE') : $t('SELECT_DATE') }}
    </span>
    <a-date-picker
      class="order-date"
      v-model:value="model"
      :disabledDate="(date) => dayjs().diff(date, 'day') >= 1"
      :showToday="false"
      format="YYYY.MM.DD"
      :placeholder="model ? $t('OTHER_DATE') : $t('SELECT_DATE')"
      @change="emits('onChange')"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.segmented {
  width: 70%;
  overflow: hidden;
  .segment-group {
    min-width: 730px;
  }
  .segmented-item {
    background-color: $white;
    color: $muted;
    border-radius: 4px;
    box-shadow: 0 1px 5px -1px rgba(0, 0, 0, 0.3);
    transition:
      background-color,
      color 1s;
  }
  .selected {
    background-color: $primary;
    color: $white;
  }
  .radio {
    &:deep(.ant-radio) {
      display: none;
    }
    &:deep(span:nth-child(2)) {
      margin: 0;
      padding: 0;
    }
  }
}
.other-date {
  width: 300px;
}
.label {
  width: auto;
  font-weight: bolder;
  font-size: 14px;
}
.order-date {
  width: 170px;
}
</style>
