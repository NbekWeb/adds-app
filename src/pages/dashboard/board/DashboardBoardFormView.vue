<script setup>
import { onMounted } from 'vue'
import useBoard from '@/store/boadr.pinia.js'
import BoardFormComponent from '@/pages/dashboard/board/components/BoardFormComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'

const boardPinia = useBoard()

onMounted(() => {
  boardPinia.getBoardCategories()
})
</script>

<template>
  <scrollbar-component height="calc(100vh - 148px)">
    <template #content>
      <board-form-component />
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss"></style>
