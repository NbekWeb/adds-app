<script setup>
import { useRoute, useRouter } from 'vue-router'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import usePost from '@/store/post.pinia.js'
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import PostListComponent from '@/pages/dashboard/post/components/PostListComponent.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const router = useRouter()
const route = useRoute()

const corePinia = useCore()
const postPinia = usePost()

const { loadingUrl } = storeToRefs(corePinia)

const role = computed(() => route.params.role)

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
        @click="router.push(`/dashboard/${role}/post/create`)"
      >
        <icon-plus />
        {{ $t('ADD') }}
      </a-button>
    </template>
  </page-header-component>
  <post-list-component />
</template>

<style scoped lang="scss">
.add-btn {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
