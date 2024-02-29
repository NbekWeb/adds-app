<script setup>
import { storeToRefs } from 'pinia'
import useAuth from '@/store/auth.pinia.js'
import OtpFormComponent from '@/pages/login/components/OtpForm/OtpFormComponent.vue'
import PhoneNumberFormComponent from '@/pages/login/components/PhonNumberForm/PhoneNumberFormComponent.vue'

const authPinia = useAuth()
const { loading, otp } = storeToRefs(authPinia)
</script>

<template>
  <div class="login-page">
    <a-row class="h-100" :gutter="16" align="middle">
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="12"
        :xl="12"
        :xxl="14"
        class="text-center"
      >
        <img src="@/assets/images/login.svg" alt="" />
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="10">
        <a-spin :spinning="loading">
          <a-card class="py-5">
            <a-row justify="center">
              <a-col :xs="24" :sm="24" :md="20" :lg="16">
                <h1>ADS-<span class="text-primary">PRO</span></h1>
                <p class="text-muted">
                  Biznes uchun reklamalarni joylashtirish, boshqarish uchun
                  platforma. Tizimga kirish uchun raqamingizni kiriting
                </p>
              </a-col>
              <a-col :xs="24" :sm="24" :md="20" :lg="16">
                <phone-number-form-component />
                <template v-if="otp.otpKey">
                  <otp-form-component />
                </template>
              </a-col>
            </a-row>
          </a-card>
        </a-spin>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  padding: 3rem;
  height: 100vh;
  //overflow: hidden;
}
.h-100 {
  height: 100%;
}
.py-5 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
img {
  height: 90vh;
}
</style>
