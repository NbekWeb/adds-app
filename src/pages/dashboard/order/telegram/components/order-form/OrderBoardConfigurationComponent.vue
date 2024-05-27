<script setup>
import { formatAmount } from '@/composables/index.js'

import IconCheck from '@/components/icons/IconCheck.vue'
import BoardConfigurationTimeComponent from '@/components/BoardConfigurationTimeComponent.vue'

const { item } = defineProps({
  item: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <a-radio class="config-item" :class="{ selected: selected }" :value="item">
    <a-card
      class="item-card w-full h-order-card"
      :body-style="{
        padding: '24px'
      }"
    >
      <div class="config-name-price">
        <h1 class="config-name text-center">{{ item.name }}</h1>
        <h1 class="text-center mt-2">
          <span class="config-amount">
            {{ formatAmount(item.amount) }}
            <span class="amount-label">{{ $t('SOUM') }}</span>
          </span>
        </h1>
      </div>
      <div>
        <board-configuration-time-component
          :configuration="item"
          time-type="liveTime"
        />
        <board-configuration-time-component
          :configuration="item"
          time-type="topTime"
          class="my-2"
        />
        <board-configuration-time-component
          :configuration="item"
          time-type="pinTime"
        />
      </div>
      <div class="checkbox" :class="{ checked: selected }">
        <div class="checkbox-circle">
          <icon-check class="mt-1" />
        </div>
      </div>
    </a-card>
  </a-radio>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.item-card .ant-card-body{
  color: red !important;
}
 .config-item {
  width: 100%;
  height: 300px;
  &:deep(.ant-radio) {
    display: none;
  }
  &:deep(span:nth-child(2)) {
    width: 100%;
    padding: 0;
  }
}
.selected {
  .item-card {
    position: relative;
    width: 100%;
    margin: 0;
    height: 300px;
  }
}

.item-card {
  position: relative;
  width: 100%;
  margin: 0;
  transition: border 0.5s;
  &:deep(.ant-card-body) {
    position: relative;
    border-radius: 3px;
    transition: background 0.5s;
    &:hover {
      background: $light !important;
    }
  }

  .config-name-price {
    border-bottom: 1px solid rgb($muted, 0.5);
    margin-bottom: 16px;
    .config-name {
      font-size: 18px;
      font-weight: bold;
      color: $body;
    }
    .config-amount {
      font-size: 24px;
      font-weight: bolder;
      text-align: right;
      .amount-label {
        font-size: 14px;
        font-weight: bolder;
        color: $muted;
      }
    }
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
  .total {
    .total-label {
      color: $muted;
    }
    .total-amount {
      .amount-currency {
        font-size: 12px;
        font-weight: bolder;
        color: $muted;
      }
    }
  }
}

.checkbox {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  transition: opacity 0.3s;
  background-color: rgb($success, 0.05);
  opacity: 0;
  .checkbox-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: rgb($success, 1);
    color: white;
    font-size: 40px;
  }
}
.checked {
  opacity: 1;
}
</style>
