<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import useCore from '@/store/core.pinia.js'
import IconFilterFunnel from '@/components/icons/IconFilterFunnel.vue'
import useOrder from '@/store/order.pinia.js'

const router = useRouter()
const route = useRoute()

const emits = defineEmits(['openPost'])

const corePinia = useCore()
const orderPinia = useOrder()

const { loadingUrl } = storeToRefs(corePinia)
const open = ref(false)
const props = defineProps({
  statuses: {
    type: Array,
    required: true
  },
  selectChannel: {
    type: String,
    required: true
  },
  orderStatus: {
    type: null,
    required: true
  }
})

const selectedChannel = ref(props.selectChannel)
const orderStatus = ref(props.orderStatus)

watch(
  () => props.selectChannel,
  (newVal) => {
    selectedChannel.value = newVal
  }
)

watch(
  () => props.orderStatus,
  (newVal) => {
    orderStatus.value = newVal
  }
)

function handleOpenPost() {
  open.value = false
  emits('openPost')
}

function handleFilterInMobile() {
  router.push({
    query: {
      channel: selectedChannel.value,
      select: orderStatus.value
    }
  })
  if (selectedChannel.value == 'telegram') {
    orderPinia.getAllTelegramOrders(0, orderStatus.value)
  } else {
    orderPinia.getAllKioskOrders(0, orderStatus.value)
  }

  open.value = false
}
</script>

<template>
  <div class="isMobile">
    <a-button class="btn" @click="open = true">
      <template #icon>
        <IconFilterFunnel />
      </template>
    </a-button>
  </div>
  <a-drawer
    root-class-name="isMobile"
    height="250"
    v-model:open="open"
    placement="bottom"
  >
    <a-row :gutter="[10, 10]" justify="end">
      <a-col :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
        <a-select v-model:value="selectedChannel">
          <a-select-option value="telegram">Telegram</a-select-option>
          <a-select-option value="kiosk">Kiosk</a-select-option>
        </a-select>
      </a-col>
      <a-col :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
        <a-select
          class="order-status"
          allow-clear
          :placeholder="$t('FILTER_BY_STATUS')"
          v-model:value="orderStatus"
        >
          <!-- @change="handleSelect" -->
          <a-select-option
            v-for="status in props.statuses"
            :value="status"
            :key="status"
          >
            {{ $t(status) }}
          </a-select-option>
        </a-select>
      </a-col>
      <div class="w-full flex justify-between align-center">
        <a-button class="btn" type="primary" @click="handleOpenPost">
          <template #icon>
            <IconPlus />
          </template>
          <span>{{ $t('CREATE_AN_ORDER') }} </span>
        </a-button>
        <a-button type="primary" @click="handleFilterInMobile">
          <!-- @click="handleFilterInMobile" -->
          {{ $t('READY') }}
        </a-button>
      </div>
    </a-row>
  </a-drawer>
</template>

<style scoped lang="scss">
.board-category-filter {
  min-width: 200px;
}
.board-type-filter {
  width: 200px;
}
</style>
