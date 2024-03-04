import { defineStore } from 'pinia'
const useCore = defineStore('core', {
  state: () => ({
    locale: 'uzLat',
    loadingUrl: new Set([]),
    loadingMain: false,
    toastContent: null,
    redirectUrl: null
  }),
  actions: {
    loading() {
      this.loadingMain = !this.loadingMain
    },
    redirect(url = null) {
      this.redirectUrl = url
    },
    setToast(obj = null) {
      this.toastContent = obj
    },
    switchStatus(err) {
      try {
        const { response, message = 'Error' } = err
        const { data, status } = response
        let toastMessage = {
          type: 'error',
          message: message
        }
        if (status >= 200 && status <= 300) {
          toastMessage = {
            message: 'Success',
            type: 'success'
          }
        }
        if (status >= 400 && status < 500) {
          if (
            typeof data !== 'string' &&
            'message' in data &&
            data.message !== ''
          ) {
            toastMessage.message = data.message ? data.message : message
          }
          if (typeof data === 'string') {
            toastMessage.message = data
          }
        }
        if (status >= 500) {
          toastMessage = {
            message: `Server bilan bog'liq hatolik. Tizim administratoriga murojaat qiling!`,
            type: 'error'
          }
          if (window.location.pathname.includes('/dashboard')) {
            return this.redirect(`/dashboard/500`)
          }
          return this.redirect(`/500`)
        }
        this.setToast(toastMessage)
      } catch (err) {
        this.setToast({
          type: 'error',
          message: 'ERROR!'
        })
      }
    }
  }
})

export default useCore
