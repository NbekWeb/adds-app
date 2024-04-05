<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { fileBaseUrl } from '@/composables'
import useCore from '@/store/core.pinia.js'
import useUser from '@/store/user.pinia.js'
import IconUser from '@/components/icons/IconUser.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconShoppingCard from '@/components/icons/IconShoppingCard.vue'

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

const router = useRouter()

const corePinia = useCore()
const userPinia = useUser()

const { loadingUrl } = storeToRefs(corePinia)
const { user } = storeToRefs(userPinia)
</script>

<template>
  <div class="board-item-container">
    <a-spin :spinning="loadingUrl.has(`board/delete/${item.id}`)">
      <template #indicator>
        <icon-loader />
      </template>
      <a-card class="board-item" :loading="loading">
        <template #cover>
          <div class="board-cover">
            <div class="cover flex align-center">
              <img
                :src="`${fileBaseUrl}/file/${item?.logoHashId}?type=TELEGRAM`"
                alt=""
              />
            </div>
            <div class="logo">
              <img
                :src="`${fileBaseUrl}/file/${item?.logoHashId}?type=TELEGRAM`"
                alt=""
              />
            </div>
          </div>
        </template>
        <div class="board-main-info mt-4 pt-2">
          <span class="subscriptions flex justify-center align-center">
            <icon-user />
            <span>{{
              item?.channelMembersCount > 1000
                ? `${Math.floor(item?.channelMembersCount / 1000)}k`
                : item?.channelMembersCount
            }}</span>
          </span>
          <h1 class="board-name text-center">{{ item?.name }}</h1>

          <h3 class="category-name text-center">
            {{ item?.category?.name }}
          </h3>
        </div>
        <template #actions>
          <div class="actions flex justify-center">
            <a-space>
              <a-button
                @click="router.push(`board/item/info/${item.id}`)"
                size="middle"
                type="primary"
                class="flex align-center justify-center px-4"
              >
                <icon-eye />
              </a-button>
              <a-button
                @click="router.push(`board/item/configurations/${item.id}`)"
                size="middle"
                type="primary"
                class="flex align-center justify-center px-4"
              >
                <icon-shopping-card />
              </a-button>
            </a-space>
          </div>
        </template>
      </a-card>
    </a-spin>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';

.board-item-container {
  height: 100%;
  :deep(.ant-spin-nested-loading),
  :deep(.ant-spin-container) {
    height: 100%;
  }
}

.board-item {
  height: 100%;
  transition: background-color 0.5s;
  //&:hover {
  //  background-color: $light;
  //}
  //overflow: hidden;
  position: relative;
  &:deep(.ant-card-body) {
    padding-top: 24px;
    //height: calc(100% - 149px);
    border-radius: 3px;
    margin-bottom: 56px;
  }
  &:deep(.ant-card-actions) {
    position: absolute;
    bottom: 0;
    width: 100%;
    border: none;
    background-color: transparent;
  }
  .board-cover {
    position: relative;
    width: 100%;
    height: 150px;

    .cover {
      width: 100%;
      height: 150px;
      border-radius: 3px 3px 0 0;
      overflow: hidden;
    }
    .logo {
      position: absolute;
      top: calc(100% - 50px);
      left: calc(50% - 50px);
      display: block;
      width: 100px;
      height: 100px;
      border: 2px solid $muted;
      border-radius: 50%;
      overflow: hidden;

      img {
        display: block;
        width: 100px;
        height: 100px;
      }
    }
    img {
      width: 100%;
    }
  }

  .subscriptions {
    font-weight: bolder;
    font-size: 16px;
    color: $muted;
    svg {
      margin-bottom: 2px;
    }
  }
  .board-main-info {
    .board-name {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 0;
    }
  }
  .actions {
    button {
      box-shadow: none;
    }
  }

  .category {
    width: 100%;
  }
  .status {
    width: 20%;
    .status-name {
      font-weight: bolder;
    }
  }
  .actions {
    gap: 5px;
    button {
      //width: 50%;
    }
  }
  .category-label,
  .status-label {
    color: $muted;
    font-size: 14px;
  }
  .category-name {
    font-weight: bold;
    color: rgb($body, 0.8);
  }
  .status {
    font-weight: bolder;
  }
}
</style>
