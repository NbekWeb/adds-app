<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import useCore from '@/store/core.pinia.js'
import useKioskBoard from '@/store/kiosk-board.pinia.js'

import OrderBoardItemComponent from '@/pages/dashboard/order/kiosk-order/components/order-form/OrderBoardItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'

defineProps({
  selectedBoards: Array
})
const model = defineModel('value')
const corePinia = useCore()
const boardPinia = useKioskBoard()

const { loadingUrl } = storeToRefs(corePinia)
const { kioskBoards } = storeToRefs(boardPinia)

onMounted(() => {
  boardPinia.getAllKioskBoard(0)
})
</script>

<template>
  <scrollbar-component height="calc(100vh - 250px)">
    <template #content>
      <template
        v-if="!kioskBoards?.length && !loadingUrl.has('kiosk-board/all')"
      >
        <a-empty class="empty">
          <template #description>
            {{ $t('NO_DATA') }}
            {{ kioskBoards?.length }}
          </template>
        </a-empty>
      </template>
      <template v-if="kioskBoards?.length">
        <a-radio-group style="width: 100%" v-model:value="model" class="w-full">
          <a-row :gutter="[10, 7]">
            <a-col
              :xs="24"
              :ms="24"
              :md="12"
              :lg="12"
              :xl="8"
              :xxl="8"
              v-for="(item, i) in kioskBoards"
              :key="i"
            >
              <order-board-item-component
                :disabled="selectedBoards.includes(item?.id)"
                :item="item"
                :checked="model?.id === item?.id"
              />
            </a-col>
          </a-row>
        </a-radio-group>
      </template>
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss"></style>
