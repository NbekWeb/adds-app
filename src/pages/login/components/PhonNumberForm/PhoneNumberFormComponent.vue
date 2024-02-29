<script setup>
import PhoneNumberInputComponent from '@/pages/login/components/PhonNumberForm/PhoneNumberInputComponent.vue'
import { reactive, ref } from 'vue'
import useAuth from '@/store/auth.pinia.js'
import { storeToRefs } from 'pinia'
import { Form } from 'ant-design-vue'

const authPinia = useAuth()
const { otp } = storeToRefs(authPinia)

const useForm = Form.useForm
const model = ref({
  phone_number: null,
  otp: null
})

const phoneNumberRule = reactive({
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
const otpRule = reactive({
  otp: [
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
const { validate, validateInfos } = useForm(model, otpRule)
const getOtpGenerate = () => {
  validate()
    .then(() => {
      authPinia.getOtp(model.value.phone_number)
    })
    .catch(() => {})
}
</script>

<template>
  <a-form name="loginForm" :model="model" layout="vertical">
    <a-form-item v-bind="validateInfos.phone_number" label="Tel. raqam">
      <phone-number-input-component
        :disable="Boolean(otp.otpKey)"
        v-model="model.phone_number"
      />
    </a-form-item>

    <template v-if="!otp.otpKey">
      <a-form-item>
        <a-button
          @click="getOtpGenerate"
          block
          size="large"
          html-type="submit"
          type="primary"
        >
          Raqamga sms yuborish
        </a-button>
      </a-form-item>
    </template>
  </a-form>
</template>

<style scoped lang="scss"></style>
