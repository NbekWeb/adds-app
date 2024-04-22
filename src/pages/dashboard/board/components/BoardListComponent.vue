<script setup>
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useBoard from '@/store/boadr.pinia.js'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'

import BoardItemComponent from '@/pages/dashboard/board/components/BoardItemComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'

const boardPinia = useBoard()
const corePinia = useCore()

const { collapsed, loadingUrl } = storeToRefs(corePinia)
const { boardList, totalPages, page, totalElements } = storeToRefs(boardPinia)

const getBoardList = (page) => {
  boardPinia.getAllBoard(page)
}
</script>

<template>
  <a-spin
    wrapper-class-name="board-page-spin"
    :spinning="loadingUrl.has('board/all')"
  >
    <template #indicator>
      <icon-loader />
    </template>
    <scrollbar-component
      :loading="loadingUrl.has('board/all')"
      :count="9"
      :page="page"
      class="board-list"
      height="calc(100vh - 196px)"
      :total-pages="totalPages"
      :total-count-all="totalElements"
      @get-data="getBoardList"
    >
      <template #content>
        <template
          v-if="!boardList?.length && !corePinia.loadingUrl.has('board/all')"
        >
          <a-empty class="empty">
            <template #description>
              {{ $t('NO_DATA') }}
            </template>
          </a-empty>
        </template>
        <template v-if="boardList?.length">
          <a-row :gutter="[10, 10]" class="mx-0">
            <a-col
              :xs="24"
              :sm="24"
              :md="collapsed ? 12 : 24"
              :lg="collapsed ? 8 : 12"
              :xl="collapsed ? 6 : 8"
              :xxl="collapsed ? 4 : 6"
              v-for="item in boardList"
            >
              <board-item-component :item="item" />
            </a-col>
          </a-row>
        </template>
      </template>
    </scrollbar-component>
  </a-spin>
</template>

<style lang="scss">
@import '@/assets/styles/responsive';
.loading-card {
  &:deep(.ant-card-body) {
    display: flex;
    align-items: center;
    height: 70px;
  }
}
.board-page-spin {
  height: 96% !important;
  .ant-spin-container {
    height: 100% !important;
  }
}
.board-list {
  @include responsive-md {
    height: 100% !important;
  }
}
</style>
