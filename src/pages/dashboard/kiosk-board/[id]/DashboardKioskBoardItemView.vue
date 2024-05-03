<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import useKioskBoard from '@/store/kiosk-board.pinia.js'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'

import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import MapComponent from '@/pages/dashboard/kiosk-board/components/MapComponent.vue'

const route = useRoute()
const router = useRouter()

const kioskBoardPinia = useKioskBoard()
const corePinia = useCore()

const itemInfo = ref()
// const marker = [['41.311081', '69.240562']]
const marker = ref(null)

const { loadingUrl } = storeToRefs(corePinia)

onMounted(() => {
  if (route.params.id) {
    kioskBoardPinia.getOneKioskBoard(route.params.id, (data) => {
      itemInfo.value = data
      marker.value = [[`${data.latitude}`, `${data.longitude}`]]
    })
  }
})
</script>
<template>
  <a-spin
    :spinning="loadingUrl.has('get/kiosk-board')"
    class="h-full flex align-center justify-center"
  >
    <template #indicator>
      <icon-loader />
    </template>
  </a-spin>

  <scrollbar-component height="calc(100vh - 145px)" v-show="itemInfo">
    <template #content>
      <div class="h-full mr-2">
        <div class="flex justify-between">
          <div>
            <p class="text-muted text-sm">{{ $t('NAME') }}</p>
            <h2 class="text-2xl text-bold">{{ itemInfo?.name }}</h2>
          </div>
          <div class="">
            <a-button type="primary" @click="router.push(``)">
              {{ $t('CREATE_AN_ORDER') }}
            </a-button>
          </div>
        </div>
        <div class="mt-4">
          <div class="">
            <p class="text-muted text-xs">{{ $t('CATEGORY') }}</p>
            <h2 class="text-xl text-bold">{{ itemInfo?.category?.name }}</h2>
          </div>
          <div class="mt-4 mb-5">
            <p class="text-muted text-xs">{{ $t('DESCRIPTION') }}</p>
            <p class="text-xl text-bold">{{ itemInfo?.description }}</p>
          </div>
        </div>
        <MapComponent :markers="marker" class="mx-4"> </MapComponent>
        <div class="mt-4 pb-3">
          <a-button @click="router.back()">{{ $t('BACK') }}</a-button>
        </div>
      </div>
    </template>
  </scrollbar-component>
  <a-empty class="empty" v-show="!itemInfo">
    <template #description>
      {{ $t('NO_DATA') }}
    </template>
  </a-empty>
</template>
<style lang="scss">
/* .flexa {
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
} */
.text-2xl {
  line-height: 100%;
}
.text-xl,
.text-sm,
.text-xs {
  margin-bottom: 0.2rem;
}
</style>
