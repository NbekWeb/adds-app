import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useUser = defineStore('user', {
  state: () => ({
    user: null,
    loadingUser: false,
    loading: false
  }),
  actions: {
    logOut() {
      this.user = null
      localStorage.clear()
      useCore().redirect('/')
    },
    getUserMe() {
      this.loadingUser = true
      api({
        url: 'user/me'
      })
        .then(({ data }) => {
          this.user = data
        })
        .catch((error) => {
          useCore().switchStatus(error)
        })
        .finally(() => {
          this.loadingUser = false
        })
    }
  }
})
export default useUser
