<script setup>
import useBoard from '@/store/boadr.pinia.js'
import { storeToRefs } from 'pinia'
import BoardItemComponent from '@/pages/dashboard/board/components/BoardItemComponent.vue'
import useCore from '@/store/core.pinia.js'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import { computed, onMounted } from 'vue'

const boardPinia = useBoard()
const corePinia = useCore()
const { collapsed } = storeToRefs(corePinia)
const { boardList, totalPages, page, totalElements } = storeToRefs(boardPinia)

// const loadingElementCount = computed(() =>
//   totalElements.value
//     ? totalElements.value - boardList.value.length >= 9
//       ? 9
//       : totalElements.value - boardList.value.length
//     : 9
// )
const getBoardList = (page) => {
  boardPinia.getAllBoard(page)
}
</script>

<template>
  <scrollbar-component
    :loading="corePinia.loadingUrl.has('board/all')"
    :count="9"
    :page="page"
    :total-pages="totalPages"
    :total-count-all="totalElements"
    @get-date="getBoardList"
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
      <template v-if="corePinia.loadingUrl.has('board/all')">
        <a-row :gutter="[10, 10]" class="mx-0 mt-2">
          <a-col
            :xs="24"
            :sm="24"
            :md="collapsed ? 12 : 24"
            :lg="collapsed ? 8 : 12"
            :xl="collapsed ? 6 : 8"
            :xxl="collapsed ? 4 : 6"
            v-for="item in 9"
            :key="item"
          >
            <a-card>
              <a-skeleton active avatar :paragraph="{ rows: 4 }" />
            </a-card>
          </a-col>
        </a-row>
      </template>
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss"></style>
