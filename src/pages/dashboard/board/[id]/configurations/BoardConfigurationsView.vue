<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import IconPlus from '@/components/icons/IconPlus.vue'
import BoardConfigurationsForm from '@/pages/dashboard/board/[id]/configurations/components/BoardConfigurationsDrower.vue'
import BoardConfigurationList from '@/pages/dashboard/board/[id]/configurations/components/BoardConfigurationList.vue'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'

import useCore from '@/store/core.pinia.js'
import useBoardConfiguration from '@/store/board-configuration.pinia.js'
import BoardTimeConfigurationList from '@/pages/dashboard/board/[id]/configurations/components/BoardTimeConfigurationList.vue'
import useBoardTimeConfiguration from '@/store/board-time-configuration.pinia.js'

const route = useRoute()
const router = useRouter()
const corePinia = useCore()
const boardConfigurationPinia = useBoardConfiguration()
const boardTimeConfigurationPinia = useBoardTimeConfiguration()
const { loadingUrl, visibleDrower } = storeToRefs(corePinia)
const { configPage } = storeToRefs(boardConfigurationPinia)
const { timeConfigPage } = storeToRefs(boardTimeConfigurationPinia)

const boardId = ref(null)
const configType = ref('')
const activeKey = ref('configuration')

const handleVisibleDrover = () => {
  visibleDrower.value.add('configuration/drower')
}

onMounted(() => {
  if (route.params.id) {
    boardId.value = route.params.id
    configPage.value = 0
    timeConfigPage.value = 0
    boardConfigurationPinia.getConfigurationsByBoardId(boardId.value, 0)
    boardTimeConfigurationPinia.getTimeConfigurationsByBoardId(boardId.value, 0)
  }
})
onBeforeUnmount(() => {
  boardConfigurationPinia.clearConfigurations()
})
</script>

<template>
  <page-header-component :title="$t('BoardConfigurationsView')">
    <template #actions>
      <a-button
        @click="handleVisibleDrover"
        class="configuration-add-btn"
        type="primary"
        size="middle"
      >
        <icon-plus /> {{ $t('ADD') }}
      </a-button>
    </template>
  </page-header-component>

  <board-configurations-form
    :id="boardId"
    :type="activeKey"
    :location="'configuration-list'"
  />
  <a-tabs v-model:active-key="activeKey">
    <a-tab-pane key="configuration" :tab="$t('BOARD_CONFIGURATIONS')">
      <board-configuration-list :boardId="boardId" />
    </a-tab-pane>
    <a-tab-pane key="time-configuration" :tab="$t('BOARD_TIME_CONFIGURATIONS')">
      <board-time-configuration-list :boardId="boardId" />
    </a-tab-pane>
  </a-tabs>
  <a-button @click="router.back()">
    {{ $t('BACK') }}
  </a-button>
</template>

<style scoped lang="scss">
.configuration-add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
}
</style>
