<script setup>
import IconShoppingCard from '@/components/icons/IconShoppingCard.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div class="kioskBoard-item-container">
    <a-card class="kioskBoard-item " :loading="loading">
      <div class="flex justify-between">
        <div>
          <p class="text-muted text-xs">name</p>
          <p class="text-bold text-lg">nomi</p>
        </div>
        <div>
          <p class="text-muted text-xs">Kategoriyasi</p>
          <p class="text-bold text-lg">nomi</p>
        </div>
        <div class="">
          <p class="text-muted text-xs">Manzili</p>
          <p class="text-bold text-lg">nomi</p>
        </div>
        <div class="flex align-center ">
          <a-button
            @click="router.push(`board/item/configurations/${item.id}`)"
            size="middle"
            type="primary"
            class="flex align-center justify-center px-4"
          >
            <icon-shopping-card />
          </a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>
<style lang="scss">
.kiosk {
  border: 1px solid red;
}

.kioskBoard-item-container{
.ant-card-body{
  padding: 16px !important;
}}
</style>
