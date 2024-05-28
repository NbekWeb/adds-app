<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import usePost from '@/store/post.pinia.js'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import PostListComponent from '@/pages/dashboard/post/component/PostListComponent.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const router = useRouter()
const route = useRoute()

const corePinia = useCore()
const postPinia = usePost()

const selectedChannel = computed(() => route.query.channel || 'telegram')

const { loadingUrl } = storeToRefs(corePinia)

const handleChangeType = (val) => {
  router.push({ query: { channel: val } })

  postPinia.clearPost()
  if (val === 'kiosk') {
    postPinia.getAllKioskPosts(0)
  } else {
    postPinia.getAllTelegramPosts(0)
  }
}

const pushToCreate = () => {
  if (route.query.channel === 'kiosk') {
    router.push({
      name: 'KioskPostCreateView'
    })
  } else {
    router.push({
      name: 'TelegramPostCreateView'
    })
  }
}

onMounted(() => {
  if (selectedChannel.value === 'kiosk') {
    postPinia.getAllKioskPosts(0)
  } else {
    postPinia.getAllTelegramPosts(0)
  }
})
</script>

<template>
  <page-header-component :title="$t('DashboardPostListView')">
    <template #actions>
      <div class="flex">
        <a-select
          style="width: 120px"
          :value="selectedChannel"
          @change="handleChangeType"
        >
          <a-select-option value="telegram">Telegram</a-select-option>
          <a-select-option value="kiosk">Kiosk</a-select-option>
        </a-select>
        <a-button
          class="add-btn ml-4"
          type="primary"
          size="middle"
          @click="pushToCreate"
        >
          <icon-plus />
          {{ $t('ADD') }}
        </a-button>
      </div>
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
