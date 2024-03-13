import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import useBoard from '@/store/boadr.pinia.js'

const useBoardConfiguration = defineStore('boardConfiguration', {
  state: () => ({
    boardConfigurationList: [],
    configPage: 0,
    totalElements: 0,
    totalPages: 0
  }),
  actions: {
    clearConfigurations() {
      this.boardConfigurationList = []
      this.configPage = 0
      this.totalElements = 0
      this.totalPages = 0
    },
    getConfigurationsByBoardId(id, page = this.configPage) {
      const core = useCore()
      core.loadingUrl.add('board/id/configurations')
      this.page = page
      api({
        url: `board-configuration?boardId=${id}`,
        params: {
          page: page,
          size: 10
        }
      })
        .then(({ data }) => {
          this.boardConfigurationList.push(...data.content)
          this.totalElements = data.totalElements
          this.totalPages = data.totalPages
          this.boardConfigurationList = [
            ...new Map(
              this.boardConfigurationList.map((item) => [item['id'], item])
            ).values()
          ]
        })
        .catch((error) => {
          useCore().switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('board/id/configurations')
        })
    },
    addNewBoardConfiguration(form, id, location) {
      const core = useCore()
      const board = useBoard()
      core.loadingUrl.add('board/configuration/create')
      api({
        url: `board-configuration`,
        params: {
          boardId: id
        },
        method: 'POST',
        data: {
          // name: form.name,
          liveTime:
            (form.liveTime.toString().slice(0, 2) * 60 * 60 +
              form.liveTime.toString().slice(3, 5) * 60) *
            1000,
          topTime:
            (form.topTime.toString().slice(0, 2) * 60 * 60 +
              form.topTime.toString().slice(3, 5) * 60) *
            1000,
          pinTime:
            (form.pinTime.toString().slice(0, 2) * 60 * 60 +
              form.pinTime.toString().slice(3, 5) * 60) *
            1000,
          amount: Number(form.amount)
        }
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'BOARD_CONFIGURATION_ADDED_SUCCESSFULLY'
          })
          core.visibleDrower.delete('configuration/drower')
          if (location === 'configuration-list') {
            this.clearConfigurations()
            this.getConfigurationsByBoardId(id, 0)
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
          core.loadingUrl.delete('board/configuration/create')
        })
    },

    deleteConfiguration(id, boardId) {
      const core = useCore()
      core.loadingUrl.add(`board/configuration/delete/${id}`)
      api({
        url: `board-configuration/${id}`,
        method: 'DELETE'
      })
        .then(() => {
          core.setToast({
            locale: 'BOARD_CONFIGURATION_DELETED_SUCCESSFULLY',
            type: 'success'
          })
          this.clearConfigurations()
          this.getConfigurationsByBoardId(boardId, 0)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete(`board/configuration/delete/${id}`)
        })
    }
  }
})

export default useBoardConfiguration
