import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import { uniqueItems } from '@/composables/index.js'

const useOrder = defineStore('order', {
  state: () => ({
    orderInfo: null,
    orders: [],
    totalElements: 0,
    totalPages: 0,
    page: 0
  }),
  actions: {
    clearOrders() {
      this.orders = []
      this.page = 0
      this.totalElements = 0
      this.totalPages = 0
    },

    getAllTelegramOrders(page, status) {
      const core = useCore()
      core.loadingUrl.add('get/order/all')
      this.page = page
      api({
        url: `order`,
        params: {
          page: page,
          size: 12,
          status: status
        }
      })
        .then(({ data }) => {
          if (!page) {
            this.clearOrders()
          }
          this.orders.push(...data.content)
          this.orders = uniqueItems(this.orders, 'id')
          this.totalElements = data.totalElements
          this.totalPages = data.totalPages
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/order/all')
        })
    },
    getAllKioskOrders(page, status) {
      const core = useCore()
      core.loadingUrl.add('get/order/all')

      this.page = page
      api({
        url: `kiosk-order`,
        params: {
          page: page,
          size: 12,
          status: status
        }
      })
        .then(({ data }) => {
          if (!page) {
            this.clearOrders()
          }
          this.orders.push(...data.content)
          this.orders = uniqueItems(this.orders, 'id')
          this.totalElements = data.totalElements
          this.totalPages = data.totalPages
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/order/all')
        })
    },
    getTelegramOrderById(id, callback) {
      const core = useCore()
      core.loadingUrl.add('get/order/one')
      api({
        url: `order`,
        pk: id
      })
        .then(({ data }) => {
          callback(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/order/one')
        })
    },
    getKioskOrderById(id, callback) {
      const core = useCore()
      core.loadingUrl.add('get/order/one')
      api({
        url: `kiosk-order`,
        pk: id
      })
        .then(({ data }) => {
          callback(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/order/one')
        })
    },
    createOrder(form) {
      const core = useCore()
      core.loadingUrl.add('create/order')
      api({
        url: `order`,
        method: 'POST',
        data: form
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'SUCCESS'
          })
          core.redirect('/dashboard/order')
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('create/order')
        })
    },
    createOrderItem(id, form) {
      const core = useCore()
      core.loadingUrl.add('create/order/item')
      api({
        url: `order-item`,
        method: 'POST',
        params: {
          orderId: id
        },
        data: form
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: ''
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('create/order/item')
        })
    },
    putTelegramCancelOrder(orderId, itemIdList,callback) {
      const core = useCore()
      core.loadingUrl.add('cancel/order')
      api({
        url: `order-item`,
        method: 'PUT',
        data: {
          orderId: orderId,
          itemIdList: itemIdList
        }
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'ORDER_CANCELED'
          })
          callback()
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('cancel/order')
        })
    },
    putKioskCancelOrder(orderId, itemIdList, callback) {
      const core = useCore()
      core.loadingUrl.add('cancel/order')
      api({
        url: `kiosk-order-item`,
        method: 'PUT',
        data: {
          orderId: orderId,
          itemIdList: itemIdList
        }
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'ORDER_CANCELED'
          })
          callback()
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('cancel/order')
        })
    },
    updateTelegramOrder(id, form) {
      const core = useCore()
      core.loadingUrl.add('update/order')
      api({
        url: `order`,
        pk: id,
        method: 'PUT',
        data: form
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'SUCCESS'
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('update/order')
        })
    },
    updateKioskOrder(id, form) {
      const core = useCore()
      core.loadingUrl.add('update/order')
      api({
        url: `kiosk-order`,
        pk: id,
        method: 'PUT',
        data: form
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'SUCCESS'
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('update/order')
        })
    },
    confirmTelegramOrder(id) {
      const core = useCore()
      core.loadingUrl.add(`confirm/order/${id}`)
      api({
        url: `order/confirm`,
        pk: id,
        method: 'POST'
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'SUCCESS'
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete(`confirm/order/${id}`)
        })
    },
    confirmKioskOrder(id) {
      const core = useCore()
      core.loadingUrl.add(`confirm/order/${id}`)
      api({
        url: `kiosk-order/confirm`,
        pk: id,
        method: 'POST'
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'SUCCESS'
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete(`confirm/order/${id}`)
        })
    },
    deleteTelegramOrder(id) {
      const core = useCore()
      core.loadingUrl.add('delete/order')
      api({
        url: `order`,
        pk: id,
        method: 'DELETE'
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'SUCCESS'
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('delete/order')
        })
    },
    deleteKioskOrder(id) {
      const core = useCore()
      core.loadingUrl.add('delete/order')
      api({
        url: `kiosk-order`,
        pk: id,
        method: 'DELETE'
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'SUCCESS'
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('delete/order')
        })
    }
  }
})
export default useOrder
