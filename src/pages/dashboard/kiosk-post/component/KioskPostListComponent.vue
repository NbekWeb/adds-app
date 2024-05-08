<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useKioskPost from '@/store/kiosk-post.pinia.js'

import KioskPostItemComponent from '@/pages/dashboard/kiosk-post/component/KioskPostItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'

const corePinia = useCore()
const kioskPostPinia = useKioskPost()

const { collapsed, loadingUrl, visibleDrawer } = storeToRefs(corePinia)
const { posts } = storeToRefs(kioskPostPinia)

const postId = ref(null)

function editPost(id) {
  postId.value = id
  corePinia.visibleDrawer.add('kiosk-post/form/modal')
}
function close() {
  corePinia.visibleDrawer.add('kiosk-post/form/modal')
  postId.value = null
}
</script>

<template>
  <a-spin :spinning="loadingUrl.has('get/kiosk-post/all')">
    <template #indicator>
      <icon-loader />
    </template>
    <scrollbar-component height="calc(100vh - 190px)">
      <template #content>
        <template v-if="posts.length">
          <a-row :gutter="[10, 10]">
            <a-col
              class="card-item"
              :xs="24"
              :sm="24"
              :md="collapsed ? 12 : 24"
              :lg="collapsed ? 8 : 12"
              :xl="8"
              :xxl="6"
              :key="item.id"
              v-for="item in posts"
            >
              <kiosk-post-item-component :item="item" @edit="editPost" />
            </a-col>
          </a-row>
        </template>
        <template v-if="!posts.length && !loadingUrl.has('get/kiosk-post/all')">
          <a-empty class="empty">
            <template #description>
              {{ $t('NO_DATA') }}
            </template>
          </a-empty>
        </template>
      </template>
    </scrollbar-component>
  </a-spin>
</template>

<style scoped lang="scss">
.card-item {
  &:deep(.ant-spin-nested-loading) {
    height: 100%;
    .ant-spin-container {
      height: 100%;
      .ant-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
      }
    }
  }
}
</style>
