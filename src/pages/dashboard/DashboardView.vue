<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useUser from '@/store/user.pinia.js'
import useCore from '@/store/core.pinia.js'
import MenuComponent from '@/pages/dashboard/components/MenuComponent.vue'
import HeaderComponent from '@/pages/dashboard/components/HeaderComponent.vue'
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import { useRouter } from 'vue-router'
import MobileMenuComponent from '@/pages/dashboard/components/MobileMenuComponent.vue'

const router = useRouter()

const userPinia = useUser()
const corePinia = useCore()
const { collapsed, loadingUrl } = storeToRefs(corePinia)


// user me check token
onMounted(() => {
  userPinia.getUserMe()
})
</script>

<template>
  <template v-if="loadingUrl.has('user/me')">
    <a-spin class="spin" size="large">
      <template #indicator> <icon-loader size="large" /> </template>
    </a-spin>
  </template>

  <template v-else>
    <a-layout>
      <a-layout-sider
        :width="250"
        :collapsed="collapsed"
        theme="light"
        class="menu isDesktop"
      >
        <menu-component :collapsed="collapsed" />
        <button @click="corePinia.collapse()" type="button" class="btn-toggle">
          <template v-if="collapsed">
            <icon-chevron-right />
          </template>
          <template v-else>
            <icon-chevron-left />
          </template>
        </button>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header">
          <header-component />
        </a-layout-header>
        <a-layout-content class="content">
          <a-card class="view-card">
            <div class="view">
              <router-view />
            </div>
          </a-card>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </template>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
@import '@/assets/styles/responsive';
:global(.grecaptcha-badge) {
  visibility: hidden;
  pointer-events: none;
}
.spin {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header {
  background-color: $white;
  line-height: 18px;
  height: auto;
  padding: 1rem 2rem;
  @include responsive-md {
    padding: 1rem 12px;
  }
}
.menu {
  border-right: 1px solid rgba($muted, 0.3);
  position: relative;
}
.content {
  padding: 1rem;
  background-color: rgba($muted, 0.1);
  height: calc(100vh - 80px);
  overflow: auto;

  @include responsive-md {
    padding: 1rem 0 0 0;
  }
}
.view-card {
  &:deep(.ant-card-body) {
    @include responsive-md {
      padding: 12px !important;
    }
  }
}
.btn-toggle {
  width: 24px;
  height: 24px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: #ffffff;
  border: none;
  border-top: 1px solid rgba($muted, 0.3);
  border-right: 1px solid rgba($muted, 0.3);
  border-bottom: 1px solid rgba($muted, 0.3);
  position: absolute;
  right: -24px;
  top: 20px;
  cursor: pointer;
  z-index: 99;
  &:hover {
    color: $primary;
  }
}
.view {
  width: 100%;
  height: calc(100vh - 162px);
  @include responsive-md {
    height: calc(100vh - 122px);
  }
}
</style>
