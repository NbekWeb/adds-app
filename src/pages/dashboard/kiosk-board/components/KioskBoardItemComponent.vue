<script setup>
import IconShoppingCard from '@/components/icons/IconShoppingCard.vue'
import KioskBoardItemLocationComponent from '@/pages/dashboard/kiosk-board/components/KioskBoardItemLocationComponent.vue'

import useKioskBoard from '@/store/kiosk-board.pinia.js'

import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const mapName = ref('')
const { changeMap } = useKioskBoard()
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
      <div class="flex flex-column justify-between h-full">
        <div class="flex justify-between align-center mb-2">
          <h1 class="kiosk-board-name mb-0">{{ item?.name }}</h1>

          <p class="category-name m-0">{{ item?.category?.name }}</p>
        </div>
        <div>
          <p class="description">{{ item?.description }}</p>
        </div>
        <div class="flex justify-between align-center flex-wrap gx-2 ">
          <a-space class="ml-auto">
            <kiosk-board-item-location-component
              :locMap="[item.latitude, item.longitude]"
            />
            <a-button
              size="small"
              class="flex justify-center align-center kiosk-board-item-btn"
            >
              <IconShoppingCard />
            </a-button>
          </a-space>
        </div>
      </div>
    </a-card>
  </div>
</template>
<style lang="scss">
.kioskBoard-item-container {
  
  .kioskBoard-item:hover {
    background-color: #f0f0f0;
  }
  .ant-card-body {
    padding: 16px !important;
  }
}
</style>
