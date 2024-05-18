<script setup>
import TelegramOrderComponent from '@/pages/dashboard/order/telegram-order/components/TelegramOrderComponent.vue'
import KioskOrderComponent from '@/pages/dashboard/order/telegram-order/components/KioskOrderComponent.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
</script>
<template>
  <telegram-order-component v-if="route.query.channel == 'telegram'" />
  <kiosk-order-component v-else />
</template>
<style lang=""></style>
