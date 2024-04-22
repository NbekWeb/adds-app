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
    <a-row class="h-100" :gutter="16" align="middle" justify="center">
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="12"
        :xl="12"
        :xxl="10"
        class="text-center login-page-banner"
      >
        <img class="login-image" src="@/assets/images/login.svg" alt="" />
      </a-col>
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="13"
        :xxl="10"
        class="login-form"
      >
        <a-card shadow>
          <div class="auth-form">
            <div>
              <h1 class="text-center text-bold">
                ADS-<span class="text-primary text-bold">PRO</span>
              </h1>
              <p class="text-muted text-center mb-0">
                {{ $t('LOGIN_PAGE_DESCRIPTION') }}
              </p>
              <p class="text-muted text-center">
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
@import '@/assets/styles/responsive';

.login-page {
  height: 100vh;
  @include responsive-xl {
    display: block;
    padding: 3rem;
  }
  @include responsive-lg {
    display: block;
    padding: 3rem;
  }
  @include responsive-md {
    padding: 1rem;
  }
  @include responsive-sm {
    display: block;
  }
  @include responsive-xs {
    padding: 0;
  }

  .ant-row {
    height: 100%;
    margin: 0 !important;
    padding: 0 2px 0 2px;
    .login-page-banner {
      @include responsive-xs {
        display: block;
      }
      @include responsive-lg {
        display: none;
      }
      @include responsive-md {
        display: none;
      }
      @include responsive-sm {
        display: none;
      }
      @include responsive-xs {
        display: none;
      }

      .login-image {
        width: 89%;
      }
    }
    .login-form {
      .ant-card {
        @include responsive-xs {
          max-width: 100%;
        }
        @include responsive-sm {
          max-width: 460px;
          margin: 0 auto;
        }
        @include responsive-md {
          max-width: 460px;
        }
        @include responsive-lg {
          max-width: 100%;
        }
        &:deep(.ant-card-body) {
          padding: 12px !important;
        }
      }
    }
  }

  .auth-form {
    display: block;
    width: 100%;
    max-height: calc(100vh - 110px);
    margin: 0 auto;
    overflow: auto;
    padding: 4px;
    @include responsive-lg {
      display: block;
      padding: 0 46px 0 46px;
    }
  }
}
</style>
