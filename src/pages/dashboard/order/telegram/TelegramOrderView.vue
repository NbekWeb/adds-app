<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import useCore from '@/store/core.pinia.js'
import useOrder from '@/store/order.pinia.js'

import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import OrderItemFormComponent from '@/pages/dashboard/order/telegram/components/order-form/OrderItemFormComponent.vue'
import OrderItemsListComponent from '@/pages/dashboard/order/telegram/[id]/components/OrderItemsListComponent.vue'

const router = useRouter()
const route = useRoute()

const corePinia = useCore()
const orderPinia = useOrder()

const { loadingUrl } = storeToRefs(corePinia)
const form = reactive({
  postId: null,
  items: []
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
    orderPinia.createTelegramOrder({
      postId: form.postId,
      items: form.items.map((item) => ({
        boardId: item.board.id,
        timeConfigurationId: item.timeConfiguration.id,
        configurationId:item.configuration.id,
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
    <page-header-component title="E'lon berish" />
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
    <div class="flex justify-between">
      <a-button @click="router.back()"> Bekor qilish </a-button>
      <a-button
        @click="newOrderCreate"
        :disabled="!Boolean(form.items.length)"
        :loading="loadingUrl.has('create/order')"
        type="primary"
      >
        Xarid qilish
      </a-button>
    </div>
  </template>
</template>

<style scoped lang="scss"></style>
