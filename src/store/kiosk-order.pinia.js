import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useKioskOrder = defineStore('kiosk-order', {
  state: () => ({
    orders: [],
    orderStatuses: []
  }),
  actions: {
    getAllOrdersStatus() {
      const core = useCore()
      core.loadingUrl.add('get/order/status/all')
      api({
        url: 'kiosk-order/all-status'
      })
        .then(({ data }) => {
          console.log(data)
          this.orderStatuses = data
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/order/status/all')
        })
    },
    getAllOrders({ page, props }) {
      const core = useCore()
      core.loadingUrl.add('get/order/all')
      api({
        url: 'kiosk-order',
        params: {
          page: page,
          size: 10,
          // status: props.status
        }
      })
        .then(({ data }) => {
          this.user = data
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/order/all')
        })
    },
    getOrderById(id) {
      const core = useCore()
      core.loadingUrl.add('get/order/one')
      api({
        url: `kiosk-order/${id}`
      })
        .then(({ data }) => {
          console.log(data)
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
        url: 'kiosk-order',
        method: 'POST',
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
          core.loadingUrl.delete('create/order')
        })
    },
    createOrderItem(id, form) {
      const core = useCore()
      core.loadingUrl.add('create/order/item')
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
          core.loadingUrl.delete('create/order/item')
        })
    },
    updateOrder(id, form) {
      const core = useCore()
      core.loadingUrl.add('update/order')
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
          core.loadingUrl.delete('update/order')
        })
    },
    confirmOrder(id) {
      const core = useCore()
      core.loadingUrl.add(`confirm/order/${id}`)
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
          core.loadingUrl.delete(`confirm/order/${id}`)
        })
    },
    deleteOrder(id) {
      const core = useCore()
      core.loadingUrl.add('delete/order')
      api({
        url: `kiosk-order/${id}`,
        method: 'DELETE'
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
          core.loadingUrl.delete('delete/order')
        })
    }
  }
})
export default useKioskOrder
