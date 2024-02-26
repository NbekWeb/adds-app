<script setup>

import {ref} from "vue";

const model = ref({
  phone_number: ''
})
</script>

<template>
  <div class="login-page">
    <a-row class="h-100" :gutter="16" align="middle">
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="14" class="text-center">
        <img src="@/assets/images/login.svg" alt="">
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="10">
        <a-card class="py-5">
          <a-row justify="center">
            <a-col :xs="24" :sm="24" :md="20" :lg="16">
              <h1>
                ADS-<span class="text-primary">PRO</span>
              </h1>
              <p class="text-muted">
                Biznes uchun reklamalarni joylashtirish, boshqarish uchun platforma. Tizimga kirish uchun raqamingizni kiriting
              </p>
              <a-form
                  name="loginForm"
                  :model="model"
                  layout="vertical"
              >
                <a-form-item
                    name="phone_number"
                    label="Tel. raqam"
                >
                  <a-input v-model:value="model.phone_number" placeholder="###-##-##">
                    <template #addonBefore>
                      +998
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-button block html-type="submit" type="primary">
                    Raqamga sms yuborish
                  </a-button>
                </a-form-item>
              </a-form>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">
  .login-page{
    padding: 3rem;
    height: 100vh;
    overflow: hidden;
  }
  .h-100{
    height: 100%;
  }
  .py-5{
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  img{
    height: 90vh;
  }
</style>