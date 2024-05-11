<script setup>
import { computed, ref } from 'vue'
import dayjs from 'dayjs'

const emits = defineEmits(['onChange'])

const data = ref([])
const date = ref(dayjs())
const dataList = computed(() => {
  const dateList = []

  if (dayjs(date.value.subtract(3, 'day')).diff(dayjs()) >= 0) {
    for (let i = 0; i < 7; i++) {
      dateList.push(dayjs(dayjs(date.value).subtract(3, 'day')).add(i, 'day'))
    }
  } else {
    for (let i = 0; i < 7; i++) {
      dateList.push(dayjs(dayjs(dayjs())).add(i, 'day'))
    }
  }

  return dateList
})
</script>

<template>
  <template v-if="dataList.length">
    <div class="segmented flex py-1">
      <a-radio-group
        v-model:value="date"
        @change="emits('onChange', date)"
        class="segmented-radio-group"
      >
        <a-row :gutter="10" justify="space-between" class="pl-1 segment-group">
          <a-col v-for="item in dataList" :key="item.label">
            <a-radio :value="item" class="radio m-0">
              <div
                class="segmented-item flex align-center justify-between px-4 py-1"
                :class="{
                  selected:
                    dayjs(date).format('D MMM') === dayjs(item).format('D MMM')
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
      {{ $t('OTHER_DATE') }}
    </span>
    <a-date-picker
      class="order-date"
      v-model:value="date"
      :disabledDate="(currentDate) => dayjs().diff(currentDate, 'day') >= 1"
      :showToday="false"
      format="YYYY.MM.DD"
      :placeholder="$t('OTHER_DATE')"
      @change="emits('onChange', date)"
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
