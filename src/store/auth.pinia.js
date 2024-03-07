import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useAuth = defineStore('auth', {
  state: () => ({
    user: null,
    loadingLogin: false,
    finishedTimeStatus: false,
    isRegistered: true,
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

    changeRetryOptStatus() {
      this.finishedTimeStatus = !this.finishedTimeStatus
    },
    getGenerateOtp(number) {
      const core = useCore()
      core.loading()
      api({
        url: 'otp',
        open: true,
        method: 'POST',
        data: { phoneNumber: '+998' + number }
      })
        .then(({ data }) => {
          this.otp = data.otp
          this.isRegistered = data.isRegistered
          this.finishedTimeStatus = false
        })
        .catch((err) => core.switchStatus(err))
        .finally(() => {
          core.loading()
        })
    },
    sendOtp(otp) {
      const core = useCore()
      core.loading()
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
          core.loading()
        })
    },
    register(form) {
      const core = useCore()
      core.loading()
      api({
        url: 'register',
        open: true,
        method: 'POST',
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          phoneNumber: form.phone_number,
          otpKey: this.otp.otpKey,
          otpValue: form.otp
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
          core.loading()
        })
    }
  }
})
export default useAuth
