<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import useCore from '@/store/core.pinia.js'
import useBoard from '@/store/boadr.pinia.js'

import OrderBoardItemComponent from '@/pages/dashboard/order/telegram/components/order-form/OrderBoardItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'

defineProps({
  selectedBoards: Array
})
const model = defineModel('value')
const corePinia = useCore()
const boardPinia = useBoard()

const { loadingUrl } = storeToRefs(corePinia)
const { boardList } = storeToRefs(boardPinia)

onMounted(() => {
  boardPinia.getAllBoard(0)
})
</script>

<template>
  <scrollbar-component height="calc(100vh - 250px)">
    <template #content>
      <template v-if="!boardList?.length && !loadingUrl.has('board/all')">
        <a-empty class="empty">
          <template #description>
            {{ $t('NO_DATA') }}
          </template>
        </a-empty>
      </template>
      <template v-if="boardList?.length">
        <a-radio-group style="width: 100%" v-model:value="model" class="w-full">
          <a-row :gutter="[10, 7]">
            <a-col
              :xs="24"
              :ms="24"
              :md="12"
              :lg="12"
              :xl="8"
              :xxl="8"
              v-for="(item, index) in boardList"
              :key="index"
            >
              <order-board-item-component
                :disabled="selectedBoards.includes(item?.id)"
                :item="item"
                :checked="model?.id === item?.id"
                :key="index"
              />
            </a-col>
          </a-row>
        </a-radio-group>
      </template>
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss"></style>
