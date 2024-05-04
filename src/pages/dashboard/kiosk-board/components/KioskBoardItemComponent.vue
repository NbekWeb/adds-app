<script setup>
import IconShoppingCard from '@/components/icons/IconShoppingCard.vue'
import IconEye from '@/components/icons/IconEye.vue'
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
    <a-card class="kioskBoard-item" :loading="loading">
      <div class="flex flex-column h-full">
        <div class="flex justify-between align-center mb-2">
          <h1 class="kiosk-board-name mb-0 mr-3 board-name">
            {{ item?.name }}
          </h1>

          <p class="category-name m-0">{{ item?.category?.name }}</p>
        </div>
        <div>
          <p class="description">{{ item?.description }}</p>
        </div>
        <div class="kiosk-icons-wrapper">
          <div class="flex justify-between align-center flex-wrap gx-2">
            <a-space class="ml-auto">
              <kiosk-board-item-location-component
                :locMap="[item?.latitude, item?.longitude]"
              />
              <a-button
                size="small"
                class="flex justify-center align-center kiosk-board-item-btn"
              >
                <IconShoppingCard />
              </a-button>
              <a-button
                @click="router.push(`kiosk-board/item/${item?.id}`)"
                size="small"
                class="flex justify-center align-center board-item-btn"
              >
                <IconEye />
              </a-button>
            </a-space>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>
<style lang="scss">
@import '@/assets/styles/variable';
.kioskBoard-item-container {
  .kioskBoard-item {
    height: 150px;

    &:hover {
      background-color: $lightGray;
    }

    .description {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .kiosk-board-name {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      font-weight: bold;
      line-height: 16px;
    }
    .category-name {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    .kiosk-icons-wrapper {
      display: flex;
      flex-grow: 1;
      align-items: flex-end;
    }
  }
  .ant-card-body {
    padding: 16px !important;
    height: 100%;
  }
}
</style>
