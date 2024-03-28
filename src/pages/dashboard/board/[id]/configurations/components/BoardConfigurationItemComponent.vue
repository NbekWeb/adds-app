<script setup>
import { storeToRefs } from 'pinia'
import formatAmount from '@/composables/amount.js'
import formatTime from '@/composables/date.js'
import useCore from '@/store/core.pinia.js'
import useBoardConfiguration from '@/store/board-configuration.pinia.js'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconLoader from '@/components/icons/IconLoader.vue'

const corePinia = useCore()
const boardConfigurationPinia = useBoardConfiguration()
defineProps({
  item: {
    type: Object,
    required: true
  }
})
const { loadingUrl } = storeToRefs(corePinia)
</script>

<template>
  <a-card class="item-card" :body-style="{ padding: '12px' }">
    <a-row justify="space-between">
      <a-col class="item-info">
        <span class="item-label">Nomi</span>
        <p class="item-value m-0">Name</p>
      </a-col>
      <a-col class="item-info">
        <span class="item-label">Muddati</span>
        <p class="item-value m-0">
          {{ formatTime(item.liveTime) }}
        </p>
      </a-col>
      <a-col class="item-info">
        <span class="item-label">Topda turish muddati</span>
        <p class="item-value m-0">
          {{ formatTime(item.topTime) }}
        </p>
      </a-col>
      <a-col class="item-info">
        <span class="item-label">Pinda turish muddati</span>
        <p class="item-value m-0">
          {{ formatTime(item.pinTime) }}
        </p>
      </a-col>
      <a-col class="item-info">
        <span class="item-label">Narxi</span>
        <p class="item-value m-0">
          {{ formatAmount(item.amount) }}
        </p>
      </a-col>
      <template v-if="$route.params.role === 'owner'">
        <a-col class="actions">
          <a-button
            type="primary"
            size="middle"
            class="btn-delete"
            :disabled="loadingUrl.has(`board/configuration/delete/${item.id}`)"
            danger
            @click="
              boardConfigurationPinia.deleteConfiguration(item.id, item.boardId)
            "
          >
            <template
              v-if="loadingUrl.has(`board/configuration/delete/${item.id}`)"
            >
              <icon-loader size="small" class="loader" />
            </template>
            <template v-else>
              <icon-trash />
            </template>
          </a-button>
        </a-col>
      </template>
    </a-row>
  </a-card>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.item-card {
  transition: background-color 0.5s;
  &:hover {
    background-color: $light;
  }
}
.item-info {
  width: calc(100% / 6);
}

.item-value {
  font-size: 18px;
  font-weight: bolder;
}
.item-label {
  font-size: 12px;
  color: $muted;
}
.actions {
  display: flex;
  align-items: center;
  .btn-delete {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    .loader {
      border-color: $primary !important;
    }
  }
}
</style>
