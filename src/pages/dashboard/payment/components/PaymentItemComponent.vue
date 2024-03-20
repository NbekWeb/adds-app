<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import formatAmount from '@/composables/amount.js'
import useCore from '@/store/core.pinia.js'
import IconEye from '@/components/icons/IconEye.vue'

const corePinia = useCore()
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const { loadingUrl } = storeToRefs(corePinia)

const paymentStatus = ref(
  props.item.status === 'PENDING'
    ? '#F6970A'
    : props.item.status === 'SUCCESS'
      ? '#0F8843'
      : '#E53E3E'
)
</script>

<template>
  <a-card class="item-card mb-1" :body-style="{ padding: '12px' }">
    <a-row justify="space-between">
      <a-col class="item-info">
        <span class="item-label">Turi</span>
        <p class="item-value m-0">{{ item.type }}</p>
      </a-col>
      <a-col class="item-info">
        <span class="item-label">Holati</span>
        <p class="item-value m-0">
          <a-tag :color="paymentStatus">
            {{ $t(item.status) }}
          </a-tag>
        </p>
      </a-col>

      <a-col class="item-info">
        <span class="item-label">Miqdori</span>
        <p class="item-value m-0">
          {{ formatAmount(item.amount) }}
        </p>
      </a-col>
      <a-col class="actions">
        <a-button type="primary" size="middle" class="btn-delete">
          <icon-eye />
        </a-button>
      </a-col>
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
  width: calc(100% / 4);
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
