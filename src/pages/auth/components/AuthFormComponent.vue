<script setup>
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useCore from '@/store/core.pinia.js'
import useAuth from '@/store/auth.pinia.js'
import { Form } from 'ant-design-vue'
import OtpInputComponent from '@/components/OtpInputComponent.vue'
import RetryTimerComponent from '@/components/RetryTimerComponent.vue'
import PhoneNumberInputComponent from '@/components/PhoneNumberInputComponent.vue'

const { t } = useI18n()
const corePinia = useCore()
const authPinia = useAuth()
const useForm = Form.useForm

const { loadingUrl } = storeToRefs(corePinia)
const { otp, isRegistered, finishedTimeStatus } = storeToRefs(authPinia)

const model = ref({
  phone_number: null,
  firstName: null,
  lastName: null,
  otp: null,
  checked: null
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
  ],
  firstName: [
    {
      required: true,
      message: t('REQUIRED_FIELD'),
      trigger: 'blur'
    }
  ],
  lastName: [
    {
      required: true,
      message: t('REQUIRED_FIELD'),
      trigger: 'blur'
    }
  ],
  otp: [
    {
      required: true,
      message: t('REQUIRED_CODE'),
      trigger: 'blur'
    },
    {
      min: 6,
      message: t('ENTER_THE_COMPLETE_CODE'),
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
const { resetFields, validate, validateInfos } = useForm(model, modelRules)

const getOtpGenerate = () => {
  validate(['phone_number'])
    .then(() => {
      authPinia.getGenerateOtp(model.value.phone_number)
    })
    .catch(() => {})
}
const sendOpt = () => {
  validate(['otp', 'phone_number'])
    .then(() => {
      authPinia.sendOtp(model.value.otp)
    })
    .catch(() => {})
}
const register = () => {
  validate()
    .then(() => {
      authPinia.register(model.value)
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
const retryOtp = () => {
  authPinia.getGenerateOtp(model.value.phone_number)
}
const changePhoneNumber = () => {
  authPinia.clearOtp()
  model.value.firstName = null
  model.value.lastName = null
  model.value.otp = null
  model.value.checked = null
  model.value.phone_number = null
  resetFields()
}

const handleCheck = (e) => {
  model.value.checked = e.target.checked ? true : null
}
</script>

<template>
  <a-form name="authForm" :model="model" layout="vertical">
    <a-form-item
      v-bind="validateInfos.phone_number"
      :label="$t('PHONE_NUMBER')"
    >
      <phone-number-input-component
        :disable="Boolean(otp.otpKey) || loadingUrl.has('auth/generate/otp')"
        v-model="model.phone_number"
        :value="model.phone_number"
      />
    </a-form-item>
    <template v-if="!isRegistered">
      <a-form-item v-bind="validateInfos.firstName" :label="$t('FIRST_NAME')">
        <a-input
          v-model:value="model.firstName"
          :disabled="loadingUrl.has('auth/register')"
          size="large"
          :placeholder="$t('ENTER_YOUR_FIRST_NAME')"
        />
      </a-form-item>
      <a-form-item
        class="last-name"
        v-bind="validateInfos.lastName"
        :label="$t('LAST_NAME')"
      >
        <a-input
          v-model:value="model.lastName"
          :disabled="loadingUrl.has('auth/register')"
          size="large"
          :placeholder="$t('ENTER_YOUR_LAST_NAME')"
        />
      </a-form-item>
    </template>
    <template v-if="!isRegistered">
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
    </template>
    <template v-if="otp.otpKey">
      <a-form-item :label="$t('ENTER_SMS_CODE')" v-bind="validateInfos.otp">
        <otp-input-component
          v-model="model.otp"
          :count="6"
          :disabled="
            loadingUrl.has('auth/send/otp') || loadingUrl.has('auth/register')
          "
        />
        <template #extra>
          <a-row class="otp-footer">
            <a-col>
              <a-button
                size="small"
                class="change-phone-number"
                @click="changePhoneNumber"
                type="link"
              >
                {{ $t('CHANGE_PHONE_NUMBER') }}
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
                  {{ $t('RESEND_THE_CODE') }}
                </a-button>
              </template>
              <template v-else>
                <retry-timer-component :minute="otp.retryTimeMin" />
              </template>
            </a-col>
          </a-row>
        </template>
      </a-form-item>
    </template>

    <a-form-item>
      <template v-if="otp.otpKey && isRegistered">
        <a-button
          @click="sendOpt"
          @keyup.enter="sendOpt"
          :loading="loadingUrl.has('auth/send/otp')"
          block
          size="large"
          html-type="submit"
          type="primary"
        >
          {{ $t('ENTER') }}
        </a-button>
      </template>
      <template v-else-if="!isRegistered">
        <a-button
          @click="register"
          :loading="loadingUrl.has('auth/register')"
          block
          size="large"
          html-type="submit"
          type="primary"
        >
          {{ $t('REGISTER') }}
        </a-button>
      </template>
      <template v-else>
        <a-button
          @click="getOtpGenerate"
          :loading="loadingUrl.has('auth/generate/otp')"
          block
          size="large"
          html-type="submit"
          type="primary"
        >
          {{ $t('SEND_SMS_CODE') }}
        </a-button>
      </template>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.otp-footer {
  justify-content: space-between;
  margin-top: 5px;
}
.last-name {
  margin-bottom: 10px !important;
}
.offer-link {
  color: $primary;
}
</style>
