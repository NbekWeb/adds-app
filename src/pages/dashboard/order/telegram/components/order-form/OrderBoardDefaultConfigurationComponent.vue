<script setup>
import IconCheck from '@/components/icons/IconCheck.vue'

const { item } = defineProps({
  selected: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <a-radio
    class="config-item w-full"
    :class="{ selected: selected }"
    value="default"
  >
    <a-card
      class="item-card w-full h-full"
      :body-style="{
        padding: '24px'
      }"
    >
      <div>
        <h1 class="config-name text-center">
          {{ $t('POSTING_AN_AD_WITHOUT_RATE_ON_THE_CHANNEL') }}
        </h1>
        <p class="text-muted text-center">
          {{ $t('POST_A_ONE_TIME_ANNOUNCEMENT_TO_A_CHANNEL') }}
        </p>
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
.config-item {
  width: 100%;
  min-width: 245px;
  height: 100%;
  &:deep(.ant-radio) {
    display: none;
  }
  &:deep(span:nth-child(2)) {
    width: 100%;
    height: 100%;
    padding: 0;
  }
}

.configuration-content {
  width: 200px;
  //height: 270px;
}
.selected {
  .item-card {
    position: relative;
    width: 100%;
    margin: 0;
  }
}
.item-card {
  position: relative;
  width: 100%;
  margin: 0;
  transition: border 0.5s;
  &:deep(.ant-card-body) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 3px;
    transition: background 0.5s;
    &:hover {
      background: $light !important;
    }
  }

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
  //border: 1px solid $muted;

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
