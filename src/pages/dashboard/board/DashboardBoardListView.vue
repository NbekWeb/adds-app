<script setup>
import BoardListComponent from '@/pages/dashboard/board/components/BoardListComponent.vue'
import { computed, onMounted, ref, watch } from 'vue'
import useBoard from '@/store/boadr.pinia.js'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const corePinia = useCore()
const boardPinia = useBoard()

const { loadingUrl } = storeToRefs(corePinia)
const { boardStatusAll, categories } = storeToRefs(boardPinia)
const status = ref(null)
const category = ref(null)

const role = computed(() => route.params.role)

watch(role, () => {
  boardPinia.clearBoardList()
  boardPinia.getAllBoard({
    page: 0,
    role: role.value,
    categoryId: category.value,
    status: status.value
  })
})
const handleChangeFilter = () => {
  boardPinia.clearBoardList()
  boardPinia.getAllBoard({
    page: 0,
    role: role.value,
    categoryId: category.value,
    status: status.value
  })
}

onMounted(() => {
  boardPinia.clearBoardList()
  boardPinia.getAllBoard({
    page: 0,
    role: role.value,
    categoryId: category.value,
    status: status.value
  })
  boardPinia.getAllBoardStatus()
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
            show-search
            class="board-category-filter"
            :loading="loadingUrl.has('board/category/all')"
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
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

        <a-col>
          <a-select
            v-model:value="status"
            :options="boardStatusAll"
            :loading="loadingUrl.has('board/status/all')"
            @change="handleChangeFilter"
            allow-clear
            :placeholder="$t('SELECT_STATUS')"
            size="middle"
            class="board-type-filter"
          >
          </a-select>
        </a-col>
        <!--        <template v-if="role === 'owner'">-->
        <a-col>
          <a-button
            class="btn-add"
            @click="router.push(`/dashboard/${role}/board/add`)"
            size="middle"
            type="primary"
          >
            <icon-plus />
            <span>
              {{ $t('ADD') }}
            </span>
          </a-button>
        </a-col>
        <!--        </template>-->
      </a-row>
    </template>
  </page-header-component>
  <board-list-component />
</template>

<style scoped lang="scss">
.board-category-filter {
  min-width: 170px;
}
.board-type-filter {
  width: 150px;
}
.btn-add {
  display: flex;
  align-items: center;
}
</style>
