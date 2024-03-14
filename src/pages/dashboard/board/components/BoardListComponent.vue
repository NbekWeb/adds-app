<script setup>
import useBoard from '@/store/boadr.pinia.js'
import { storeToRefs } from 'pinia'
import BoardItemComponent from '@/pages/dashboard/board/components/BoardItemComponent.vue'
import useCore from '@/store/core.pinia.js'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import { computed, onMounted, ref, watch } from 'vue'
import BoardConfigurationsForm from '@/pages/dashboard/board/[id]/configurations/components/BoardConfigurationsDrower.vue'

const boardPinia = useBoard()
const corePinia = useCore()
const { collapsed, visibleDrower } = storeToRefs(corePinia)
const { boardList, totalPages, page, totalElements } = storeToRefs(boardPinia)
const boardId = ref(null)
const isOpen = ref(false)
const configType = ref('')
const handleOpenDrower = (id, type) => {
  visibleDrower.value.add('configuration/drower')
  boardId.value = id
  configType.value = type
}
watch(boardList, () => {
  isOpen.value = false
})
const getBoardList = (page) => {
  boardPinia.getAllBoard({ page })
}
</script>

<template>
  <board-configurations-form
    :id="boardId"
    :type="configType"
    :location="'board-list'"
  />
  <scrollbar-component
    :loading="corePinia.loadingUrl.has('board/all')"
    :count="9"
    :page="page"
    height="calc(100vh - 196px)"
    :total-pages="totalPages"
    :total-count-all="totalElements"
    @get-date="getBoardList"
  >
    <template #content>
      <template
        v-if="!boardList?.length && !corePinia.loadingUrl.has('board/all')"
      >
        <a-empty class="empty">
          <template #description>
            {{ $t('NO_DATA') }}
          </template>
        </a-empty>
      </template>
      <template v-if="boardList?.length">
        <a-row :gutter="[10, 10]" class="mx-0">
          <a-col
            :xs="24"
            :sm="24"
            :md="collapsed ? 12 : 24"
            :lg="collapsed ? 8 : 12"
            :xl="collapsed ? 6 : 8"
            :xxl="collapsed ? 4 : 6"
            v-for="item in boardList"
          >
            <board-item-component
              :item="item"
              @addNewConfig="handleOpenDrower"
            />
          </a-col>
        </a-row>
      </template>
      <template v-if="corePinia.loadingUrl.has('board/all')">
        <a-row :gutter="[10, 10]" class="mx-0 mt-2">
          <a-col
            :xs="24"
            :sm="24"
            :md="collapsed ? 12 : 24"
            :lg="collapsed ? 8 : 12"
            :xl="collapsed ? 6 : 8"
            :xxl="collapsed ? 4 : 6"
            v-for="item in 9"
            :key="item"
          >
            <a-card>
              <a-skeleton active avatar :paragraph="{ rows: 4 }" />
            </a-card>
          </a-col>
        </a-row>
      </template>
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss"></style>
