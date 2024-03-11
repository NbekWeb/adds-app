<script setup>
import BoardListComponent from '@/pages/dashboard/board/components/BoardListComponent.vue'
import BoardHeaderComponent from '@/pages/dashboard/board/components/BoardHeaderComponent.vue'
import BoardConfigurationsForm from '@/pages/dashboard/board/components/BoardConfigurationsDrower.vue'
import { onMounted } from 'vue'
import useBoard from '@/store/boadr.pinia.js'

const boardPinia = useBoard()

onMounted(() => {
  boardPinia.getAllBoardStatus()
  boardPinia.getAllBoard(0)
  boardPinia.getBoardCategories()
})
</script>

<template>
  <board-header-component />
  <board-list-component />
  <board-configurations-form />
</template>

<style scoped lang="scss"></style>
