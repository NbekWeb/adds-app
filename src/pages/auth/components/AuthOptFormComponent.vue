<script setup>
import { reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { Form } from 'ant-design-vue'
import useCore from '@/store/core.pinia.js'
import useAuth from '@/store/auth.pinia.js'
import RetryTimerComponent from '@/components/RetryTimerComponent.vue'
import OtpInputComponent from '@/components/OtpInputComponent.vue'
import { useChallengeV3 } from 'vue-recaptcha/head'
import IconLoader from '@/components/icons/IconLoader.vue'

const { t } = useI18n()
const corePinia = useCore()
const authPinia = useAuth()
const useForm = Form.useForm

const { loadingUrl } = storeToRefs(corePinia)
const { otp } = storeToRefs(authPinia)

const finished = ref(false)
const model = reactive({
  otp: null
})

const modelRules = reactive({
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

const { resetFields, validate, validateInfos } = useForm(model, modelRules)

const changePhoneNumber = () => {
  authPinia.clearOtp()
  model.otp = null
  resetFields()
}

const sendOpt = () => {
  validate()
    .then(() => {
      authPinia.sendOtp(model.otp)
    })
    .catch(() => {})
}
const { execute } = useChallengeV3('submit')
const retryOtp = async () => {
  loadingUrl.value.add('auth/retry/otp')
  const token = await execute()

  await authPinia.retryOtp(token)
}
watch(otp, () => {
  if (finished.value) {
    finished.value = false
  }
})
</script>

<template>
  <a-form name="authForm" :model="model" layout="vertical">
    <div class="label mb-3">
      {{ $t('ENTER_SMS_CODE') }}
    </div>
    <a-form-item v-bind="validateInfos.otp">
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
            <template v-if="finished">
              <a-button
                @click="retryOtp"
                size="small"
                class="send-again-code"
                type="link"
              >
                <template v-if="loadingUrl.has('auth/retry/otp')">
                  <icon-loader size="small" />
                </template>
                <template v-else>
                  {{ $t('RESEND_THE_CODE') }}
                </template>
              </a-button>
            </template>
            <template v-else>
              <retry-timer-component
                :minute="otp.retryTimeMin"
                @finished="finished = true"
              />
            </template>
          </a-col>
        </a-row>
      </template>
    </a-form-item>
    <a-form-item>
      <a-button
        @click="sendOpt"
        @keyup.enter="sendOpt"
        :loading="loadingUrl.has('auth/send/otp')"
        :disabled="model.otp?.length !== 6"
        block
        size="large"
        html-type="submit"
        type="primary"
      >
        {{ $t('ENTER') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.label {
  text-align: center;
  font-size: 14px;
  font-weight: bolder;
  color: rgb($body, 0.8);
}
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
