<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useBoard from '@/store/boadr.pinia.js'

import BoardListComponent from '@/pages/dashboard/board/components/BoardListComponent.vue'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import BoardPageFilterComponent from '@/pages/dashboard/board/components/BoardPageFilterComponent.vue'

const route = useRoute()
const boardPinia = useBoard()

const categoryId = computed(() => route.query.category)
const searchName = computed(() => route.query.name)

onMounted(() => {
  boardPinia.getAllBoard(0, categoryId.value, searchName.value)
  boardPinia.getBoardCategories()
})
onBeforeUnmount(() => {
  boardPinia.clearBoardList()
})
</script>

<template>
  <page-header-component :title="$t('DashboardBoardListView')">
    <template #actions>
      <div class="isDesktop">
        <board-page-filter-component />
      </div>
    </template>
  </page-header-component>
  <board-list-component />
</template>

<style scoped lang="scss">
.board-category-filter {
  min-width: 200px;
}
.board-type-filter {
  width: 200px;
}
.btn-add {
  display: flex;
  align-items: center;
}
</style>
