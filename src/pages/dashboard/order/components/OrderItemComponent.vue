<script setup>
import formatAmount from '../../../../composables/amount.js'
import IconX from '@/components/icons/IconX.vue'
import dayjs from 'dayjs'
import { fileBaseUrl, formatTextLength } from '@/composables/index.js'
const emits = defineEmits(['close'])
const { item } = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <a-card class="order-item-card">
    <a-button @click="emits('close')" class="close-btn" type="link">
      <icon-x />
    </a-button>
    <div class="order-item-info">
      <div class="flex align-center">
        <a-avatar
          :src="`${fileBaseUrl}/file/${item.board.logoHashId}`"
          size="large"
          class="avatar"
        />
        <h1 class="channel-name ml-2 m-0">
          {{ formatTextLength(item.board?.name, 25) }}
        </h1>
      </div>
      <span> Ta'rif </span>
      <h1 class="configuration-name">{{ item.configuration?.name }}</h1>

      <div class="flex justify-between">
        <div class="date">
          <span>E'lon chiqish vaqti</span>
          <p class="m-0">
            {{ dayjs(item.orderDate).format('DD.MM.YYYY') }},
            {{ item.timeConfiguration?.startTime.slice(0, 5) }}
          </p>
        </div>
        <div class="amount">
          <span> Narxi </span>
          <p class="m-0">
            {{
              formatAmount(
                item.configuration?.amount + item.timeConfiguration?.amount
              )
            }}
          </p>
        </div>
      </div>
    </div>
  </a-card>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.order-item-card {
  position: relative;
  &:hover {
    background-color: rgb($light, 0.4);
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 0;
    font-size: 20px;
    color: $muted;
    &:hover {
      color: $body;
    }
  }
}
.order-item-info {
  span {
    font-size: 12px;
    font-weight: bolder;
    color: $muted;
  }
}
.channel-name {
  font-size: 18px;
  font-weight: bold;
  color: $body;
}
.configuration-name {
  font-size: 16px;
  font-weight: bold;
  color: $body;
}
.date p {
  font-size: 14px;
  font-weight: bolder;
  color: $body;
}
.amount p {
  font-size: 14px;
  font-weight: bolder;
  color: $body;
}
</style>
