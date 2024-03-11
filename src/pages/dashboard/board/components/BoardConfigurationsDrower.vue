<script setup>
import useBoard from '@/store/boadr.pinia.js'
import { storeToRefs } from 'pinia'
import BoardConfigurationForm from '@/pages/dashboard/board/components/BoardConfigurationForm.vue'
import BoardTimeConfigurationForm from '@/pages/dashboard/board/components/BoardTimeConfigurationForm.vue'

const boardPinia = useBoard()
const { openDrover, channelName, configurationType } = storeToRefs(boardPinia)
</script>

<template>
  <a-drawer
    v-model:open="openDrover"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    style="color: red"
    :title="channelName"
    placement="right"
  >
    <template v-if="configurationType === 'configuration'">
      <board-configuration-form />
    </template>
    <template v-if="configurationType === 'time-configuration'">
      <board-time-configuration-form />
    </template>
  </a-drawer>
</template>

<style scoped lang="scss"></style>
