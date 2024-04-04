import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useBoardConfiguration = defineStore('boardConfiguration', {
  state: () => ({}),
  actions: {
    getConfigurationsByBoardId(id, page = this.page, cb) {
      const core = useCore()
      core.loadingUrl.add('board/configurations')
      this.page = page
      api({
        url: `board-configuration`,
        params: {
          boardId: id,
          page: page,
          size: 10
        }
      })
        .then(({ data }) => {
          cb(data)
        })
        .catch((error) => {
          useCore().switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('board/configurations')
        })
    }
  }
})

export default useBoardConfiguration
