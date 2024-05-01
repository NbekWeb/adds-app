<script setup>
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'

import MapComponent from '@/pages/dashboard/kiosk-board/[id]/components/MapComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import NotFound from '@/pages/_404.vue'
import useKioskBoard from '@/store/kiosk-board.pinia.js'

const corePinia = useCore()
const { loadingUrl } = storeToRefs(corePinia)

const route = useRoute()
const router = useRouter()
const kioskBoardPinia = useKioskBoard()
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
  <a-spin
    wrapper-class-name="board-page-spin"
    :spinning="loadingUrl.has('get/kiosk-board')"
  >
    <template #indicator>
      <icon-loader />
    </template>

    <scrollbar-component height="calc(100vh - 145px)">
      <template #content>
        <a-empty class="empty" v-show="!boardInfo">
          <template #description>
            {{ $t('NO_DATA') }}
          </template>
        </a-empty>
        <div class="h-full mr-2" v-show="boardInfo">
          <div class="flex justify-between">
            <div>
              <p class="text-muted text-sm">{{ $t('NAME') }}</p>
              <h2 class="text-xl text-bold">{{ boardInfo?.name }}</h2>
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
              <h2 class="text-xl text-bold">{{ boardInfo?.category?.name }}</h2>
            </div>
            <div class="mt-4 mb-5">
              <p class="text-muted text-xs">{{ $t('DESCRIPTION') }}</p>
              <h2 class="text-xl text-bold">{{ boardInfo?.description }}</h2>
            </div>
          </div>
          <MapComponent :markers="marker" class="mx-4" />
          <div class="mt-3">
            <a-button @click="router.back()">{{ $t('BACK') }}</a-button>
          </div>
        </div>
      </template>
    </scrollbar-component>
  </a-spin>
</template>
<style scoped lang="scss">
.text-xl,
.text-sm,
.text-xs {
  line-height: 0.6rem;
}
</style>
