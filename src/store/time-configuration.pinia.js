import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import useBoard from '@/store/boadr.pinia.js'
import corePinia from '@/store/core.pinia.js'

const useBoardTimeConfiguration = defineStore('boardTimeConfiguration', {
  actions: {
    getTimeConfigurationsByBoardId(id, configId, orderDate, page = 0, cb) {
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
          cb(data)
        })
        .catch((error) => {
          useCore().switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('board/time-configurations')
        })
    },
    getKioskTimeConfigurations(
      page = 0,
      boardId,
      orderDate,
      configId,
      callback
    ) {
      const core = corePinia()
      core.loadingUrl.add('get/kiosk-board/time-configuration/all')
      api({
        url: 'kiosk-time-configuration',
        params: {
          page: page,
          size: 10,
          boardId: boardId,
          orderDate: orderDate,
          configId: configId
        }
      })
        .then((data) => {
          callback(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/kiosk-board/time-configuration/all')
        })
    }
  }
})

export default useBoardTimeConfiguration
