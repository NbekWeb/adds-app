<script setup>
import useKioskBoard from '@/store/kiosk-board.pinia.js'
import { storeToRefs } from 'pinia'

// import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
// import IconLoader from '@/components/icons/IconLoader.vue'

import KioskBoardItemComponent from '@/pages/dashboard/kiosk-board/components/KioskBoardItemComponent.vue'

const kioskBoardPinia = useKioskBoard()

const { kioskBoards, page, type } = storeToRefs(kioskBoardPinia)
const getKioskBoardList = (page) => {
  kioskBoardPinia.getAllKioskBoard(page)
}
</script>
<template>
  <div>
    <kiosk-board-item-component v-for="(item, i) of kioskBoards" :key="i" :item="item" />

    <p>data :{{ kioskBoards }}</p>
  </div>
</template>
<style></style>
