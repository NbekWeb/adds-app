<script setup>
import { ref } from 'vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import formatAmount from '../../../../composables/amount.js'

const { item } = defineProps({
  item: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <a-radio :value="item" class="board-item w-full">
    <a-card
      :body-style="{ padding: '12px' }"
      class="board-card"
      :class="{ 'checked-board': selected }"
    >
      <div class="board-info flex justify-between align-center">
        <div class="time-amount flex align-center justify-between pr-2">
          <h1 class="board-time mb-0 ml-2 pr-2">
            {{ item.startTime.slice(0, 5) }}
          </h1>

          <h1 class="board-amount mb-0 ml-2">
            +{{ formatAmount(item.amount) }} <span>UZS</span>
          </h1>
        </div>
        <div class="checkbox" :class="{ checked: selected }">
          <icon-check />
        </div>
      </div>
    </a-card>
  </a-radio>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.board-item {
  &:deep(.ant-radio) {
    display: none;
  }
  &:deep(span:nth-child(2)) {
    width: 100%;
    padding: 0;
  }
  .board-info {
    .time-amount {
      width: 90%;
    }
    .board-time {
      font-size: 18px;
      font-weight: bold;
      border-right: 1px solid $muted;
    }
  }
}
.board-card {
  transition: border 0.3s;
  &:deep(.ant-card-body) {
    transition: background 0.3s;
  }
}
.checked-board {
  border-color: $primary;
  &:deep(.ant-card-body) {
    border-radius: 3px;
    background: rgb($primary, 0.1);
  }
}

.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid $muted;
  font-size: 12px;
  overflow: hidden;
  color: white;
  transition: background 0.3s;
}
.checked {
  background-color: $primary;
}
</style>
