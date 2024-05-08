<script setup>
import { ref, onMounted, watch } from 'vue'
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

const mapName = ref()
const itemInfo = ref()
const marker = ref(null)

const { loadingUrl } = storeToRefs(corePinia)

onMounted(() => {
  if (route.params.id) {
    kioskBoardPinia.getOneKioskBoard(route.params.id, (data) => {
      itemInfo.value = data
      marker.value = [[`${data.latitude}`, `${data.longitude}`]]
      kioskBoardPinia.changeMap(data.latitude, data.longitude, (data) => {
        mapName.value = data?.display_name
      })
    })
  }
})
</script>
<template>
  <a-spin :spinning="loadingUrl.has('get/kiosk-board')">
    <template #indicator>
      <icon-loader />
    </template>
    <scrollbar-component height="calc(100vh - 145px)">
      <template #content>
        <div class="h-full mr-2">
          <template v-if="!itemInfo">
            <a-empty class="empty" v-if="!itemInfo">
              <template #description>
                {{ $t('NO_DATA') }}
                <div class="mt-4 pb-3">
                  <a-button
                    @click="router.push({ name: 'DashboardKioskBoardView' })"
                    >{{ $t('DashboardKioskBoardListView') }}</a-button
                  >
                </div>
              </template>
            </a-empty>
          </template>
          <template v-else>
            <div class="flex justify-between">
              <div>
                <p class="text-muted text-sm">{{ $t('NAME') }}</p>
                <h2 class="text-2xl text-bold">
                  {{ itemInfo?.name }}
                </h2>
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
                <h2 class="text-xl text-bold">
                  {{ itemInfo?.category?.name }}
                </h2>
              </div>
              <div class="mt-4 mb-5">
                <p class="text-muted text-xs">{{ $t('DESCRIPTION') }}</p>
                <p class="text-xl text-bold">{{ itemInfo?.description }}</p>
              </div>
            </div>
            <MapComponent :markers="marker" class="px-4"> </MapComponent>
            <a-spin
              wrapper-class-name="kiosk-board-map-spin"
              class="w-full mx-auto"
              :spinning="loadingUrl.has('kiosk-board/map-info')"
            >
              <template #indicator>
                <icon-loader />
              </template>
            </a-spin>
            <template v-if="mapName">
              <p class="px-4 mt-2">{{ mapName }}</p>
            </template>
            <div class="mt-4 pb-3">
              <a-button @click="router.back()">{{ $t('BACK') }}</a-button>
            </div>
          </template>
        </div>
      </template>
    </scrollbar-component>
  </a-spin>
</template>
<style lang="scss" scoped>
.text-2xl {
  line-height: 100%;
}
.text-xl,
.text-sm,
.text-xs {
  margin-bottom: 0.2rem;
}
</style>
