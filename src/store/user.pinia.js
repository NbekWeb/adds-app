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
    userList: []
  }),
  actions: {
    getUserMe() {
      const core = useCore()
      core.loadingUrl.add('user/me')
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
          core.loadingUrl.delete('user/me')
        })
    },
    getAllUsers() {
      const core = useCore()
      api({
        url: 'user'
      })
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {})
    },
    updateUser(form) {
      const core = useCore()
      core.loadingUrl.add('user/update')
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
          console.log(data)
          this.user.firstName = data.firstName
          this.user.lastName = data.lastName
          this.user.username = data.username
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('user/update')
        })
    }
  }
})
export default useUser
