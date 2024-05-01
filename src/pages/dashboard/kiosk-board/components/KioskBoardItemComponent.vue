<script setup>
import IconShoppingCard from '@/components/icons/IconShoppingCard.vue'
import { useRouter } from 'vue-router'

const router=useRouter()

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
  <div class="kioskBoard-item-container mb-2">
    <a-card class="kioskBoard-item text-xs" :loading="loading">
      <a-row class="flex justify-between">
        <a-col :lg="4" class="">
          <p class="text-bold mb-1"> {{  item?.name }} </p>
          <p class="text-muted ">{{ $t('NAME') }}</p>
        </a-col>
        <a-col :lg="4">
          <p class="text-bold mb-1">{{  item?.category?.name }}</p>
          <p class="text-muted">{{ $t('CATEGORY') }}  </p>
        </a-col>
        <a-col :lg="4" class="">
          <p class="text-bold mb-1">nomi</p>
          <p class="text-muted">Manzili</p>
        </a-col>
        <a-col :lg="2" class="flex align-center">
          <a-button
            @click="router.push(`kiosk-board/item/${item.id}`)"
            size="middle"
            type="primary"
            class="flex align-center justify-center px-4"
          >
            <icon-shopping-card />
          </a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<style lang="scss">
/* .text-muted, .text-bold,.text-xs{
  border: 1px solid red;
} */
/* .text-xs{
  border: 1px solid red;
} */
.kioskBoard-item-container {
  .ant-card-body {
    padding: 16px !important;
  }
}
/* p{
  margin-bottom: 0 !important;
} */
</style>
