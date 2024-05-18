<script setup>
import OrderItemComponent from '@/pages/dashboard/order/telegram-order/components/order-form/OrderItemComponent.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'

const emits = defineEmits(['addItem', 'close'])
const { items } = defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <scrollbar-component height="calc(100vh - 220px)">
    <template #content>
      <a-row :gutter="[10, 10]">
        <a-col
          :xs="24"
          :ms="24"
          :md="24"
          :lg="12"
          :xl="8"
          :xxl="8"
          v-for="(item, i) in items"
          :key="i"
        >
          <order-item-component :item="item" @close="emits('close', i)" />
        </a-col>
        <a-col :xs="24" :ms="24" :md="24" :lg="12" :xl="8" :xxl="8">
          <a-card class="order-add" @click="emits('addItem')">
            <div class="text-center">
              <icon-plus />
              <p class="m-0">{{ $t('ADD_NEW_ORDER_ITEM') }} sa1</p>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </template>
  </scrollbar-component>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.order-add {
  cursor: pointer;
  font-size: 18px;
  height: 100%;
  min-height: 160px;
  &:hover {
    background-color: rgb($light, 0.5);
  }
  &:deep(.ant-card-body) {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
  }
}
</style>
