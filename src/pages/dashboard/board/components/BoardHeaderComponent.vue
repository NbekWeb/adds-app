<script setup>
import IconPlus from '@/components/icons/IconPlus.vue'
import { useRouter } from 'vue-router'
import useBoard from '@/store/boadr.pinia.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import useCore from '@/store/core.pinia.js'
const router = useRouter()

const boardPinia = useBoard()
const corePinia = useCore()
const { loadingUrl } = storeToRefs(corePinia)
const { boardStatusAll, boardType, boardStatus, boardCategory, categories } =
  storeToRefs(boardPinia)
const boardTypeList = ref([
  {
    value: 'TELEGRAM',
    label: 'Telegram'
  },
  {
    value: 'INSTAGRAM',
    label: 'Instagram'
  }
])
const handleChangeFilter = () => {
  boardPinia.clearBoardList()
  boardPinia.getAllBoard(0)
}
</script>

<template>
  <div class="page-header">
    <h1 class="title">Kanallar</h1>
    <a-row :gutter="10" justify="end">
      <a-col>
        <a-tree-select
          v-model:value="boardCategory"
          show-search
          class="board-category-filter"
          :loading="loadingUrl.has('board/category/all')"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :placeholder="$t('SELECT_CATEGORY')"
          size="middle"
          allow-clear
          tree-default-expand-all
          :tree-data-simple-mode="{ pId: 'parentId' }"
          :tree-data="categories"
          tree-node-filter-prop="label"
          @change="handleChangeFilter"
        >
        </a-tree-select>
      </a-col>
      <a-col>
        <a-select
          v-model:value="boardType"
          :options="boardTypeList"
          @change="handleChangeFilter"
          allow-clear
          placeholder="Select"
          size="middle"
          class="board-type-filter"
        >
        </a-select>
      </a-col>
      <a-col>
        <a-select
          v-model:value="boardStatus"
          :options="boardStatusAll"
          :loading="loadingUrl.has('board/status/all')"
          @change="handleChangeFilter"
          allow-clear
          placeholder="Select"
          size="middle"
          class="board-type-filter"
        >
        </a-select>
      </a-col>
      <a-col>
        <a-button
          class="btn-add"
          @click="router.push(`/dashboard/board/add`)"
          size="middle"
          type="primary"
        >
          <icon-plus />
          <span>
            {{ $t('ADD') }}
          </span>
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">
.page-header {
  h1 {
    margin: auto 0;
  }
  .board-category-filter {
    min-width: 170px;
  }
  .board-type-filter {
    width: 150px;
  }
}
.btn-add {
  display: flex;
  align-items: center;
}
</style>
