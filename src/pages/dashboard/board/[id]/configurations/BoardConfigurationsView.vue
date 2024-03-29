<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import useCore from '@/store/core.pinia.js'
import useBoardConfiguration from '@/store/board-configuration.pinia.js'
import useBoardTimeConfiguration from '@/store/board-time-configuration.pinia.js'

import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import BoardConfigurationItem from '@/pages/dashboard/board/[id]/configurations/components/BoardConfigurationItemComponent.vue'

const route = useRoute()
const router = useRouter()

const corePinia = useCore()
const boardConfigurationPinia = useBoardConfiguration()
const boardTimeConfigurationPinia = useBoardTimeConfiguration()

const { loadingUrl } = storeToRefs(corePinia)

const boardId = ref(null)
const orderDate = ref(dayjs())

const { page, totalPages, totalElements, boardConfigurationList } = storeToRefs(
  boardConfigurationPinia
)
onMounted(() => {
  if (route.params.id) {
    boardId.value = route.params.id
    boardConfigurationPinia.clearConfigurations()
    boardConfigurationPinia.getConfigurationsByBoardId(boardId.value, 0)
  }
})
const getConfigurations = (page) => {
  boardConfigurationPinia.getConfigurationsByBoardId(props.boardId, page)
}
</script>

<template>
  <page-header-component :title="$t('BoardConfigurationsView')">
    <template #actions>
      <a-date-picker v-model:value="orderDate" />
    </template>
  </page-header-component>

  <scrollbar-component
    class="scrollbar"
    :loading="corePinia.loadingUrl.has('board/all')"
    :count="9"
    height="calc(100vh - 200px )"
    :page="page"
    :total-pages="totalPages"
    :total-count-all="totalElements"
    @get-date="getConfigurations"
  >
    <template #content>
      <template
        v-if="
          !boardConfigurationList?.length &&
          !corePinia.loadingUrl.has('board/id/configurations')
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
          !boardConfigurationList.length &&
          loadingUrl.has('board/id/configurations')
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
      <a-row :gutter="[10, 10]">
        <a-col
          :xs="24"
          :ms="24"
          :md="12"
          :lg="8"
          :xl="8"
          :xxl="6"
          v-for="(item, i) in boardConfigurationList"
          :key="i"
        >
          <board-configuration-item
            class=""
            :item="item"
            :key="item.id"
            :date="orderDate.format('YYYY-MM-DD')"
          />
        </a-col>
      </a-row>
      <a-button class="mt-3" @click="router.back()">
        {{ $t('BACK') }}
      </a-button>
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss">
.configuration-add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
}
</style>
