<script setup>
import useKioskBoard from '@/store/kiosk-board.pinia.js'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import ScrollbarComponent from '@/components/ScrollbarComponent.vue'

import KioskBoardItemComponent from '@/pages/dashboard/kiosk-board/components/KioskBoardItemComponent.vue'

const corePinia = useCore()
const kioskBoardPinia = useKioskBoard()

const { loadingUrl } = storeToRefs(corePinia)
const { kioskBoards, totalPages } = storeToRefs(kioskBoardPinia)

const page = ref(0)
const getKioskBoardList = (page) => {
  page.value = page
  kioskBoardPinia.getAllKioskBoard(page)
}
</script>
<template>
  <a-spin
    wrapper-class-name="kiosk-board-page-spin"
    :spinning="loadingUrl.has('kiosk-board/all')"
  >
    <template #indicator>
      <icon-loader />
    </template>

    <scrollbar-component
      :count="9"
      :page="page"
      class="kiosk-board-list"
      height="calc(100vh - 196px)"
      :total-pages="totalPages"
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
          <a-row :gutter="[16, 16]">
            <a-col
              :xs="24"
              :sm="12"
              :xl="8"
              :xxl="6"
              v-for="(item, i) of kioskBoards"
              :key="i"
            >
              <kiosk-board-item-component :item="item" />
            </a-col>
          </a-row>
        </template>
      </template>
    </scrollbar-component>
  </a-spin>
</template>

<style></style>
