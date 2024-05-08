<script setup>
import { useRoute, useRouter } from 'vue-router'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import useKioskPost from '@/store/kiosk-post.pinia.js'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import KioskPostListComponent from '@/pages/dashboard/kiosk-post/component/KioskPostListComponent.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const router = useRouter()
const route = useRoute()

const corePinia = useCore()
const kioskPostPinia = useKioskPost()

const { loadingUrl } = storeToRefs(corePinia)

onMounted(() => {
  kioskPostPinia.getAllPosts(0)
})
</script>

<template>
  <page-header-component :title="$t('DashboardKioskPostListView')">
    <template #actions>
      <a-button
        class="add-btn"
        type="primary"
        size="middle"
        @click="router.push({ name: 'DashboardKioskPostCreateFormView' })"
      >
        <icon-plus />
        {{ $t('ADD') }}  
      </a-button>
    </template>
  </page-header-component>

  <kiosk-post-list-component />
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
