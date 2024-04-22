<script setup>
import Logo from '@/components/Logo.vue'
import UserComponent from '@/pages/dashboard/components/UserComponent.vue'

import MenuMainComponent from '@/pages/dashboard/components/MenuMainComponent.vue'
import MenuFooterComponent from '@/pages/dashboard/components/MenuFooterComponent.vue'

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="aside" :class="[{ collapsed: collapsed }]">
    <div class="px-3">
      <a-row class="py-3" align="middle" justify="center">
        <a-col
          :xs="24"
          :sm="24"
          :md="collapsed ? 24 : 12"
          :lg="collapsed ? 24 : 8"
          :xxl="collapsed ? 24 : 6"
          class="text-center"
        >
          <logo class="desktop-logo" />
        </a-col>
        <template v-if="!collapsed">
          <a-col :xs="24" :sm="24" :md="12" :lg="16" :xxl="16">
            <h2 class="m-0 logo-name">
              ADS-<span class="text-primary">PRO</span>
            </h2>
          </a-col>
        </template>
      </a-row>
      <user-component :avatar="true" class="mb-4" />
      <menu-main-component :collapsed="collapsed" />
    </div>
    <menu-footer-component :collapsed="collapsed" />
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/variable';
.desktop-logo {
  font-size: 36px;
  color: $primary;
}

.logo-name {
  font-weight: 700;
  * {
    font-weight: 700;
  }
}
.aside {
  height: 100%;
  overflow: auto;
  position: relative;
}
.dark {
  background: #001529;
  color: rgba(255, 255, 255, 0.65);
}
</style>
