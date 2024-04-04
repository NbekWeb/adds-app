<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import usePost from '@/store/post.pinia.js'

import PostItemComponent from '@/pages/dashboard/post/components/PostItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import PostViewComponent from '@/pages/dashboard/post/components/PostViewComponent.vue'

const corePinia = useCore()
const postPinia = usePost()

const { collapsed, loadingUrl, visibleDrawer } = storeToRefs(corePinia)
const { posts } = storeToRefs(postPinia)

const postInfo = ref({})
function handleGetOnePost(id) {
  postInfo.value = {}
  visibleDrawer.value.add('post/get/one')
  postPinia.getOnePostById(id, (data) => {
    postInfo.value = data
  })
}
</script>

<template>
  <post-view-component :post="postInfo" />
  <a-spin :spinning="loadingUrl.has('get/post/all')">
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
              :xl="collapsed ? 6 : 8"
              :xxl="collapsed ? 4 : 6"
              :key="item.id"
              v-for="item in posts"
            >
              <post-item-component :item="item" @get-one="handleGetOnePost" />
            </a-col>
          </a-row>
        </template>
        <template v-if="!posts.length && !loadingUrl.has('get/post/all')">
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
