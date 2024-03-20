import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const usePayment = defineStore('payment', {
  state: () => ({
    payments: [],
    totalPages: 0,
    totalElements: 0,
    page: 0
  }),
  actions: {
    getAllPayments({ page, ...props }) {
      const core = useCore()
      core.loadingUrl.add('get/payment/all')
      api({
        url: 'payment',
        params: {
          size: 10,
          page: page
        }
      })
        .then(({ data }) => {
          this.payments = data.content
          this.totalPages = data.totalPages
          this.totalElements = data.totalElements
        })
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
