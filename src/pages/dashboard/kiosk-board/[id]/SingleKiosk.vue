<script setup>
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'

import MapComponent from '@/pages/dashboard/kiosk-board/[id]/components/MapComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

import useKioskBoard from '@/store/kiosk-board.pinia.js'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const kioskBoardPinia = useKioskBoard()
// const marker = [['41.311081', '69.240562']]
const marker = ref(null)
const boardInfo = ref()

onMounted(() => {
  if (route.params.id) {
    kioskBoardPinia.getOneKioskBoard(route.params.id, (data) => {
      boardInfo.value = data
      marker.value = [[`${data.latitude}`, `${data.longitude}`]]
    })
  }
})
</script>

<template lang="">
  <scrollbar-component height="calc(100vh - 145px)">
    <template #content>
      <div class="h-full mr-2">
        <div class="flex justify-between">
          <div>
            <p class="text-muted text-sm">name</p>
            <h2 class="text-2xl text-bold">{{ boardInfo?.name }}</h2>
          </div>
          <div class="">
            <a-button type="primary" @click="router.push(``)">
              {{ $t('CREATE_AN_ORDER') }}
            </a-button>
          </div>
        </div>
        <div class="mt-4">
          <div class="">
            <p class="text-muted text-xs">Category</p>
            <h2 class="text-xl text-bold">{{ boardInfo?.category?.name }}</h2>
          </div>
          <div class="mt-4 mb-5">
            <p class="text-muted text-xs">{{ $t('DESCRIPTION') }}</p>
            <h2 class="text-xl text-bold">{{ boardInfo?.description }}</h2>
          </div>
        </div>
        <MapComponent :markers="marker"> </MapComponent>
        <div class="mt-3">
          <a-button @click="router.back()">{{ $t('BACK') }}</a-button>
        </div>
      </div>
    </template>
  </scrollbar-component>
</template>
<style scoped lang="scss">
.text-2xl {
  line-height: 100%;
}
.text-xl,
.text-sm ,.text-xs{
  line-height: .8rem;
}
</style>
