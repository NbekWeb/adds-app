<script setup>
import BoardConfigurationItem from '@/pages/dashboard/board/[id]/configurations/components/BoardConfigurationItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import { useRouter } from 'vue-router'
import useCore from '@/store/core.pinia.js'
import useBoardConfiguration from '@/store/board-configuration.pinia.js'
import { storeToRefs } from 'pinia'
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

const { loadingUrl } = storeToRefs(corePinia)
const { page, totalPages, totalElements, boardConfigurationList } = storeToRefs(
  boardConfigurationPinia
)
const configId = ref()
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
      <a-radio-group class="w-full" v-model:value="configId">
        <a-row :gutter="[10, 10]">
          <a-col
            :xs="24"
            :ms="24"
            :md="12"
            :lg="8"
            :xl="8"
            :xxl="6"
            v-for="item in boardConfigurationList"
          >
            <!--            <board-configuration-item-->
            <!--              class=""-->
            <!--              :item="item"-->
            <!--              :key="item.id"-->
            <!--              :date=""-->
            <!--            />-->
          </a-col>
        </a-row>
      </a-radio-group>
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
