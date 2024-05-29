<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import useCore from '@/store/core.pinia.js'
import useBoardConfiguration from '@/store/board-configuration.pinia.js'

import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import BoardConfigurationItem from '@/pages/dashboard/board/[id]/configurations/components/BoardConfigurationItemComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'

const route = useRoute()
const router = useRouter()

const corePinia = useCore()
const boardConfigurationPinia = useBoardConfiguration()

const { loadingUrl } = storeToRefs(corePinia)
const { configurations, page, totalPages, totalElements } = storeToRefs(
  boardConfigurationPinia
)

const boardId = ref(null)
const orderDate = ref(dayjs())

function getAllConfiguration(page) {
  boardConfigurationPinia.getConfigurationsByBoardId(boardId.value, page)
}

onMounted(() => {
  if (route.params.id) {
    boardId.value = route.params.id
    getAllConfiguration(0)
  }
})
onBeforeUnmount(() => {
  boardConfigurationPinia.clearConfigurations()
})
</script>

<template>
  <page-header-component :title="$t('BoardConfigurationsView')" />

  <a-spin :spinning="loadingUrl.has('board/configurations')">
    <template #indicator>
      <icon-loader size="default" />
    </template>
    <scrollbar-component
      class="scrollbar"
      :loading="loadingUrl.has('board/configurations')"
      :count="6"
      height="calc(100vh - 200px )"
      :page="page"
      :total-pages="totalPages"
      @get-date="getAllConfiguration"
    >
      <template #content>
        <div class="h-full flex justify-between flex-column">
          <template
            v-if="
              !configurations.length && !loadingUrl.has('board/configurations')
            "
          >
            <a-empty class="empty">
              <template #description>
                {{ $t('NO_DATA') }}
              </template>
            </a-empty>
          </template>

          <template v-else>
            <a-row :gutter="[10, 10]">
              <a-col
                :xs="24"
                :ms="24"
                :md="12"
                :lg="8"
                :xl="8"
                :xxl="6"
                v-for="(item, i) in configurations"
                :key="i"
              >
                <board-configuration-item
                  :item="item"
                  :key="item.id"
                  :date="orderDate.format('YYYY-MM-DD')"
                />
              </a-col>
            </a-row>
          </template>
          <div>
            <a-button class="mt-3" @click="router.back()">
              {{ $t('BACK') }}
            </a-button>
          </div>
        </div>
      </template>
    </scrollbar-component>
  </a-spin>
</template>

<style scoped lang="scss">
.configuration-add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
}
</style>
