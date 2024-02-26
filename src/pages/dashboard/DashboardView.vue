<script setup>

import MenuComponent from "@/pages/dashboard/components/MenuComponent.vue";
import HeaderComponent from "@/pages/dashboard/components/HeaderComponent.vue";
import {ref} from "vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import IconChevronRight from "@/components/icons/IconChevronRight.vue";

const collapse = ref(true)

// user me check token

</script>

<template>
  <a-layout>
    <a-layout-sider :width="250" :collapsed="collapse" theme="light" class="menu">
      <menu-component :collapsed="collapse"/>
      <button @click="collapse = !collapse" type="button" class="btn-toggle">
        <template v-if="collapse">
          <icon-chevron-right/>
        </template>
        <template v-else>
          <icon-chevron-left/>
        </template>
      </button>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <header-component/>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variable";
.header{
  background-color: #ffffff;
  line-height: 18px;
  height: auto;
  padding: 1rem 2rem;
}
.menu{
  border-right: 1px solid rgba($muted,.3);
  position: relative;
}
.content{
  padding: 1rem;
  background-color: rgba($muted,.1);
  height: calc(100vh - 64px);
  overflow: auto;
}
.btn-toggle{
  width: 24px;
  height: 24px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: #ffffff;
  border: none;
  border-top: 1px solid rgba($muted,.3);
  border-right: 1px solid rgba($muted,.3);
  border-bottom: 1px solid rgba($muted,.3);
  position: absolute;
  right: -24px;
  top: 20px;
  cursor: pointer;
  z-index: 99;
  &:hover{
    color: $primary;
  }
}
</style>