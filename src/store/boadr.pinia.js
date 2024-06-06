import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import { uniqueItems } from '@/composables'

const useBoard = defineStore('board', {
  state: () => ({
    boardList: [],
    boardInfo: null,
    page: 0,
    totalElements: 0,
    totalPages: 0
  }),
  actions: {
    clearBoardList() {
      this.boardList = []
      this.page = 0
      this.totalElements = 0
      this.totalPages = 0
    },
    clearBoardInfo() {
      this.boardInfo = null
    },
    getAllBoard(page, categoryId, name = null) {
      const core = useCore()
      core.loadingUrl.add('board/all')
      this.page = page
      const params = {
        size: 9,
        page: page,
        categoryId: categoryId
      }
      if (name !== null && name !== '') {
        params.name = name
      }
      api({
        url: 'board',
        params: params
      })
        .then(({ data }) => {
          if (!page) {
            this.clearBoardList()
          }
          this.boardList.push(...data.content)
          this.boardList = uniqueItems(this.boardList, 'id')
          this.totalElements = data.totalElements
          this.totalPages = data.totalPages
        })
        .catch((error) => {
          useCore().switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('board/all')
        })
    },
    getOneById(id) {
      const core = useCore()
      core.loadingUrl.add(`get/board/one`)
      api({
        url: `board`,
        pk: id
      })
        .then(({ data }) => {
          this.boardInfo = data
        })
        .catch((error) => {
          useCore().switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/board/one')
        })
    }
  }
})
export default useBoard
