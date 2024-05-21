import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import corePinia from '@/store/core.pinia.js'

const useTimeConfiguration = defineStore('time-configuration', {
  state: () => ({
    timeConfigurations: [],
    page: 0,
    totalElements: 0,
    totalPages: 0
  }),
  actions: {
    clearTimeConfiguration() {
      this.timeConfigurations = []
      this.page = 0
      this.totalElements = 0
      this.totalPages = 0
    },
    getTimeConfigurationsByBoardId(id, configId, orderDate, page) {
      const core = useCore()
      core.loadingUrl.add('board/time-configurations')
      api({
        url: `board-time-configuration`,
        params: {
          boardId: id,
          orderDate: orderDate,
          configId: configId,
          page: page,
          size: 100
        }
      })
        .then(({ data }) => {
          this.timeConfigurations = data.content
          this.totalElements = data.totalElements
          this.totalPages = data.totalPages
        })
        .catch((error) => {
          useCore().switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('board/time-configurations')
        })
    },
    getKioskTimeConfigurations(page, boardId, orderDate) {
      const core = corePinia()
      core.loadingUrl.add('get/kiosk-board/time-configuration/all')
      api({
        url: 'kiosk-time-configuration',
        params: {
          page: page,
          size: 10,
          boardId: boardId,
          orderDate: orderDate
        }
      })
        .then(({data}) => {
          this.timeConfigurations = data.content
          this.totalElements = data.totalElements
          this.totalPages = data.totalPage
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/kiosk-board/time-configuration/all')
        })
    },
    getTelegramTimeConfigurations(page, boardId, orderDate) {
      const core = corePinia()
      core.loadingUrl.add('get/telegram-board/time-configuration/all')
      api({
        url: 'board-time-configuration',
        params: {
          page: page,
          size: 10,
          boardId: boardId,
          orderDate: orderDate
        }
      })
        .then(({data}) => {
          this.timeConfigurations = data.content
          this.totalElements = data.totalElements
          this.totalPages = data.totalPage
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/kiosk-board/time-configuration/all')
        })
    },
  }
})

export default useTimeConfiguration
