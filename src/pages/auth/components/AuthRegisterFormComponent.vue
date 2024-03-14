<script setup>
import { onBeforeMount, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { Form } from 'ant-design-vue'
import { useChallengeV3 } from 'vue-recaptcha/head'
import useCore from '@/store/core.pinia.js'
import useAuth from '@/store/auth.pinia.js'
import PhoneNumberInputComponent from '@/components/PhoneNumberInputComponent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()
const useForm = Form.useForm
const corePinia = useCore()
const authPinia = useAuth()

const { loadingUrl } = storeToRefs(corePinia)
const { phoneNumber } = storeToRefs(authPinia)

const model = reactive({
  fullName: null,
  checked: null,
  token: null
})
const modelRules = reactive({
  fullName: [
    {
      required: true,
      message: t('REQUIRED_FIELD'),
      trigger: 'blur'
    }
  ],
  checked: [
    {
      required: true,
      message: t('REQUIRED_FIELD')
    }
  ]
})
const handleCheck = (e) => {
  model.checked = e.target.checked ? true : null
}
const { resetFields, validate, validateInfos } = useForm(model, modelRules)
const { execute } = useChallengeV3('submit')
const register = () => {
  validate()
    .then(async () => {
      loadingUrl.value.add('auth/register')
      model.token = await execute()
      authPinia.register(model)
    })
    .catch((error) => {
      if (!error.values.checked) {
        corePinia.setToast({
          message: t('YOU_MUST_AGREE_TO_THE_OFFER_TO_REGISTER'),
          type: 'warning'
        })
      }
    })
}

onBeforeMount(() => {
  if (!phoneNumber.value) {
    router.push('/login')
  }
})
</script>

<template>
  <a-form name="authForm" :model="model" layout="vertical">
    <a-form-item
      v-bind="validateInfos.phone_number"
      :label="$t('PHONE_NUMBER')"
    >
      <phone-number-input-component disable :value="phoneNumber" size="large" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.fullName" :label="$t('F_I_O')">
      <a-input
        v-model:value="model.fullName"
        :disabled="loadingUrl.has('auth/register')"
        size="large"
        :placeholder="$t('ENTER_YOUR_FULL_NAME')"
      />
    </a-form-item>
    <a-form-item v-bind="validateInfos.checked">
      <a-checkbox
        @change="(e) => handleCheck(e)"
        v-model:checked="model.checked"
        :disabled="loadingUrl.has('auth/register')"
      >
        Ro'yxatdan o'tish orqali siz
        <a href="#" class="offer-link">oferta shartlari</a>ga roziligingizni
        bildirasiz.
      </a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-button
        @click="register"
        :loading="loadingUrl.has('auth/register')"
        :disabled="!model.checked && !model.fullName"
        block
        size="large"
        html-type="submit"
        type="primary"
      >
        {{ $t('REGISTER') }}
      </a-button>
      <a-button
        @click="authPinia.clearOtp()"
        class="login mt-2"
        type="link"
        size="large"
      >
        {{ $t('ENTER') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.login {
  width: 100%;
}
.offer-link {
  color: $primary;
  text-decoration: underline;
}
</style>
