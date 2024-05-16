<script setup>
import { useRoute, useRouter } from 'vue-router'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import usePost from '@/store/post.pinia.js'
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import useSelectChannel from '@/store/selectChannel.pinia.js'
import PostListComponent from '@/pages/dashboard/post/component/PostListComponent.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const router = useRouter()
const route = useRoute()

const corePinia = useCore()
const postPinia = usePost()
const selectChannelPinia = useSelectChannel()

const { loadingUrl } = storeToRefs(corePinia)
const { selectChannel } = storeToRefs(selectChannelPinia)

watch(selectChannel, (newChannel, oldChannel) => {
  if (newChannel !== oldChannel) {
    postPinia.getAllPosts(0)
  }
})
onMounted(() => {
  postPinia.getAllPosts(0)
})
</script>

<template>
  <page-header-component :title="$t('DashboardPostListView')">
    <template #actions>
      <a-button
        class="add-btn"
        type="primary"
        size="middle"
        @click="router.push({ name: 'DashboardPostCreateFormView' })"
      >
        <icon-plus />
        {{ $t('ADD') }}
      </a-button>
    </template>
  </page-header-component>

  <post-list-component /> 
</template>

<style lang="scss">
@import '@/assets/styles/responsive';
.add-btn {
  display: flex;
  align-items: center;
  gap: 4px;
}
.post-form-drawer {
  .ant-drawer-content-wrapper {
    @include responsive-sm {
      width: 100% !important;
    }
  }
}
</style>
