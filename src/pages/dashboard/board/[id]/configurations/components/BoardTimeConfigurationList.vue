<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import useCore from '@/store/core.pinia.js'
import useBoardTimeConfiguration from '@/store/board-time-configuration.pinia.js'

import BoardConfigurationItem from '@/pages/dashboard/board/[id]/configurations/components/BoardConfigurationItem.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const router = useRouter()
const corePinia = useCore()
const boardTimeConfigurationPinia = useBoardTimeConfiguration()

const props = defineProps({
  boardId: {
    type: [String, Number, null],
    required: true
  }
})
const emits = defineEmits(['add-config'])

const { loadingUrl } = storeToRefs(corePinia)
const { timeConfigPage, totalPages, totalElements, timeConfigurationList } =
  storeToRefs(boardTimeConfigurationPinia)

const getTimeConfigurations = (page) => {
  boardTimeConfigurationPinia.getTimeConfigurationsByBoardId(
    props.boardId,
    page
  )
}
</script>

<template>
  <scrollbar-component
    :loading="corePinia.loadingUrl.has('board/all')"
    :count="9"
    height="calc(100vh - 288px)"
    :page="timeConfigPage"
    :total-pages="totalPages"
    :total-count-all="totalElements"
    @get-date="getTimeConfigurations"
  >
    <template #content>
      <template
        v-if="
          !timeConfigurationList?.length &&
          !corePinia.loadingUrl.has('board/id/time-configurations')
        "
      >
        <a-empty class="empty">
          <template #description>
            {{ $t('NO_DATA') }}
          </template>
        </a-empty>
      </template>
      <template
        v-if="
          !timeConfigurationList.length &&
          loadingUrl.has('board/id/time-configurations')
        "
      >
        <a-card
          loading
          class="my-2"
          :body-style="{ padding: '12px', height: '75px' }"
          v-for="i in 6"
          :key="i"
        >
          <div></div>
        </a-card>
      </template>
      <board-configuration-item
        class="my-2"
        v-for="item in timeConfigurationList"
        :item="item"
        :key="item.id"
      />
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss">
.empty {
  height: 80%;
}
</style>
