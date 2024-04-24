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

const handleCheck = (e) => {
  model.checked = e.target.checked ? true : null
}
const { execute } = useChallengeV3('submit')
const register = async () => {
  loadingUrl.value.add('auth/register')
  model.token = await execute()
  authPinia.register(model)
}

onBeforeMount(() => {
  if (!phoneNumber.value) {
    router.push('/login')
  }
})
</script>

<template>
  <a-form name="authForm" :model="model" layout="vertical">
    <a-form-item :label="$t('PHONE_NUMBER')">
      <phone-number-input-component disable :value="phoneNumber" size="large" />
    </a-form-item>
    <a-form-item :label="$t('F_I_O')">
      <a-input
        v-model:value="model.fullName"
        :disabled="loadingUrl.has('auth/register')"
        size="large"
        :placeholder="$t('ENTER_YOUR_FULL_NAME')"
      />
    </a-form-item>
    <a-form-item>
      <div class="flex">
        <a-checkbox
          @change="(e) => handleCheck(e)"
          v-model:checked="model.checked"
          :disabled="loadingUrl.has('auth/register')"
        >
        </a-checkbox>

        <p class="mb-0 ml-2">
          Ro'yxatdan o'tish orqali siz
          <a href="#" class="offer-link">oferta shartlariga</a> roziligingizni
          bildirasiz.
        </p>
      </div>
    </a-form-item>
    <div>
      <a-button
        @click="register"
        :loading="loadingUrl.has('auth/register')"
        :disabled="!model.checked || !model.fullName"
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
    </div>
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
