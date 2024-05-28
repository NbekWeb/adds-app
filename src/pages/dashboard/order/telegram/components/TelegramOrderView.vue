<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import useCore from '@/store/core.pinia.js'
import useOrder from '@/store/order.pinia.js'

import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import OrderItemFormComponent from '@/pages/dashboard/order/telegram/components/order-form/OrderItemFormComponent.vue'
import OrderItemsListComponent from '@/pages/dashboard/order/telegram/components/order-form/OrderItemsListComponent.vue'

import { formatAmount } from '@/composables/index.js'

const router = useRouter()
const route = useRoute()

const corePinia = useCore()
const orderPinia = useOrder()

const { loadingUrl } = storeToRefs(corePinia)
const form = reactive({
  postId: null,
  items: []
})

const totalPrice = computed(() => {
  return form.items.reduce((total, item) => {
    return (
      total +
      (item.timeConfiguration?.amount ?? 0) +
      (item.configuration?.amount ?? 0)
    )
  }, 0)
})

const newOrderItem = ref(false)

const selectedBoards = computed(() => form.items.map((item) => item.board.id))
function addNewOrderItem(item) {
  form.items.push(item)
  newOrderItem.value = false
}
function closeTelegramOrderItem(index) {
  form.items.splice(index, 1)
}
function newOrderCreate() {
  if (form.items.length) {
    orderPinia.createOrder({
      postId: form.postId,
      items: form.items.map((item) => ({
        boardId: item.board.id,
        timeConfigurationId: item.timeConfiguration.id,
        configurationId: item.configuration.id,
        orderDate: dayjs(item.orderDate).format('YYYY-MM-DD')
      }))
    })
  }
}
onMounted(() => {
  if (route.params.postId) {
    form.postId = route.params.postId
  }
})
</script>

<template>
  <template v-if="!newOrderItem">
    <page-header-component :title="$t('CREATE_AN_ORDER')" />
  </template>

  <template v-if="newOrderItem">
    <order-item-form-component
      :selected-boards="selectedBoards"
      @add-order="addNewOrderItem"
      @cancel="newOrderItem = false"
    />
  </template>
  <template v-else>
    <order-items-list-component
      :items="form.items"
      @add-item="newOrderItem = true"
    />
  </template>
  <template v-if="!newOrderItem">
    <div class="flex justify-between mt-1">
      <a-button @click="router.back()"> {{ $t('CANCEL') }}</a-button>

      <div class="flex align-center h-full">
        <template  v-if="totalPrice !== 0">
          <div class="mr-4">
            {{ $t('TOTAL') }}:<span class="px-1">{{
              formatAmount(totalPrice)
            }}</span>
            {{ $t('SOUM') }}
          </div>
        </template>

        <a-button
          @click="newOrderCreate"
          :disabled="!Boolean(form.items.length)"
          :loading="loadingUrl.has('create/order')"
          type="primary"
        >
          {{ $t('MAKE_ORDER') }}
        </a-button>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss"></style>
