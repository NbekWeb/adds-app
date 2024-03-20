import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import corePinia from '@/store/core.pinia.js'

const useKioskTimeConfiguration = defineStore('kiosk-time-configuration', {
  state: () => {},
  actions: {
    getAllBoards({ page, ...props }) {
      const core = corePinia()
      core.loadingUrl.add('get/kiosk-board/time-configuration/all')
      api({
        url: 'kiosk-time-configuration',
        params: {
          page: page,
          size: 10,
          boardId: props.boardId,
          orderDate: props.orderDate,
          configId: props.configId
        }
      })
        .then(() => {})
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/kiosk-board/time-configuration/all')
        })
    },
    createTimeConfiguration(id, form) {
      const core = corePinia()
      core.loadingUrl.add('create/kiosk-board/time-configuration')
      api({
        url: 'kiosk-time-configuration',
        method: 'POST',
        params: {
          boardId: id
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
          core.loadingUrl.delete('create/kiosk-board/time-configuration')
        })
    },
    updateTimeConfiguration(id, form) {
      const core = corePinia()
      core.loadingUrl.add('update/kiosk-board/time-configuration')
      api({
        url: `kiosk-time-configuration/${id}`,
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
          core.loadingUrl.delete('update/kiosk-board/time-configuration')
        })
    },
    deleteTimeConfiguration(id, form) {
      const core = corePinia()
      core.loadingUrl.add(`delete/kiosk-board/time-configuration/${id}`)
      api({
        url: `kiosk-time-configuration/${id}`,
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
          core.loadingUrl.delete(`delete/kiosk-board/time-configuration/${id}`)
        })
    }
  }
})
export default useKioskTimeConfiguration
