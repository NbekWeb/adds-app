<script setup>
import { formatAmount, formatTextLength } from '@/composables/index.js'
import dayjs from 'dayjs'
import IconX from '@/components/icons/IconX.vue'
import {onMounted, ref} from "vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconMinus from "@/components/icons/IconMinus.vue";

const emits = defineEmits(['close'])

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const item = props.item

const orderCount = ref(1)

const handleChangeOrderCount = (e) => {
  orderCount.value = e.target.value.replace(/[^0-9]/g, '')
  if (!e.target.value) orderCount.value = 1
  handleClickOrderCount()
}

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
        <div class="date">
          <span>{{ $t('THE_TIME_OF_PUBLICATION') }}</span>
          <p class="m-0">
            {{ dayjs(item.orderDate).format('DD.MM.YYYY') }},
            {{ item.timeConfiguration?.startTime.slice(0, 5) }}
          </p>
        </div>
        <div class="amount">
          <span> {{ $t('DURATION') }} </span>
          <p class="m-0">
            {{ item.orderSeconds }} soniya
          </p>
        </div>
        <div class="amount">
          <span> {{ $t('AMOUNT_BY_SECOND') }} </span>
          <p class="m-0 text-end">
            {{
              formatAmount(item?.timeConfiguration?.amount)
            }}
          </p>
        </div>
      </div>

      <div class="flex justify-between align-end">
        <div class="amount">
          <span> {{ $t('TOTAL_AMOUNT') }} </span>
          <p class="m-0">
            {{ formatAmount(item.orderSeconds * item?.timeConfiguration?.amount) }} sum
          </p>
        </div>

        <div class="flex align-center">
          <a-input-group compact>
            <a-button size="small" danger type="primary" @click="handleClickOrderCount('-')">
              <IconMinus />
            </a-button>
            <a-input
              @change="handleChangeOrderCount"
              size="small"
              v-model:value="orderCount"
              style="width: 50px;
              text-align: center"
              :maxlength="3"
            />
            <a-button size="small" type="primary" @click="handleClickOrderCount('+')">
              <IconPlus />
            </a-button>
          </a-input-group>
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
}
</style>
