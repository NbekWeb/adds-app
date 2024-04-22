<script setup>
import MenuMainComponent from '@/pages/dashboard/components/MenuMainComponent.vue'
import UserComponent from '@/pages/dashboard/components/UserComponent.vue'
import MenuFooterComponent from '@/pages/dashboard/components/MenuFooterComponent.vue'
import Logo from '@/components/Logo.vue'
import { ref } from 'vue'
import IconMenu from '@/components/icons/IconMenu.vue'

const open = ref(false)
</script>

<template>
  <a-button @click="open = true" class="btn menu-btn isMobile">
    <IconMenu />
  </a-button>
  <a-drawer
    v-model:open="open"
    root-class-name="isMobile menu-drawer"
    placement="left"
    class="menu-drawer"
    destroy-on-close
    :header-style="{ 'flex-direction': 'row-reverse' }"
  >
    <template #extra>
      <a-row class="py-3" align="middle" justify="center">
        <a-col class="text-center">
          <logo />
        </a-col>
        <a-col>
          <h2 class="m-0 logo-name">
            ADS-<span class="text-primary">PRO</span>
          </h2>
        </a-col>
      </a-row>
    </template>
    <div class="aside">
      <div class="">
        <user-component :avatar="true" class="mb-4" />
        <menu-main-component :collapsed="false" @change="open = false" />
      </div>
      <menu-footer-component :collapsed="false" />
    </div>
  </a-drawer>
</template>

<style lang="scss">
@import '@/assets/styles/variable';
.menu-drawer {
  .logo {
    margin-right: 4px;
    font-size: 36px;
    color: $primary;
  }
  .ant-drawer-header-title {
    justify-content: flex-end !important;
    .anticon-close {
      color: $body;
    }
  }
}
.menu-btn {
  font-size: 20px;
}

.aside {
  height: 100%;
  overflow: auto;
  position: relative;
}
</style>
