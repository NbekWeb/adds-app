<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import { ref } from 'vue'
import useBoard from '@/store/boadr.pinia.js'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import useCore from '@/store/core.pinia.js'

const emits = defineEmits(['change'])
const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const route = useRoute()

const corePinia = useCore()
const boardPinia = useBoard()

const { loadingUrl } = storeToRefs(corePinia)
const { categories } = storeToRefs(boardPinia)

const timeOut = ref(null)
const category = ref(route.query.category)
const name = ref(route.query.name)

function handleChangeFilter() {
  if (!props.isMobile) {
    router.push({
      query: {
        category: category.value,
        name: name.value
      }
    })
    boardPinia.getAllBoard(0, category.value, name.value)
  }
}
function handleSearch() {
  if (!props.isMobile) {
    clearTimeout(timeOut.value)
    timeOut.value = setTimeout(() => {
      handleChangeFilter()
    }, 500)
  }
}
function handleFilterInMobile() {
  router.push({
    query: {
      category: category.value,
      name: name.value
    }
  })
  boardPinia.getAllBoard(0, category.value, name.value)
  emits('change')
}
</script>

<template>
  <a-row :gutter="[10, 10]" justify="end">
    <a-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
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
    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
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
    <a-col :span="24" class="isMobile">
      <a-button @click="handleFilterInMobile" type="primary" class="w-full">
        {{ $t('READY') }}
      </a-button>
    </a-col>
  </a-row>
</template>

<style scoped lang="scss"></style>
