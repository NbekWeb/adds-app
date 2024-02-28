import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const CorePinia = useCore()

const useAuth = defineStore('auth', {
  state: () => ({
    user: null,
    loadingLogin: false,
    loading: false,
    otp: {
      otpKey: null,
      retryTimeMin: null,
      expireOtpMin: null
    }
  }),
  actions: {
    clearOtp() {
      this.otp.expireOtpMin = null
      this.otp.retryTimeMin = null
      this.otp.otpKey = null
    },
    getOtp(phoneNumber) {
      this.loading = true
      api({
        url: 'otp',
        open: true,
        method: 'POST',
        data: { phoneNumber: '+998' + phoneNumber }
      })
        .then(({ data }) => {
          this.otp = data
        })
        .catch((err) => useCore().switchStatus(err))
        .finally(() => {
          this.loading = false
        })
    },
    sendOtp(otp) {
      this.loading = true
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
          CorePinia.redirect('/dashboard')
          useCore().setToast({
            message: `Tizimga kirish muvaffaqiyatli bajarildi!`,
            type: 'success'
          })
        })
        .catch((err) => CorePinia.switchStatus(err))
        .finally(() => {
          this.loading = false
        })
    }
  }
})
export default useAuth
