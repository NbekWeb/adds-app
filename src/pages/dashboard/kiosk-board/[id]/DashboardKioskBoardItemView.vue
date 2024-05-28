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
            <a-empty class="empty" >
              <template #description>
                {{ $t('NO_DATA') }}
                <div class="mt-4 pb-3">
                  <a-button
                    @click="router.push({ name: 'DashboardKioskBoardView' })"
                    >{{ $t('DashboardKioskBoardListView') }} </a-button
                  >
                </div>
              </template>
            </a-empty>
          </template>
          <template v-else>
            <a-row :gutter="[10,20]">
              <a-col :xs="24" :lg="10" :xl="12">
                <a-row :gutter="[10,20]">
                  <a-col span="24">
                    <template v-if="mapName">
                      <p class="text-muted text-xs">{{ $t('LOCATION') }}</p>
                      <p class="text-sm text-bold">{{ mapName }}</p>
                    </template>
                  </a-col>
                  <a-col span="12">
                    <div>
                      <p class="text-muted text-xs">{{ $t('NAME') }}</p>
                      <h2 class="text-lg text-bold">
                        {{ itemInfo?.name }}
                      </h2>
                    </div>
                  </a-col>
                  <a-col span="12">
                    <p class="text-muted text-xs">{{ $t('CATEGORY') }}</p>
                    <h2 class="text-lg text-bold">
                      {{ itemInfo?.category?.name }}
                    </h2>
                  </a-col>
                  <a-col span="24">
                      <p class="text-muted text-xs">{{ $t('DESCRIPTION') }}</p>
                      <p class="text-sm text-bold">{{ itemInfo?.description }}</p>
                  </a-col>
                  <a-col span="24" class="mt-4">
                    <a-button type="primary" @click="router.push(``)">
                      {{ $t('CREATE_AN_ORDER') }}
                    </a-button>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :xs="24" :lg="14" :xl="12">
                <map-component :markers="marker" class="px-4" style="height: calc(100vh - 160px)"/>
              </a-col>
            </a-row>

            <a-spin
              wrapper-class-name="kiosk-board-map-spin"
              class="w-full mx-auto"
              :spinning="loadingUrl.has('kiosk-board/map-info')"
            >
              <template #indicator>
                <icon-loader />
              </template>
            </a-spin>

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
