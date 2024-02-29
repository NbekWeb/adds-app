<script setup>
import { reactive, ref } from 'vue'
import useAuth from '@/store/auth.pinia.js'
import { Form } from 'ant-design-vue'
import OtpInputComponent from '@/pages/login/components/OtpForm/OtpInputComponent.vue'
import RetryTimerComponent from '@/pages/login/components/OtpForm/RetryTimerComponent.vue'
import { storeToRefs } from 'pinia'

const authPinia = useAuth()
const useForm = Form.useForm

const { otp, finishedTimeStatus } = storeToRefs(authPinia)

const model = ref({
  otp: null
})
const otpRule = reactive({
  otp: [
    {
      required: true,
      message: 'Majburiy maydon',
      trigger: 'blur'
    },
    {
      min: 6,
      message: "Telefon raqam to'liq kiritilishi shart!",
      trigger: 'blur'
    }
  ]
})

const { validate, validateInfos } = useForm(model, otpRule)

const sendOpt = () => {
  validate()
    .then(() => {
      authPinia.sendOtp(model.value.otp)
    })
    .catch(() => {})
}

const retryOtp = () => {
  authPinia.getOtp(authPinia.phoneNumber)
}
</script>

<template>
  <a-form name="loginForm" :model="model" layout="vertical">
    <a-form-item label="Sms kodni kiriting" v-bind="validateInfos.otp">
      <otp-input-component v-model="model.otp" />
      <a-row class="otp-footer">
        <a-col>
          <a-button
            size="small"
            class="change-phone-number"
            @click="authPinia.clearOtp()"
            type="link"
          >
            Raqamni o'zgartirish
          </a-button>
        </a-col>
        <a-col>
          <template v-if="finishedTimeStatus">
            <a-button
              @click="retryOtp"
              size="small"
              class="send-again-code"
              type="link"
            >
              Kodni qayt yuborish
            </a-button>
          </template>
          <template v-else>
            <retry-timer-component :minute="otp.retryTimeMin" />
          </template>
        </a-col>
      </a-row>
    </a-form-item>
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
  </a-form>
</template>

<style scoped lang="scss">
.otp-footer {
  justify-content: space-between;
  margin-top: 5px;
}
</style>
