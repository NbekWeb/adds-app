<script setup>
import BoardConfigurationItem from '@/pages/dashboard/board/[id]/configurations/components/BoardConfigurationItem.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import { useRouter } from 'vue-router'
import useCore from '@/store/core.pinia.js'
import useBoardConfiguration from '@/store/board-configuration.pinia.js'
import { storeToRefs } from 'pinia'
import IconPlus from '@/components/icons/IconPlus.vue'
import { ref } from 'vue'

const router = useRouter()
const corePinia = useCore()
const boardConfigurationPinia = useBoardConfiguration()

const props = defineProps({
  boardId: {
    type: [String, Number, null],
    required: true
  }
})
const emits = defineEmits(['add-config'])

const { loadingUrl } = storeToRefs(corePinia)
const { configPage, totalPages, totalElements, boardConfigurationList } =
  storeToRefs(boardConfigurationPinia)
const configType = ref('')

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
    :page="configPage"
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
      <board-configuration-item
        class="my-2"
        v-for="item in boardConfigurationList"
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
