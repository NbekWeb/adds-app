<script setup>
import useKioskBoard from "@/store/kiosk-board.pinia.js";

import { formatAmount, formatTextLength } from '@/composables/index.js'
import IconX from '@/components/icons/IconX.vue'
import {onMounted, ref} from "vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconMinus from "@/components/icons/IconMinus.vue";

const kioskBoardStore = useKioskBoard()

const emits = defineEmits(['close'])

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const orderCount = ref(1)
const boardPrice = ref(0)

const handleClickOrderCount = (e) => {
  if (e === '+') {
    orderCount.value++
  } else if (e === '-' && orderCount.value > 1) {
    orderCount.value--
  }

  props.item.orderSeconds = (orderCount.value * props.item.postSeconds)
}

onMounted(() => {
  orderCount.value = Math.floor(props.item.orderSeconds / props.item.postSeconds)

  const boardId = props?.item?.board?.id
  kioskBoardStore.getKioskPrice(boardId, (data) => {
    boardPrice.value = data?.price
  })
})
</script>

<template>
  <a-card class="order-item-card">
    <a-button @click="emits('close')" class="close-btn" type="link">
      <icon-x />
    </a-button>
    <div class="order-item-info">
      <div>
        <div>
          <h1 class="channel-name m-0">
            {{ formatTextLength(item.board?.name, 25) }}
          </h1>
        </div>
        <template v-if="item?.configuration?.name"> </template>
        <h1 class="configuration-name m-0">{{ item?.configuration?.name }}</h1>
      </div>
      <div class="flex justify-between my-2">
        <div class="amount flex align-center justify-between w-full">
          <span> {{ $t('AMOUNT_BY_SECOND') }} </span>
          <p class="m-0 text-end">
            {{ formatAmount(boardPrice) }} <span>so'm</span>
          </p>
        </div>
      </div>

      <div class="flex justify-between align-end">
        <div class="amount">
          <span> {{ $t('TOTAL_AMOUNT') }} </span>
          <p class="m-0">
            {{ formatAmount(boardPrice * item.orderSeconds) }} <span>so'm</span>
          </p>
        </div>

        <div class="amount">
          <span> {{ $t('DURATION') }} </span>
          <p class="m-0">
            {{ item.orderSeconds || 0 }} soniya
          </p>
        </div>

        <div class="amount flex flex-column">
          <span> {{ $t('COUNT_OUTPUTS') }} </span>
          <div class="flex align-center">
            <a-button size="small" @click="handleClickOrderCount('-')">
              <IconMinus />
            </a-button>

            <p class="mx-2">{{ orderCount }} ta</p>

            <a-button size="small" @click="handleClickOrderCount('+')">
              <IconPlus />
            </a-button>
          </div>
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
    top: 0;
    right: -5px;
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
    //font-weight: bolder;
    //color: $muted;
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
  margin: 0;
}
</style>
