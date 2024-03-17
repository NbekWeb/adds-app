<script setup>
import { useRouter } from 'vue-router'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import usePost from '@/store/post.pinia.js'
import { onMounted } from 'vue'

const router = useRouter()
const postPinia = usePost()

onMounted(() => {
  postPinia.getAllPosts(0)
})
</script>

<template>
  <page-header-component :title="$t('DashboardPostListView')">
    <template #actions>
      <a-button
        type="primary"
        size="middle"
        @click="router.push('/dashboard/post/create')"
      >
        {{ $t('ADD') }}
      </a-button>
    </template>
  </page-header-component>
</template>

<style scoped lang="scss"></style>
