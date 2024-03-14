<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useChallengeV3 } from 'vue-recaptcha/head'
import { Form } from 'ant-design-vue'
import useAuth from '@/store/auth.pinia.js'
import useCore from '@/store/core.pinia.js'
import PhoneNumberInputComponent from '@/components/PhoneNumberInputComponent.vue'

const { t } = useI18n()
const useForm = Form.useForm
const corePinia = useCore()
const authPinia = useAuth()

const { loadingUrl } = storeToRefs(corePinia)
const { otp } = storeToRefs(authPinia)

const model = reactive({
  phone_number: null,
  token: null
})
const modelRules = reactive({
  phone_number: [
    {
      required: true,
      message: t('REQUIRED_FIELD'),
      trigger: 'blur'
    },
    {
      min: 9,
      message: t('REQUIRED_PHONE_NUMBER'),
      trigger: 'blur'
    }
  ]
})

const { validate, validateInfos } = useForm(model, modelRules)

const { execute } = useChallengeV3('submit')
const getOtpGenerate = () => {
  validate()
    .then(async () => {
      loadingUrl.value.add('auth/generate/otp')
      model.token = await execute()
      authPinia.getGenerateOtp(model)
    })
    .catch(() => {})
}
</script>

<template>
  <a-form name="authForm" :model="model" layout="vertical">
    <a-form-item
      v-bind="validateInfos.phone_number"
      :label="$t('PHONE_NUMBER')"
    >
      <phone-number-input-component
        :disable="loadingUrl.has('auth/generate/otp')"
        v-model="model.phone_number"
        :value="model.phone_number"
        size="large"
      />
    </a-form-item>

    <a-form-item>
      <a-button
        @click="getOtpGenerate"
        :loading="loadingUrl.has('auth/generate/otp')"
        :disabled="model.phone_number?.length !== 9"
        block
        size="large"
        html-type="submit"
        type="primary"
      >
        {{ $t('SEND_SMS_CODE') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="scss"></style>
