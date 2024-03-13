<script setup>
import BoardConfigurationForm from '@/pages/dashboard/board/[id]/configurations/components/BoardConfigurationForm.vue'
import BoardTimeConfigurationForm from '@/pages/dashboard/board/[id]/configurations/components/BoardTimeConfigurationForm.vue'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'

const corePinia = useCore()
const { visibleDrower } = storeToRefs(corePinia)
defineProps({
  id: {
    type: [String, Number, null],
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
})
</script>

<template>
  <a-drawer
    :open="visibleDrower.has('configuration/drower')"
    @close="visibleDrower.delete('configuration/drower')"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    :title="
      type === 'configuration'
        ? $t('ADD_NEW_CONFIGURATION')
        : $t('ADD_NEW_TIME_CONFIGURATION')
    "
    style="width: 500px"
    placement="right"
  >
    <template v-if="type === 'configuration'">
      <board-configuration-form :id="id" :location="location" />
    </template>
    <template v-if="type === 'time-configuration'">
      <board-time-configuration-form :id="id" :location="location" />
    </template>
  </a-drawer>
</template>

<style scoped lang="scss">
:global(.ant-drawer-content-wrapper) {
  width: max-content !important;
}
</style>
