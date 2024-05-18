<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useKioskOrder from '@/store/kiosk-order.pinia.js'

import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import OrderItemFormComponent from '@/pages/dashboard/order/kiosk-order/components/order-form/OrderItemFormComponent.vue'
import KioskOrderItemsListComponent from '@/pages/dashboard/order/kiosk-order/components/order-form/KioskOrderItemsListComponent.vue'
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

const selectedBoards = computed(() => form.items.map((item) => item.board.id))
function addNewOrderItem(item) {
  form.items.push({
    ...item,
    orderSeconds: postSeconds.value,
    postSeconds: postSeconds.value
  })
  newOrderItem.value = false
}
function closeOrderItem(index) {
  form.items.splice(index, 1)
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
      query: { channel: route.query.channel }
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
    <kiosk-order-items-list-component
      :items="form.items"
      @add-item="newOrderItem = true"
      @close="closeOrderItem"
    />
  </template>
  <template v-if="!newOrderItem">
    <div class="flex justify-between">
      <a-button @click="router.back()"> Bekor qilish </a-button>
      <a-button
        @click="newOrderCreate"
        :disabled="!Boolean(form.items.length)"
        :loading="loadingUrl.has('create/kiosk-order')"
        type="primary"
      >
        Xarid qilish
      </a-button>
    </div>
  </template>
</template>

<style scoped lang="scss"></style>
