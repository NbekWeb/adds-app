<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useBoard from '@/store/boadr.pinia.js'

import BoardListComponent from '@/pages/dashboard/board/components/BoardListComponent.vue'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const router = useRouter()
const route = useRoute()
const corePinia = useCore()
const boardPinia = useBoard()

const { loadingUrl } = storeToRefs(corePinia)
const { categories } = storeToRefs(boardPinia)

const categoryId = computed(() => route.query.category)
const searchName = computed(() => route.query.name)

const category = ref(categoryId.value)
const name = ref(searchName.value)

const timeOut = ref(null)

function handleChangeFilter() {
  router.push({
    query: {
      category: category.value,
      name: name.value
    }
  })
  boardPinia.getAllBoard(0, category.value, name.value)
}

function handleSearch() {
  clearTimeout(timeOut.value)
  timeOut.value = setTimeout(() => {
    handleChangeFilter()
  }, 500)
}

onMounted(() => {
  boardPinia.getAllBoard(0, category.value, name.value)
  boardPinia.getBoardCategories()
})
onBeforeUnmount(() => {
  boardPinia.clearBoardList()
})
</script>

<template>
  <page-header-component :title="$t('DashboardBoardListView')">
    <template #actions>
      <a-row :gutter="10" justify="end">
        <a-col>
          <a-input
            :placeholder="$t('SEARCH')"
            v-model:value="name"
            allow-clear
            @keyup="handleSearch"
          >
            <template #prefix>
              <icon-search />
            </template>
          </a-input>
        </a-col>
        <a-col>
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
            allow-clear
            tree-default-expand-all
            :tree-data-simple-mode="[categories]"
            :tree-data="categories"
            tree-node-filter-prop="label"
            @change="handleChangeFilter"
          >
          </a-tree-select>
        </a-col>
      </a-row>
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
