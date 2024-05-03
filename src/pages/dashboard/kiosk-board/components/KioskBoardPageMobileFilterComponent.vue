<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import useCore from '@/store/core.pinia.js'
import useCategories from '@/store/category.pinia.js'
import useKioskBoard from '@/store/kiosk-board.pinia.js'
import IconFilterFunnel from '@/components/icons/IconFilterFunnel.vue'

const router = useRouter()
const route = useRoute()

const corePinia = useCore()
const categoryPinia = useCategories()
const kioskBoardPinia = useKioskBoard()

const { loadingUrl } = storeToRefs(corePinia)
const { categories } = storeToRefs(categoryPinia)

const category = ref(route.query.category)
const name = ref(route.query.name)
const open = ref(false)

function handleChangeFilter() {
  router.push({
    query: {
      category: category.value,
      name: name.value
    }
  })
}

function handleFilterInMobile() {
  router.push({
    query: {
      category: category.value,
      name: name.value
    }
  })
  kioskBoardPinia.getAllKioskBoard(0, category.value, name.value)
  open.value = false
}
</script>

<template>
  <div class="isMobile">
    <a-button class="btn" @click="open = true">
      <template #icon>
        <IconFilterFunnel />
      </template>
    </a-button>
  </div>
  <a-drawer
    root-class-name="isMobile"
    height="250"
    v-model:open="open"
    placement="bottom"
  >
    <a-row :gutter="[10, 10]" justify="end">
      <a-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
        <a-input
          :placeholder="$t('SEARCH')"
          v-model:value="name"
          allow-clear
          @keyup="handleChangeFilter"
        >
          <template #prefix>
            <icon-search />
          </template>
        </a-input>
      </a-col>
      <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
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
          allow-clear
          tree-default-expand-all
          tree-node-filter-prop="label"
          :tree-data="categories"
          @change="handleChangeFilter"
        >
        </a-tree-select>
      </a-col>
      <a-col :span="24" class="isMobile">
        <a-button @click="handleFilterInMobile" type="primary" class="w-full">
          {{ $t('READY') }}
        </a-button>
      </a-col>
    </a-row>
  </a-drawer>
</template>

<style scoped lang="scss">
.kiosk-board-category-filter {
  min-width: 200px;
}
</style>
