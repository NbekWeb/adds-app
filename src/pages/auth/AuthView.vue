<script setup>
import { storeToRefs } from 'pinia'
import useAuth from '@/store/auth.pinia.js'

import { useRecaptchaProvider } from 'vue-recaptcha/head'
import AuthFormComponent from '@/pages/auth/components/AuthFormComponent.vue'

const authPinia = useAuth()
const { otp, isRegistered, phoneNumber } = storeToRefs(authPinia)
useRecaptchaProvider()
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
        class="text-center login-page-banner"
      >
        <img class="login-image" src="@/assets/images/login.svg" alt="" />
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="12">
        <a-card>
          <div class="auth-form">
            <div>
              <h1>ADS-<span class="text-primary">PRO</span></h1>
              <p class="text-muted">
                {{ $t('LOGIN_PAGE_DESCRIPTION') }}
                <template v-if="otp.otpKey">
                  <strong> +998{{ phoneNumber }} </strong>
                  {{ $t('AN_SMS_CODE_WAS_SENT_TO_NUMBER') }}
                </template>
                <template v-else>
                  {{
                    isRegistered
                      ? $t('ENTER_YOUR_NUMBER_TO_LOGIN')
                      : $t('REGISTER_TO_USE_THE_SYSTEM')
                  }}
                </template>
              </p>
            </div>
            <auth-form-component />
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';

.login-page {
  display: flex;
  align-items: center;
  padding: 3rem;
  height: 100vh;
  .login-page-banner {
    .login-image {
      width: 100%;
    }
  }
  .auth-form {
    display: block;
    width: 95%;
    max-height: calc(100vh - 110px);
    padding: 0 46px 0 46px;
    margin: 0 auto;
    overflow: auto;
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
}

img {
  height: 90vh;
}
</style>
