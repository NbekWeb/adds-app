<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import useCore from '@/store/core.pinia.js'
import useBoardTimeConfiguration from '@/store/board-time-configuration.pinia.js'

import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import BoardTimeConfigurationItemComponent from '@/pages/dashboard/board/[id]/configurations/components/BoardTimeConfigurationItemComponent.vue'

const router = useRouter()
const route = useRoute()

const corePinia = useCore()
const boardTimeConfigurationPinia = useBoardTimeConfiguration()

const props = defineProps({
  boardId: {
    type: [String, Number, null],
    required: true
  }
})

const { loadingUrl } = storeToRefs(corePinia)
const { page, totalPages, totalElements, timeConfigurationList } = storeToRefs(
  boardTimeConfigurationPinia
)

// const getTimeConfigurations = (page) => {
//   boardTimeConfigurationPinia.getTimeConfigurationsByBoardId(
//     props.boardId,
//     page
//   )
// }
</script>

<template>
  <!--  <scrollbar-component-->
  <!--    :loading="corePinia.loadingUrl.has('board/all')"-->
  <!--    :count="9"-->
  <!--    height="calc(100vh - 288px)"-->
  <!--    :page="page"-->
  <!--    :total-pages="totalPages"-->
  <!--    :total-count-all="totalElements"-->
  <!--    @get-date="getTimeConfigurations"-->
  <!--  >-->
  <!--    <template #content>-->
  <!--  <template-->
  <!--    v-if="-->
  <!--      !timeConfigurationList?.length &&-->
  <!--      !corePinia.loadingUrl.has('board/id/time-configurations')-->
  <!--    "-->
  <!--  >-->
  <!--    <a-empty class="empty">-->
  <!--      <template #description>-->
  <!--        {{ $t('NO_DATA') }}-->
  <!--      </template>-->
  <!--    </a-empty>-->
  <!--  </template>-->
  <!--  <template-->
  <!--    v-if="-->
  <!--      !timeConfigurationList.length &&-->
  <!--      loadingUrl.has('board/id/time-configurations')-->
  <!--    "-->
  <!--  >-->
  <!--  <a-card-->
  <!--    loading-->
  <!--    class="my-2"-->
  <!--    :body-style="{ padding: '12px', height: '75px' }"-->
  <!--    v-for="i in 6"-->
  <!--    :key="i"-->
  <!--  >-->
  <!--    <div></div>-->
  <!--  </a-card>-->
  <!--  </template>-->
  <!--  <board-time-configuration-item-component-->
  <!--    class="my-2"-->
  <!--    v-for="item in timeConfigurationList"-->
  <!--    :item="item"-->
  <!--    :key="item.id"-->
  <!--  />-->
  <!--    </template>-->
  <!--  </scrollbar-component>-->
</template>

<style scoped lang="scss">
.empty {
  height: 80%;
}
</style>
