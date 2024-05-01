<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import useCore from '@/store/core.pinia.js'
import useBoardConfiguration from '@/store/board-configuration.pinia.js'

const corePinia = useCore()
const boardConfigurationPinia = useBoardConfiguration()

const props = defineProps({
  boardId: {
    type: [String, Number, null],
    required: true
  }
})

const { loadingUrl } = storeToRefs(corePinia)
const { page, totalPages, totalElements, boardConfigurationList } = storeToRefs(
  boardConfigurationPinia
)
const getConfigurations = (page) => {
  boardConfigurationPinia.getConfigurationsByBoardId(props.boardId, page)
}
</script>

<template>
  <scrollbar-component
    class="scrollbar"
    :loading="corePinia.loadingUrl.has('board/all')"
    :count="9"
    height="calc(100vh - 288px )"
    :page="page"
    :total-pages="totalPages"
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
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss">
.empty {
  height: 80%;
}
.add-configuration {
  display: flex;
  justify-content: center;
  .configuration-add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
  }
}
</style>
