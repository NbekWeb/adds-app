import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import { uniqueItems } from '@/composables/index.js'

const useNotifications = defineStore('notifications', {
  state: () => ({
    notifications: [],
    totalPages: 0
  }),
  actions: {
    getNotifications(page, callback) {
      const core = useCore()
      core.loadingUrl.add('get/all/notifications')
      api({
        url: 'notification',
        params: {
          page: page,
          size: 6
        }
      })
        .then(({ data }) => {
          if (page === 0) {
            this.notifications.unshift(...data.content)
          }
          this.totalPages = data.totalPages
          this.notifications = [...this.notifications, ...data.content]
          this.notifications = uniqueItems(this.notifications, 'id')
          console.log(this.notifications)
          callback()
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/all/notifications')
        })
    },
    checkNotifications(callback) {
      const core = useCore()
      // core.loadingUrl.add('user/me')
      api({
        url: 'notification/count'
      })
        .then(({ data }) => {
          callback(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          // core.loadingUrl.delete('user/me')
        })
    },
    readNotification(id) {
      const core = useCore()
      // core.loadingUrl.add('user/me')
      api({
        url: 'notification',
        pk: id
      })
        .then(() => {
          this.notifications = this.notifications.map((item) => {
            if (item.id === id) item.read = true
            return item
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          // core.loadingUrl.delete('user/me')
        })
    }
  }
})
export default useNotifications
