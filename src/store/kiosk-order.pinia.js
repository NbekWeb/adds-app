import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useKioskOrder = defineStore('kiosk-order', {
  state: () => ({
    orders: [],
    orderStatusus: [],
    status: '',
    
  }),
  actions: {
    getAllOrdersStatus() {
      const core = useCore()
      core.loadingUrl.add('get/kiosk-order/status/all')
      api({
        url: 'kiosk-order/all-status'
      })
        .then(({ data }) => {
          this.orderStatusus = data
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/kiosk-order/status/all')
        })
    },
    getAllOrders(page, status) {
      const core = useCore()
      core.loadingUrl.add('get/kiosk-order/all')
      api({
        url: 'kiosk-order',
        params: {
          page: page,
          size: 10,
          status: status
        }
      })
        .then(({ data }) => {
          this.orders = data?.content
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/kiosk-order/all')
        })
    },
    getOrderById(id,callback) {
      const core = useCore()
      core.loadingUrl.add('get/kiosk-order/one')
      api({
        url: `kiosk-order/${id}`
      })
        .then(({ data }) => {
          callback(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/kiosk-order/one')
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
    }
  }
})
export default useKioskOrder
