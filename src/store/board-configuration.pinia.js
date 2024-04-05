import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import { uniqueItems } from '@/composables/index.js'

const useBoardConfiguration = defineStore('boardConfiguration', {
  state: () => ({
    configurations: [],
    page: 0,
    totalElements: 0,
    totalPages: 0
  }),
  actions: {
    clearConfigurations() {
      this.configurations = []
      this.page = 0
      this.totalElements = 0
      this.totalPages = 0
    },
    getConfigurationsByBoardId(id, page) {
      const core = useCore()
      core.loadingUrl.add('board/configurations')
      this.page = page
      api({
        url: `board-configuration`,
        params: {
          boardId: id,
          page: page,
          size: 6
        }
      })
        .then(({ data }) => {
          this.configurations.push(...data.content)
          this.configurations = uniqueItems(this.configurations, 'id')
          this.totalElements = data.totalElements
          this.totalPages = data.totalPages
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
