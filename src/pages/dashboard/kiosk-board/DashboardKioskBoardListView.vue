<script setup>

import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import KioskBoardListComponent from '@/pages/dashboard/kiosk-board/components/KioskBoardListComponent.vue'
import KioskBoardItemComponent from '@/pages/dashboard/kiosk-board/components/KioskBoardItemComponent.vue'
import BoardPageFilterComponent from '@/pages/dashboard/board/components/BoardPageFilterComponent.vue'
</script>

<template>
  <div>
    <page-header-component title="Kiosk board">
      <template #actions>
        <div class="isDesktop">
          <board-page-filter-component />
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
            <board-page-filter-component is-mobile @change="open = false" />
          </a-drawer>
        </div>
      </template>
    </page-header-component>
    
    <kiosk-board-list-component />
    <kiosk-board-item-component />
  </div>
</template>

<style scoped lang="scss"></style>
