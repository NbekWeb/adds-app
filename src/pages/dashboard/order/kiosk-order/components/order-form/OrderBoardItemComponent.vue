<script setup>
const { item } = defineProps({
  item: {
    type: Object,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <a-radio :value="item" :disabled="disabled" class="board-item w-full">
    <a-card
      :body-style="{ padding: '12px' }"
      class="board-card"
      :class="[{ 'checked-board': checked }, { disabled }]"
    >
      <div class="board-info flex justify-between align-center">
        <div class="flex align-center">
          <h1 class="board-name mb-0 ml-2">
            {{ item.name }}
          </h1>
        </div>
        <div class="checkbox" :class="{ checked: checked }">
          <span class="radio-icon"> </span>
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
  }
}
.board-card {
  transition: border 0.3s;
  &:deep(.ant-card-body) {
    transition: background 0.3s;
  }
}
.disabled {
  opacity: 0.7;
  filter: grayscale(100%);
  background-color: rgb($muted, 0.3);
}
.checked-board {
  border-color: $primary;

  &:deep(.ant-card-body) {
    border-radius: 3px;
    background: rgb($primary, 0.1);
  }
}
.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.board-name {
  font-size: 18px;
  font-weight: bold;
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
  background-color: $white;
  transition: background 0.3s;
  .radio-icon {
    display: block;
    width: 8px;
    height: 8px;
    background-color: $white;
    border-radius: 50%;
  }
}
.checked {
  background-color: $primary;
}
</style>
