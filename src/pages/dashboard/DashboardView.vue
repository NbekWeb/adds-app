<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import MenuComponent from '@/pages/dashboard/components/MenuComponent.vue'
import HeaderComponent from '@/pages/dashboard/components/HeaderComponent.vue'
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'

import useUser from '@/store/user.pinia.js'
import { useRoute } from 'vue-router'
import IconLoader from '@/components/icons/IconLoader.vue'
import useCore from '@/store/core.pinia.js'
const userPinia = useUser()
const { loadingUser } = storeToRefs(userPinia)

const collapse = ref(false)

// user me check token
onMounted(() => {
  userPinia.getUserMe()
})
</script>

<template>
  <a-spin v-if="loadingUser" class="spin" size="large">
    <template #indicator> <icon-loader style="font-size: 50px" /> </template>
  </a-spin>

  <template v-else>
    <a-layout>
      <a-layout-sider
        :width="250"
        :collapsed="collapse"
        theme="light"
        class="menu"
      >
        <menu-component :collapsed="collapse" />
        <button @click="collapse = !collapse" type="button" class="btn-toggle">
          <template v-if="collapse">
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
          <a-card>
            <router-view />
          </a-card>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </template>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
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
}
.content {
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    width: 10px;
    background: $white;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgb($info, 1);
    border-radius: 4px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: $primary;
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
:deep(.ant-card-body) {
  min-height: calc(100vh - 114px);
}
</style>
