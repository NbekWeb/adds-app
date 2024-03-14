import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useAuth = defineStore('auth', {
  state: () => ({
    user: null,
    loadingLogin: false,
    isRegistered: true,
    phoneNumber: null,
    otp: {
      otpKey: null,
      retryTimeMin: 0,
      expireOtpMin: 0
    }
  }),
  actions: {
    clearOtp() {
      this.otp.expireOtpMin = null
      this.otp.retryTimeMin = null
      this.otp.otpKey = null
      this.isRegistered = true
    },

    getGenerateOtp(form) {
      const core = useCore()
      core.loadingUrl.add('auth/generate/otp')
      api({
        url: 'otp',
        open: true,
        method: 'POST',
        data: {
          phoneNumber: '+998' + form.phone_number,
          token: form.token
        }
      })
        .then(({ data }) => {
          this.otp = data
          this.phoneNumber = form.phone_number
        })
        .catch((error) => {
          if (error.response.data.code === 109) {
            this.isRegistered = false
            this.phoneNumber = form.phone_number
          } else {
            core.switchStatus(error)
          }
        })
        .finally(() => {
          core.loadingUrl.delete('auth/generate/otp')
        })
    },
    retryOtp(token) {
      const core = useCore()
      core.loadingUrl.add('auth/retry/otp')
      api({
        url: 'otp',
        open: true,
        method: 'POST',
        data: {
          phoneNumber: '+998' + this.phoneNumber,
          token: token
        }
      })
        .then(({ data }) => {
          this.otp = data
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('auth/retry/otp')
        })
    },
    sendOtp(otp) {
      const core = useCore()
      core.loading()
      core.loadingUrl.add('auth/send/otp')
      api({
        url: 'auth',
        open: true,
        method: 'POST',
        data: {
          grantType: 'otp',
          otpKey: this.otp.otpKey,
          otpValue: otp
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data?.accessToken)
          localStorage.setItem('refresh_token', data?.refreshToken)
          this.clearOtp()
          core.redirect('/dashboard')
          core.setToast({
            message: `Tizimga kirish muvaffaqiyatli bajarildi!`,
            type: 'success'
          })
        })
        .catch((err) => core.switchStatus(err))
        .finally(() => {
          core.loadingUrl.delete('auth/send/otp')
        })
    },
    register(form) {
      const core = useCore()
      core.loadingUrl.add('auth/register')
      api({
        url: 'register',
        open: true,
        method: 'POST',
        data: {
          fullName: form.fullName,
          phoneNumber: '998' + this.phoneNumber,
          token: form.token
        }
      })
        .then(({ data }) => {
          this.otp = data
        })
        .catch((err) => core.switchStatus(err))
        .finally(() => {
          core.loadingUrl.delete('auth/register')
        })
    }
  }
})
export default useAuth
