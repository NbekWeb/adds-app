import { defineStore } from 'pinia'
const useCore = defineStore('core', {
  state: () => ({
    locale: 'uzLat',
    collapsed: true,
    loadingUrl: new Set(['user/me']),
    visibleDrawer: new Set(),
    loadingMain: false,
    toastContent: null,
    redirectUrl: null,
    screenWidth: screen.width,
    screenHeight: screen.height
  }),
  actions: {
    loading() {
      this.loadingMain = !this.loadingMain
    },
    collapse() {
      this.collapsed = !this.collapsed
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
            toastMessage.locale = 'ERROR'
          }
        }
        if (status >= 500) {
          toastMessage = {
            locale: 'INTERNAL_SERVER_ERROR',
            type: 'error'
          }

          this.redirect(`/500`)
        }
        this.setToast(toastMessage)
      } catch (err) {
        console.log(err)
        this.setToast({
          type: 'error',
          locale: 'ERROR'
        })
      }
    }
  }
})

export default useCore
