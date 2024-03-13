import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import useBoard from '@/store/boadr.pinia.js'

const useBoardTimeConfiguration = defineStore('boardTimeConfiguration', {
  state: () => ({
    timeConfigurationList: [],
    timeConfigPage: 0,
    totalElements: 0,
    totalPages: 0
  }),
  actions: {
    clearTimeConfigurations() {
      this.timeConfigurationList = []
      this.timeConfigPage = 0
      this.totalElements = 0
      this.totalPages = 0
    },
    getTimeConfigurationsByBoardId(id, page = this.timeConfigPage) {
      const core = useCore()
      core.loadingUrl.add('board/id/time-configurations')
      this.page = page
      api({
        url: `board-time-configuration`,
        params: {
          boardId: id,
          page: page,
          size: 10
        }
      })
        .then(({ data }) => {
          this.timeConfigurationList.push(...data.content)
          this.totalElements = data.totalElements
          this.totalPages = data.totalPages
          this.timeConfigurationList = [
            ...new Map(
              this.timeConfigurationList.map((item) => [item['id'], item])
            ).values()
          ]
        })
        .catch((error) => {
          useCore().switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('board/id/time-configurations')
        })
    },

    addNewBoardTimeConfiguration(form, id, location) {
      const core = useCore()
      const board = useBoard()
      core.loadingUrl.add('board/time-configuration/create')
      api({
        url: `board-time-configuration`,
        params: {
          boardId: id
        },
        method: 'POST',
        data: {
          startTime: form.startTime,
          endTime: form.endTime,
          amount: Number(form.amount.toString().replace(/[^0-9]/g, ''))
        }
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'BOARD_TIME_CONFIGURATION_ADDED_SUCCESSFULLY'
          })
          core.visibleDrower.delete('configuration/drower')
          if (location === 'configuration-list') {
            this.clearTimeConfigurations()
            this.getTimeConfigurationsByBoardId(id, 0)
          }
          if (location === 'board-list') {
            board.clearBoardList()
            board.getAllBoard()
          }
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('board/time-configuration/create')
        })
    },
    deleteTimeConfiguration(id, boardId) {
      const core = useCore()
      core.loadingUrl.add(`board/time-configuration/delete/${id}`)
      api({
        url: `board-time-configuration/${id}`,
        method: 'DELETE'
      })
        .then(() => {
          core.setToast({
            locale: 'BOARD_CONFIGURATION_DELETED_SUCCESSFULLY',
            type: 'success'
          })
          this.clearTimeConfigurations()
          this.getTimeConfigurationsByBoardId(boardId, 0)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete(`board/time-configuration/delete/${id}`)
        })
    }
  }
})

export default useBoardTimeConfiguration
