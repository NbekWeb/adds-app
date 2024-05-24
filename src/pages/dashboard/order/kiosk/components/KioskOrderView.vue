<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { formatAmount } from '@/composables/index.js'

import useCore from '@/store/core.pinia.js'
import useKioskOrder from '@/store/kiosk-order.pinia.js'

import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import OrderItemFormComponent from '@/pages/dashboard/order/kiosk/components/order-form/OrderItemFormComponent.vue'

import OrderItemsListComponent from '@/pages/dashboard/order/kiosk/components/order-form/OrderItemsListComponent.vue'
import useKioskPost from '@/store/kiosk-post.pinia.js'

const router = useRouter()
const route = useRoute()

const corePinia = useCore()
const kioskOrderPinia = useKioskOrder()
const kioskPostPinia = useKioskPost()

const { loadingUrl } = storeToRefs(corePinia)
const form = reactive({
  postId: null,
  items: []
})

const newOrderItem = ref(false)
const postSeconds = ref(0)
const totalPrice = computed(() => {
  return form.items.reduce((accumulator, current) => {
    const amountNumber = parseInt(current.orderSeconds * current.boardPrice, 10)
    return accumulator + amountNumber
  }, 0)
})

const selectedBoards = computed(() => form.items.map((item) => item.board.id))
function addNewOrderItem(item) {
  form.items.push({
    ...item,
    orderSeconds: postSeconds.value,
    postSeconds: postSeconds.value,
    boardPrice: null
  })

  newOrderItem.value = false
}
function closeOrderItem(index) {
  // console.log(
  //   form.items.find((item, i) => i === index),
  //   index
  // )
  form.items.splice(index, 1)
  // console.log('removed: ', removed)

  // form.items = [...form.items.slice(0, index), ...form.items.slice(index + 1)]
  // form.items = form.items.filter((_, i) => i !== index)
}
function newOrderCreate() {
  if (form.items.length) {
    kioskOrderPinia.createOrder({
      postId: form.postId,
      items: form.items.map((item) => ({
        boardId: item.board.id,
        orderSeconds: item.orderSeconds
      }))
    })
    router.push({
      name: 'DashboardOrderListView',
      query: { channel: 'kiosk' }
    })
  }
}
onMounted(() => {
  if (route.params.postId) {
    form.postId = route.params.postId

    kioskPostPinia.getPostDetails(form?.postId, (data) => {
      postSeconds.value = data?.amount
    })
  }
})
</script>

<template>
  <template v-if="!newOrderItem">
    <page-header-component title="E'lon berish " />
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
      @close="closeOrderItem"
    />
  </template>
  <template v-if="!newOrderItem">
    <div class="flex justify-between mt-3">
      <a-button @click="router.back()"> Bekor qilish </a-button>
      <div class="flex align-center">
        <span class="mr-5" v-if="totalPrice !== 0"
          >Jami:{{ formatAmount(totalPrice) }}
        </span>
        <a-button
          @click="newOrderCreate"
          :disabled="!Boolean(form.items.length)"
          :loading="loadingUrl.has('create/kiosk-order')"
          type="primary"
        >
          Xarid qilish
        </a-button>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss"></style>
