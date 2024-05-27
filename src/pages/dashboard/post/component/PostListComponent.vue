<script setup>
import {computed, ref} from 'vue'
import { storeToRefs } from 'pinia'
import {useRoute} from "vue-router";

import useCore from '@/store/core.pinia.js'
import usePost from '@/store/post.pinia.js'

import PostItemComponent from '@/pages/dashboard/post/component/PostItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'

const route = useRoute()
const corePinia = useCore()
const postPinia = usePost()

const { collapsed, loadingUrl, visibleDrawer } = storeToRefs(corePinia)
const { posts, page, totalPages } = storeToRefs(postPinia)

const postId = ref(null)
const postType = computed(() => route.query.channel)

function editPost(id) {
  postId.value = id
  corePinia.visibleDrawer.add('post/form/modal')
}
function close() {
  corePinia.visibleDrawer.add('post/form/modal')
  postId.value = null
}

function getPaginationAllPosts(page) {
  if (postType.value === 'telegram') {
    postPinia.getAllTelegramPosts(page)
  } else if (postType.value === 'kiosk') {
    postPinia.getAllKioskPosts(page)
  }
}
</script>

<template>
  <a-spin :spinning="loadingUrl.has('get/post/all')">
    <template #indicator>
      <icon-loader />
    </template>
    <scrollbar-component
      :total-pages="totalPages"
      :page="page"
      :loading="loadingUrl.has('get/order/all')"
      @get-data="getPaginationAllPosts"
      height="calc(100vh - 190px)"
    >
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
              <post-item-component :item="item" @edit="editPost" />
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
