<script setup>
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import KioskBoardListComponent from '@/pages/dashboard/kiosk-board/components/KioskBoardListComponent.vue'
import KioskBoardItemComponent from '@/pages/dashboard/kiosk-board/components/KioskBoardItemComponent.vue'
import KioskBoardPageMobileFilterComponent from '@/pages/dashboard/kiosk-board/components/KioskBoardPageMobileFilterComponent.vue'

import useCategories from '@/store/category.pinia.js'
import useKioskBoard from '@/store/kiosk-board.pinia.js'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'

import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const kioskBoardPinia = useKioskBoard()
const corePinia = useCore()
const categoryPinia = useCategories()

const categoryId = computed(() => route.query.category)
const searchName = computed(() => route.query.name)

const open = ref(false)
const category = ref(route.query.category)
const name = ref(route.query.name)
const timeOut = ref()

const { loadingUrl } = storeToRefs(corePinia)
const { categories } = storeToRefs(categoryPinia)

function handleChangeFilter() {
  clearTimeout(timeOut.value)

  router.push({
    query: {
      category: category.value,
      name: name.value
    }
  })
  timeOut.value = setTimeout(() => {
    kioskBoardPinia.getAllKioskBoard(0, categoryId?.value, searchName?.value)
  }, 500)
}



onMounted(() => {
  kioskBoardPinia.getAllKioskBoard(0, categoryId?.value, searchName?.value)
  categoryPinia.getBoardCategories()
})
onBeforeUnmount(() => {
  kioskBoardPinia.clearBoardInfo()
})
</script>

<template>
  <div class="dashboard-kiosk-list-view">
    <page-header-component :title="$t('DashboardKioskBoardListView')">
      <template #actions>
        <kiosk-board-page-mobile-filter-component />

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
              class="kiosk-board-category-filter"
              :loading="loadingUrl.has('kiosk-board/category/all')"
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

    <kiosk-board-list-component />
  </div>
</template>

<style lang="scss" scoped></style>
