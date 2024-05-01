<script setup>
import useKioskBoard from '@/store/kiosk-board.pinia.js'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'

import ScrollbarComponent from '@/components/ScrollbarComponent.vue'

import KioskBoardItemComponent from '@/pages/dashboard/kiosk-board/components/KioskBoardItemComponent.vue'

const corePinia = useCore()
const kioskBoardPinia = useKioskBoard()

const { loadingUrl } = storeToRefs(corePinia)
const { kioskBoards, page, type } = storeToRefs(kioskBoardPinia)
const getKioskBoardList = (page) => {
  kioskBoardPinia.getAllKioskBoard(page)
}
</script>
<template>
  <div>
    <scrollbar-component
      :loading="loadingUrl.has('kiosk-board/all')"
      :count="9"
      :page="page"
      class="board-list"
      height="calc(100vh - 235px)"
      :total-pages="page"
      :total-count-all="page"
      @get-data="getKioskBoardList"
    >
      <template #content>
        <template v-if="!kioskBoards?.length">
         
          <a-empty class="empty">
            <template #description>
              {{ $t('NO_DATA') }}
            </template>
          </a-empty>
        </template>
        <template v-if="kioskBoards?.length">
          <kiosk-board-item-component
            v-for="(item, i) of kioskBoards"
            :key="i"
            :item="item"
            @click="
              $router.push({ path: `/dashboard/kiosk-board/item/${item.id}` })
            "
          />
        </template>
      </template>
    </scrollbar-component>

    <!-- <p v-for="k of kioskBoards" :key="k.id">{{ k }}</p> -->
  </div>
</template>
<style></style>
