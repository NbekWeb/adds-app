import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import { uniqueItems } from '@/composables/index.js'

const useNotifications = defineStore('notifications', {
  state: () => ({
    count: 0,
    newNotifications: [],
    notifications: [],
    totalPages: 0,
    oldNotifications: new Set([]),
    notificationTimeouts: []
  }),
  actions: {
    clearAllNotifications() {
      this.notifications = []
      this.newNotifications = []
      this.count = 0
      this.totalPages = 0
      this.oldNotifications.clear()
    },
    getNotifications(page) {
      const core = useCore()
      core.loadingUrl.add('get/all/notifications')
      api({
        url: 'notification',
        params: {
          page: page,
          size: 10,
          isRead: null,
          role: 'CLIENT'
        }
      })
        .then(({ data }) => {
          if (page === 0) {
            this.notifications.unshift(...data.content)
          }
          this.totalPages = data.totalPages
          this.notifications = [...this.notifications, ...data.content]
          this.notifications = uniqueItems(this.notifications, 'id')

          this.newNotifications = []
          this.notifications.forEach((item) => {
            if (!this.oldNotifications.has(item.id) && !item.read) {
              this.newNotifications.push(item)
              this.oldNotifications.add(item.id)
            }
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/all/notifications')
        })
    },
    getUnreadNotifications(callback) {
      const core = useCore()
      core.loadingUrl.add('get/all/notifications')
      api({
        url: 'notification',
        params: {
          page: 0,
          size: 1000,
          isRead: false,
          role: 'CLIENT'
        }
      })
        .then(({ data }) => {
          this.newNotifications = data.content.filter((item) => {
            if (!this.oldNotifications.has(item.id)) {
              this.oldNotifications.add(item.id)
              return item
            }
          })
          callback()
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/all/notifications')
        })
    },
    checkNotifications() {
      const core = useCore()
      // core.loadingUrl.add('user/me')
      api({
        url: 'notification/count',
        params: {
          role: 'CLIENT'
        }
      })
        .then(({ data }) => {
          if (this.count !== data) {
            this.count = data
            this.getNotifications(0)
          }
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
          this.count--
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
