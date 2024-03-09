import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useUser = defineStore('user', {
  state: () => ({
    user: {
      id: null,
      username: null,
      firstName: null,
      lastName: null,
      balance: 0,
      role: null
    },
    loading: false,
    userList: [],
    loadingUser: true
  }),
  actions: {
    getUserMe() {
      const core = useCore()
      this.loadingUser = true
      api({
        url: 'user/me'
      })
        .then(({ data }) => {
          this.user = data
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          this.loadingUser = false
        })
    },
    getAllUsers() {
      const core = useCore()
      this.loading = true
      api({
        url: 'user'
      })
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateUser(form) {
      const core = useCore()
      this.loading = true
      api({
        url: 'user',
        method: 'PUT',
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          phoneNumber: `998${form.username}`
        }
      })
        .then(({ data }) => {
          this.user.firstName = data.firstName
          this.user.lastName = data.lastName
          this.user.username = data.phoneNumber
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
})
export default useUser
