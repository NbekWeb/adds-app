<script setup>
import PostItemComponent from '@/pages/dashboard/post/components/PostItemComponent.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import useCore from '@/store/core.pinia.js'
import usePost from '@/store/post.pinia.js'
import { storeToRefs } from 'pinia'

const corePinia = useCore()
const postPinia = usePost()

const { collapsed, loadingUrl } = storeToRefs(corePinia)
const { posts } = storeToRefs(postPinia)
</script>

<template>
  <scrollbar-component height="calc(100vh - 190px)">
    <template #content>
      <template v-if="loadingUrl.has('get/post/all')">
        <a-row :gutter="[10, 10]">
          <a-col
            :xs="24"
            :sm="24"
            :md="collapsed ? 12 : 24"
            :lg="collapsed ? 8 : 12"
            :xl="collapsed ? 6 : 8"
            :xxl="collapsed ? 4 : 6"
            v-for="i in 9"
            :key="i"
          >
            <a-card loading>kbkjbk</a-card>
          </a-col>
        </a-row>
      </template>
      <template v-else>
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
            <post-item-component :item="item" />
          </a-col>
        </a-row>
      </template>
    </template>
  </scrollbar-component>
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
