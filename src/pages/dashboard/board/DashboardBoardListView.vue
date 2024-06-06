<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useCategories from '@/store/category.pinia.js'
import useBoard from '@/store/boadr.pinia.js'

import BoardListComponent from '@/pages/dashboard/board/components/BoardListComponent.vue'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import BoardPageMobileFilterComponent from '@/pages/dashboard/board/components/BoardPageMobileFilterComponent.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const route = useRoute()
const router = useRouter()

const corePinia = useCore()
const boardPinia = useBoard()
const categoryPinia = useCategories()

const { loadingUrl } = storeToRefs(corePinia)
const { categories } = storeToRefs(categoryPinia)

const timeOut = ref()
const category = ref(route.query.category)
const name = ref(route.query.name)

function handleChangeFilter() {
  clearTimeout(timeOut.value)

  router.push({
    query: {
      category: category.value
      
    }
  })
  timeOut.value = setTimeout(() => {
    boardPinia.getAllBoard(0, category.value, name.value)
  }, 500)
}

onMounted(() => {
  boardPinia.getAllBoard(0, category.value, name.value)
  categoryPinia.getBoardCategories()
})
onBeforeUnmount(() => {
  boardPinia.clearBoardList()
})
</script>

<template>
  <page-header-component :title="$t('DashboardBoardListView')">
    <template #actions>
      <board-page-mobile-filter-component />
      <div class="isDesktop">
        <a-space>
          <a-input
            :placeholder="$t('SEARCH')"
            v-model:value="name"
            allow-clear
            @change="handleChangeFilter"
          >
            <template #prefix>
              <icon-search />
            </template>
          </a-input>
          <a-tree-select
            v-model:value="category"
            class="board-category-filter"
            :loading="loadingUrl.has('board/category/all')"
            :dropdown-style="{
              maxHeight: '500px',
              overflow: 'auto'
            }"
            :placeholder="$t('SELECT_CATEGORY')"
            size="middle"
            style="min-width: 250px"
            allow-clear
            tree-default-expand-all
            tree-node-filter-prop="label"
            :tree-data="categories"
            @change="handleChangeFilter"
          >
          </a-tree-select>
        </a-space>
      </div>
    </template>
  </page-header-component>
  <board-list-component />
</template>

<style scoped lang="scss">
.btn-add {
  display: flex;
  align-items: center;
}
</style>
