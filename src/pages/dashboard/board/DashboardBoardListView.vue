<script setup>
import BoardListComponent from '@/pages/dashboard/board/components/BoardListComponent.vue'
import { onMounted, ref } from 'vue'
import useBoard from '@/store/boadr.pinia.js'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const corePinia = useCore()
const boardPinia = useBoard()

const { loadingUrl } = storeToRefs(corePinia)
const { categories } = storeToRefs(boardPinia)
const status = ref(null)
const category = ref(null)

const handleChangeFilter = () => {
  boardPinia.clearBoardList()
  boardPinia.getAllBoard({
    page: 0,
    categoryId: category.value,
    status: status.value
  })
}

onMounted(() => {
  boardPinia.clearBoardList()
  boardPinia.getAllBoard(0, category.value)
  boardPinia.getBoardCategories()
})
</script>

<template>
  <page-header-component :title="$t('DashboardBoardListView')">
    <template #actions>
      <a-row :gutter="10" justify="end">
        <a-col>
          <a-tree-select
            v-model:value="category"
            class="board-category-filter"
            :loading="loadingUrl.has('board/category/all')"
            style="width: 100%"
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
