<script setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import useCore from '@/store/core.pinia.js'
import useAuth from '@/store/auth.pinia.js'
import AuthOptFormComponent from '@/pages/auth/components/AuthOptFormComponent.vue'
import AuthLoginFormComponent from '@/pages/auth/components/AuthLoginFormComponent.vue'
import AuthRegisterFormComponent from '@/pages/auth/components/AuthRegisterFormComponent.vue'

const { t } = useI18n()
const corePinia = useCore()
const authPinia = useAuth()

const { loadingUrl } = storeToRefs(corePinia)
const { otp, isRegistered } = storeToRefs(authPinia)
</script>

<template>
  <template v-if="isRegistered && !otp.otpKey">
    <auth-login-form-component />
  </template>

  <template v-if="!isRegistered && !otp.otpKey">
    <auth-register-form-component />
  </template>

  <template v-if="otp.otpKey">
    <auth-opt-form-component />
  </template>
</template>

<style scoped lang="scss"></style>
