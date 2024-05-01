<script setup>
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import KioskBoardListComponent from '@/pages/dashboard/kiosk-board/components/KioskBoardListComponent.vue'
import KioskBoardItemComponent from '@/pages/dashboard/kiosk-board/components/KioskBoardItemComponent.vue'
import KioskBoardPageFilterComponent from '@/pages/dashboard/kiosk-board/components/KioskBoardPageFilterComponent.vue'

import useCategories from '@/store/category.pinia.js'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useKioskBoard from '@/store/kiosk-board.pinia.js'

const route = useRoute()
const kioskBoardPinia = useKioskBoard()

const categoryPinia = useCategories()

const open = ref(false)

onMounted(() => {
  kioskBoardPinia.getAllKioskBoard(null, route.query.name)
  categoryPinia.getBoardCategories()
})
</script>

<template>
  <div>
    <page-header-component :title="$t('KIOSKBOARD')">
      <template #actions>
        <div class="isDesktop">
          <kiosk-board-page-filter-component />
         
        </div>
        <div class="isMobile">
          <a-button class="btn" @click="open = true">
            <template #icon>
              <IconFilterFunnel />
            </template>
          </a-button>
          <a-drawer
            root-class-name="isMobile"
            height="250"
            v-model:open="open"
            placement="bottom"
          >
            <kiosk-board-page-filter-component is-mobile @change="open = false" />
          </a-drawer>
        </div>
      </template>
    </page-header-component>

    <kiosk-board-list-component />
    <!-- <kiosk-board-item-component :item="item" /> -->
  </div>
</template>

<style scoped lang="scss"></style>
