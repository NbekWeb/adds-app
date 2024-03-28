<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useBoard from '@/store/boadr.pinia.js'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import BoardConfigurationsForm from '@/pages/dashboard/board/[id]/configurations/components/BoardConfigurationsDrowerComponent.vue'
import BoardItemComponent from '@/pages/dashboard/board/components/BoardItemComponent.vue'

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

const getBoardList = (page) => {
  boardPinia.getAllBoard({ page })
}

watch(boardList, () => {
  isOpen.value = false
})
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
    @get-data="getBoardList"
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
        <a-row :gutter="[10, 5]" class="mx-0">
          <a-col :span="24" v-for="item in boardList">
            <!--            :xs="24"-->
            <!--            :sm="24"-->
            <!--            :md="collapsed ? 12 : 24"-->
            <!--            :lg="collapsed ? 8 : 12"-->
            <!--            :xl="collapsed ? 6 : 8"-->
            <!--            :xxl="collapsed ? 4 : 6"-->

            <board-item-component
              :item="item"
              @addNewConfig="handleOpenDrower"
            />
          </a-col>
        </a-row>
      </template>
      <template v-if="corePinia.loadingUrl.has('board/all')">
        <a-row :gutter="[10, 10]" class="mx-0 mt-2">
          <a-col :span="24" v-for="item in 3" :key="item">
            <a-card class="loading-card" size="small">
              <a-row class="flex align-center w-full" align="center">
                <a-col :span="1">
                  <a-skeleton-avatar active size="large" shape="circle" />
                </a-col>
                <a-col :span="23">
                  <a-skeleton-input
                    style="width: 100%"
                    active
                    size="small"
                    block
                  />
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
      </template>
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss">
.loading-card {
  &:deep(.ant-card-body) {
    display: flex;
    align-items: center;
    height: 70px;
  }
}
</style>
