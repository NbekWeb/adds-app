<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import usePost from '@/store/post.pinia.js'
import useKioskPost from '@/store/kiosk-post.pinia.js'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import TelegramPostListComponent from '@/pages/dashboard/post/component/TelegramPostListComponent.vue'
import KioskPostListComponent from '@/pages/dashboard/post/component/KioskPostListComponent.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const router = useRouter()
const route = useRoute()

const corePinia = useCore()
const postPinia = usePost()
const kioskPostPinia = useKioskPost()

const selectedChannel = computed(() => route.query.channel || 'telegram')

const { loadingUrl } = storeToRefs(corePinia)

const handleChangeType = (val) => {
  router.push({ query: { channel: val } })

  postPinia.clearPost()
  kioskPostPinia.clearPost()
  if (val === 'kiosk') {
    kioskPostPinia.getAllPosts(0)
  } else {
    postPinia.getAllPosts(0)
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
    kioskPostPinia.getAllPosts(0)
  } else {
    postPinia.getAllPosts(0)
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
          <icon-plus style="font-size: 16px"/>
          {{ $t('ADD_POST') }}
        </a-button>
      </div>
    </template>
  </page-header-component>
  <template v-if="selectedChannel === 'kiosk'">
    <kiosk-post-list-component />
  </template>
  <template v-else>
    <telegram-post-list-component />
  </template>
</template>

<style lang="scss">
@import '@/assets/styles/responsive';
.add-btn {
  display: flex;
  align-items: center;
  gap: 6px;
}
.post-form-drawer {
  .ant-drawer-content-wrapper {
    @include responsive-sm {
      width: 100% !important;
    }
  }
}
</style>
