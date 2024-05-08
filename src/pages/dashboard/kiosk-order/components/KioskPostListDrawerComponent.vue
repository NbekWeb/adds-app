<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useKioskPost from '@/store/kiosk-post.pinia.js'

import KioskPostItemComponent from '@/pages/dashboard/kiosk-order/components/KioskPostItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'

const corePinia = useCore()
const postPinia = useKioskPost()

const { collapsed, loadingUrl, visibleDrawer } = storeToRefs(corePinia)
const { posts, totalPages } = storeToRefs(postPinia)

const postId = ref(null)
const pageValue = ref(0)

function handleGetPostPagination(page) {
  postPinia.getAllPosts(page, 4)
  pageValue.value = page
}
onMounted(() => {
  postPinia.getAllPosts(0, 4)
})
</script>

<template>
  <a-spin :spinning="loadingUrl.has('get/kiosk-post/all')">
    <template #indicator>
      <icon-loader />
    </template>
    <scrollbar-component
      height="calc(100vh - 125px)"
      :loading="loadingUrl.has('get/kiosk-post/all')"
      :count="4"
      :total-pages="totalPages"
      :page="pageValue"
      @get-data="handleGetPostPagination"
    >
      <template #content>
        <template v-if="posts.length">
          <a-row :gutter="[10, 10]">
            <a-col
              class="card-item"
              :xs="24"
              :sm="24"
              :md="24"
              :lg="12"
              :xl="12"
              :xxl="8"
              :key="item.id"
              v-for="item in posts"
            >
              <kiosk-post-item-component :item="item" />
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
