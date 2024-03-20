<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useBoardConfiguration from '@/store/board-configuration.pinia.js'
import useBoardTimeConfiguration from '@/store/board-time-configuration.pinia.js'

import IconPlus from '@/components/icons/IconPlus.vue'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import BoardConfigurationsForm from '@/pages/dashboard/board/[id]/configurations/components/BoardConfigurationsDrower.vue'
import BoardConfigurationList from '@/pages/dashboard/board/[id]/configurations/components/BoardConfigurationList.vue'
import BoardTimeConfigurationList from '@/pages/dashboard/board/[id]/configurations/components/BoardTimeConfigurationList.vue'

const route = useRoute()
const router = useRouter()

const corePinia = useCore()
const boardConfigurationPinia = useBoardConfiguration()
const boardTimeConfigurationPinia = useBoardTimeConfiguration()

const { loadingUrl, visibleDrower } = storeToRefs(corePinia)

const role = computed(() => route.params.role)

const boardId = ref(null)
const activeKey = ref('configuration')

const handleVisibleDrover = () => {
  visibleDrower.value.add('configuration/drower')
}

onMounted(() => {
  if (route.params.id) {
    boardId.value = route.params.id
    boardConfigurationPinia.clearConfigurations()
    boardTimeConfigurationPinia.clearTimeConfigurations()
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
      <template v-if="role === 'owner'">
        <a-button
          @click="handleVisibleDrover"
          class="configuration-add-btn"
          type="primary"
          size="middle"
        >
          <icon-plus /> {{ $t('ADD') }}
        </a-button>
      </template>
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
