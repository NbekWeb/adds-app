<script setup>
import MapComponent from '@/pages/dashboard/kiosk-board/components/MapComponent.vue'
import IconMarkerPin from '@/components/icons/IconMarker.vue'
import IconLoader from '@/components/icons/IconLoader.vue'

import useKioskBoard from '@/store/kiosk-board.pinia.js'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'

import { ref, watch } from 'vue'

const { changeMap } = useKioskBoard()
const corePinia = useCore()
const { loadingUrl } = storeToRefs(corePinia)

const mapName = ref('')
const props = defineProps({
  locMap: {
    type: Array,
    required: true
  }
})
const open = ref(false)

const showDrawer = () => {
  open.value = true
  changeMap(props.locMap[0], props.locMap[1], (data) => {
    mapName.value = data?.display_name
  })
}
</script>

<template>
  <a-button size="small" class="btn" @click="showDrawer">
    <IconMarkerPin />
  </a-button>
  <a-drawer
    v-model:open="open"
    root-class-name="kiosk-location-drawer"
    class="item-location-drawer text-muted"
    title="Kiosk Board Manzili"
    placement="right"
  >
    <MapComponent :markers="[locMap]" class="mx-4 mb-4" />
    <a-spin
      wrapper-class-name="kiosk-board-map-spin"
      class="w-full mx-auto"
      :spinning="loadingUrl.has('kiosk-board/map-info')"
    >
      <template #indicator>
        <icon-loader />
      </template>
    </a-spin>
    <template v-if="mapName" >
      <p class="mx-4">{{ mapName }}</p>
    </template>
  </a-drawer>
</template>

<style lang="scss">
@import '@/assets/styles/responsive';
@import '@/assets/styles/variable';

.kiosk-location-drawer .ant-drawer-content-wrapper {
  width: 70% !important;
  @include responsive-md {
    width: 100% !important;
  }
}
</style>
