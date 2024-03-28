<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useBoardConfiguration from '@/store/board-configuration.pinia.js'
import useBoardTimeConfiguration from '@/store/board-time-configuration.pinia.js'

import IconPlus from '@/components/icons/IconPlus.vue'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import BoardConfigurationListComponent from '@/pages/dashboard/board/[id]/configurations/components/BoardConfigurationListComponent.vue'
import BoardTimeConfigurationListComponent from '@/pages/dashboard/board/[id]/configurations/components/BoardTimeConfigurationListComponent.vue'
import BoardConfigurationsDrowerComponent from '@/pages/dashboard/board/[id]/configurations/components/BoardConfigurationsDrowerComponent.vue'

const route = useRoute()
const router = useRouter()

const corePinia = useCore()
const boardConfigurationPinia = useBoardConfiguration()
const boardTimeConfigurationPinia = useBoardTimeConfiguration()

const { loadingUrl, visibleDrower } = storeToRefs(corePinia)

const role = computed(() => route.params.role)

const months = ref({
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12'
})

const date = ref(new Date())
const boardId = ref(null)
const activeKey = ref('configuration')
const orderDate = ref(
  `${date.value.getFullYear()}-${date.value.getMonth() < 10 ? `0${date.value.getMonth()}` : date.value.getMonth()}-${date.value.getDay() < 10 ? `0${date.value.getDay()}` : date.value.getDay()}`
)

const handleVisibleDrover = () => {
  visibleDrower.value.add('configuration/drower')
}
watch(role, () => {
  boardTimeConfigurationPinia.clearTimeConfigurations()
  boardTimeConfigurationPinia.getTimeConfigurationsByBoardId(
    boardId.value,
    0,
    role.value
  )
})
onMounted(() => {
  if (route.params.id) {
    boardId.value = route.params.id
    boardConfigurationPinia.clearConfigurations()
    boardTimeConfigurationPinia.clearTimeConfigurations()
    boardConfigurationPinia.getConfigurationsByBoardId(boardId.value, 0)
    boardTimeConfigurationPinia.getTimeConfigurationsByBoardId(
      boardId.value,
      orderDate.value,
      0,
      role.value
    )
  }
})
onBeforeUnmount(() => {
  boardConfigurationPinia.clearConfigurations()
})
</script>

<template>
  <page-header-component :title="$t('BoardConfigurationsView')">
    <template #actions>
      <template v-if="role === 'ads'">
        <!--        <a-date-picker v-model:value="orderDate" format="YYYY-MM-DD" />-->
      </template>
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

  <board-configurations-drower-component
    :id="boardId"
    :type="activeKey"
    :location="'configuration-list'"
  />
  <a-tabs v-model:active-key="activeKey">
    <a-tab-pane key="configuration" :tab="$t('BOARD_CONFIGURATIONS')">
      <board-configuration-list-component :boardId="boardId" />
    </a-tab-pane>
    <a-tab-pane key="time-configuration" :tab="$t('BOARD_TIME_CONFIGURATIONS')">
      <board-time-configuration-list-component :boardId="boardId" />
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
