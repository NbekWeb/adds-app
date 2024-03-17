import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const usePayment = defineStore('payment', {
  state: () => ({
    orders: [],
    orderStatuses: []
  }),
  actions: {
    getAllPayments() {
      const core = useCore()
      core.loadingUrl.add('get/payment/all')
      api({
        url: 'payment'
      })
        .then(() => {})
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/payment/all')
        })
    },
    getOneByIdPayments(id) {
      const core = useCore()
      core.loadingUrl.add('get/payment/all')
      api({
        url: `payment/${id}`
      })
        .then(() => {})
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/payment/all')
        })
    }
  }
})
export default usePayment
