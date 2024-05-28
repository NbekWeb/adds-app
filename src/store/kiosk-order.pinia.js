import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import { uniqueItems } from '@/composables/index.js'

const useKioskOrder = defineStore('kiosk-order', {
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
    getAllOrders(page, status) {
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
    getOrderById(id, callback) {
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
    createOrder(form, callback) {
      const core = useCore()
      core.loadingUrl.add('create/kiosk-order')
      api({
        url: 'kiosk-order',
        method: 'POST',
        data: form
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'ORDER_CREATE'
          })
          callback()
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('create/kiosk-order')
        })
    },
    createOrderItem(id, form) {
      const core = useCore()
      core.loadingUrl.add('create/kiosk-order/item')
      api({
        url: 'kiosk-order-item',
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
          core.loadingUrl.delete('create/kiosk-order/item')
        })
    },
    updateOrder(id, form) {
      const core = useCore()
      core.loadingUrl.add('update/kiosk-order')
      api({
        url: `kiosk-order/${id}`,
        method: 'PUT',
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
          core.loadingUrl.delete('update/kiosk-order')
        })
    },
    confirmOrder(id) {
      const core = useCore()
      core.loadingUrl.add(`confirm/kiosk-order/${id}`)
      api({
        url: `kiosk-order/confirm/${id}`,
        method: 'POST'
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
          core.loadingUrl.delete(`confirm/kiosk-order/${id}`)
        })
    },
    deleteOrder(id) {
      const core = useCore()
      core.loadingUrl.add('delete/kiosk-order')
      api({
        url: `kiosk-order/${id}`,
        method: 'DELETE'
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'ORDER_CANCELED'
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('delete/kiosk-order')
        })
    },
    putCancelOrder(orderId, itemIdList, callback) {
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
    }
  }
})
export default useKioskOrder
