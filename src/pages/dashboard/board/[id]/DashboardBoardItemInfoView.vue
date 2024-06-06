<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { fileBaseUrl } from '@/utils/conf.js'
import useCore from '@/store/core.pinia.js'
import useBoard from '@/store/boadr.pinia.js'

import IconUser from '@/components/icons/IconUser.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'

const route = useRoute()
const router = useRouter()

const corePinia = useCore()
const boardPinia = useBoard()

const { loadingUrl } = storeToRefs(corePinia)
const { boardInfo } = storeToRefs(boardPinia)

onMounted(() => {
  if (route.params.id) {
    boardPinia.getOneById(route.params.id)
  }
})
onBeforeUnmount(() => {
  boardPinia.clearBoardInfo()
})
</script>

<template>
  <a-spin :spinning="loadingUrl.has('get/board/one')">
    <template #indicator>
      <icon-loader />
    </template>
    <scrollbar-component height="calc(100vh - 300px)">
      <template #content v-if="boardInfo">
        <div class="flex flex-column justify-between h-full">
          <div>
            <div class="flex justify-between mb-4">
              <div class="board-info flex">
                <div class="logo">
                  <img
                    :src="`${fileBaseUrl}/file/${boardInfo?.logoHashId}`"
                    alt=""
                  />
                </div>
                <div class="py-2">
                  <h1 class="board-name">{{ boardInfo?.name }}</h1>
                  <div class="subscriptions flex justify-start align-center">
                    <icon-user class="icon" />
                    <span>{{
                      boardInfo?.channelInfo.membersCount > 1000
                        ? `${Math.floor(boardInfo?.channelInfo.membersCount / 1000)}k`
                        : boardInfo?.channelInfo.membersCount
                    }}</span>
                  </div>
                  <div class="mt-2">
                    <a
                      class="username"
                      :href="`https://t.me/${boardInfo?.channelInfo.username}`"
                    >
                      @{{ boardInfo?.channelInfo.username }}
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <a-button
                  type="primary"
                  @click="
                    router.push(
                      `/dashboard/board/item/configurations/${boardInfo?.id}`
                    )
                  "
                >
                  {{ $t('CREATE_AN_ORDER') }} 
                </a-button> 
              </div>
            </div>
            <div class="board-sub-info flex justify-start">
              <div class="category">
                <h3 class="category-label">{{ $t('CATEGORY') }}</h3>
                <h3 class="category-value mt-1">
                  {{ boardInfo?.category.name }}
                </h3>
              </div>
            </div>
            <div class="description mt-3">
              <h3 class="description-label">{{ $t('DESCRIPTION') }}</h3>
              <h3 class="description-value mt-1">
                {{ boardInfo?.description }}
              </h3>
            </div>
          </div>
          <div>
            <a-button @click="router.back()">{{ $t('BACK') }} </a-button>
          </div>
        </div>
      </template>
    </scrollbar-component>
  </a-spin>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.board-info {
  gap: 12px;
  .logo {
    width: 120px;
    height: 120px;
    border-radius: 4px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .board-name {
    font-size: 24px;
    font-weight: bold;
  }
  .subscriptions {
    font-size: 18px;
    .icon {
      margin-bottom: 2.5px;
    }
  }
  .username {
    font-weight: bolder;
    color: $muted;
  }
}
.board-sub-info {
  gap: 16px;
  .category {
    .category-label {
      font-size: 16px;
      font-weight: bold;
      color: $muted;
    }
    .category-value {
      font-size: 18px;
      font-weight: bold;
      color: $body;
    }
  }
}
.description {
  .description-label {
    font-size: 16px;
    font-weight: bold;
    color: $muted;
  }
  .description-value {
    font-size: 18px;
    font-weight: bold;
    color: $body;
  }
}
</style>
