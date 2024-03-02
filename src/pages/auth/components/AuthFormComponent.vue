<script setup>
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useAuth from '@/store/auth.pinia.js'
import { Form } from 'ant-design-vue'
import OtpInputComponent from '@/pages/auth/components/OtpInputComponent.vue'
import RetryTimerComponent from '@/pages/auth/components/RetryTimerComponent.vue'
import PhoneNumberInputComponent from '@/pages/auth/components/PhoneNumberInputComponent.vue'

const { t } = useI18n()
const authPinia = useAuth()
const useForm = Form.useForm
const { otp, isRegistered, finishedTimeStatus } = storeToRefs(authPinia)
const model = ref({
  phone_number: null,
  firstName: null,
  lastName: null,
  otp: null
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
  ]
})

const { validate, validateInfos } = useForm(model, modelRules)

const getOtpGenerate = () => {
  validate(['phone_number'])
    .then(() => {
      authPinia.getGenerateOtp(model.value.phone_number)
    })
    .catch((error) => {
      console.log(error)
    })
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
    .catch(() => {})
}
const retryOtp = () => {
  authPinia.getGenerateOtp(authPinia.phoneNumber)
}
const changePhoneNumber = () => {
  authPinia.clearOtp()
  model.value.firstName = null
  model.value.lastName = null
  model.value.otp = null
}
</script>

<template>
  <a-form name="authForm" :model="model" layout="vertical">
    <a-form-item
      v-bind="validateInfos.phone_number"
      :label="$t('PHONE_NUMBER')"
    >
      <phone-number-input-component
        :disable="Boolean(otp.otpKey)"
        v-model="model.phone_number"
      />
    </a-form-item>
    <template v-if="!isRegistered">
      <a-form-item v-bind="validateInfos.firstName" :label="$t('FIRST_NAME')">
        <a-input
          v-model:value="model.firstName"
          size="large"
          :placeholder="$t('ENTER_YOUR_FIRST_NAME')"
        />
      </a-form-item>
      <a-form-item v-bind="validateInfos.lastName" :label="$t('LAST_NAME')">
        <a-input
          v-model:value="model.lastName"
          size="large"
          :placeholder="$t('ENTER_YOUR_LAST_NAME')"
        />
      </a-form-item>
    </template>
    <template v-if="otp.otpKey">
      <a-form-item :label="$t('ENTER_SMS_CODE')" v-bind="validateInfos.otp">
        <otp-input-component v-model="model.otp" />
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
.otp-footer {
  justify-content: space-between;
  margin-top: 5px;
}
</style>
