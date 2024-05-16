<script setup>
import { storeToRefs } from 'pinia'
import useUser from '@/store/user.pinia.js'
import MobileMenuComponent from '@/pages/dashboard/components/MobileMenuComponent.vue'
import { ref } from 'vue'
import { formatAmount } from '../../../composables/index.js'
import BalanceComponent from '@/pages/dashboard/components/BalanceComponent.vue'
import NotificationMainComponent from '@/pages/dashboard/components/Notification/NotificationMainComponent.vue'

import { useRouter } from 'vue-router'

const userPinia = useUser()

const router = useRouter()
const { user } = storeToRefs(userPinia)

function navigateToClient() {
  window.location.replace('https://admin.adspro.uz')
}
</script>

<template>
  <a-row :gutter="16" justify="space-between" align="middle">
    <a-col>
      <mobile-menu-component />
    </a-col>
    <a-col class="flex align-center">
      <balance-component />
      <notification-main-component class="ml-2" />
    </a-col>
  </a-row>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.header-switch {
  display: flex;
  padding: 0.3rem;
  border-radius: 4px;
  font-size: 25px;
  background-color: #fff;
  width: 100px;
  box-shadow: inset 0 0 10px rgba($muted, 0.1);
  border: 1px solid rgba($muted, 0.2);
  .switch-item {
    border-radius: 4px;
    padding: 0.5rem;
    width: 50%;
    text-align: center;
    cursor: pointer;
    &.active {
      background-color: rgba($primary, 0.1);
    }
  }
}
</style>
