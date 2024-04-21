<script setup>
import { useRoute, useRouter } from 'vue-router'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import usePost from '@/store/post.pinia.js'
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import PostListComponent from '@/pages/dashboard/post/components/PostListComponent.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import PostFormDrawerComponent from '@/pages/dashboard/post/components/PostFormDrawerComponent.vue'

const router = useRouter()
const route = useRoute()

const corePinia = useCore()
const postPinia = usePost()

const { loadingUrl, visibleDrawer } = storeToRefs(corePinia)

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
        @click="visibleDrawer.add('post/form/modal')"
      >
        <icon-plus />
        {{ $t('ADD') }}
      </a-button>
    </template>
  </page-header-component>
  <a-drawer
    :title="$t('DashboardPostFormView')"
    width="500"
    destroy-on-close
    :open="visibleDrawer.has('post/form/modal')"
    @close="visibleDrawer.delete('post/form/modal')"
  >
    <post-form-drawer-component />
  </a-drawer>
  <post-list-component />
</template>

<style scoped lang="scss">
.add-btn {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
