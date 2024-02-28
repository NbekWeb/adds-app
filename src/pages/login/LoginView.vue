<script setup>
import { reactive, ref, toRaw } from 'vue'
import { Form } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import PhoneNumberInputComponent from '@/pages/login/components/PhoneNumberInputComponent.vue'
import useAuth from '@/store/auth.pinia.js'
import useCore from '@/store/core.pinia.js'
import OtpInputComponent from '@/pages/login/components/OtpInputComponent.vue'

const CorePinia = useCore()
const authPinia = useAuth()
const { loading, otp } = storeToRefs(authPinia)

const useForm = Form.useForm
const model = ref({
  phone_number: null,
  otp: null
})

const rules = reactive({
  phone_number: [
    {
      required: true,
      message: 'Majburiy maydon',
      trigger: 'blur'
    },
    {
      min: 9,
      message: "Telefon raqam to'liq kiritilishi shart!",
      trigger: 'blur'
    }
  ]
})
const { validate, validateInfos } = useForm(model, rules)
const getOtpGenerate = () => {
  validate()
    .then(() => {
      authPinia.getOtp(model.value.phone_number)
    })
    .catch(() => {})
}
const sendOpt = () => {
  if (model.value.otp.length === 6) {
    authPinia.sendOtp(model.value.otp)
  }
}
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
                <a-form name="loginForm" :model="model" layout="vertical">
                  <a-form-item
                    v-bind="validateInfos.phone_number"
                    label="Tel. raqam"
                  >
                    <phone-number-input-component
                      :disable="Boolean(otp.otpKey)"
                      v-model="model.phone_number"
                    />
                  </a-form-item>
                  <template v-if="otp.otpKey">
                    <a-form-item label="Sms kodni kiriting">
                      <otp-input-component
                        v-model="model.otp"
                        placeholder="#####"
                        :digit-count="6"
                      />
                    </a-form-item>
                  </template>
                  <a-form-item>
                    <template v-if="otp.otpKey">
                      <a-button
                        @click="sendOpt"
                        :disabled="model.otp?.length !== 6"
                        block
                        size="large"
                        html-type="submit"
                        type="primary"
                      >
                        Kirish
                      </a-button>
                    </template>
                    <template v-else>
                      <a-button
                        @click="getOtpGenerate"
                        block
                        size="large"
                        html-type="submit"
                        type="primary"
                      >
                        Raqamga sms yuborish
                      </a-button>
                    </template>
                  </a-form-item>
                </a-form>
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
  overflow: hidden;
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
