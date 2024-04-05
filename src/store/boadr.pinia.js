import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import { uniqueItems } from '@/composables'

const useBoard = defineStore('board', {
  state: () => ({
    categories: [],
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
    getAllBoard(page, categoryId, name = '') {
      const core = useCore()
      core.loadingUrl.add('board/all')
      this.page = page
      api({
        url: 'board',
        params: {
          size: 9,
          page: page,
          name: name,
          categoryId: categoryId
        }
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
        url: `board/${id}`
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
    },
    getBoardCategories(id = null) {
      const core = useCore()
      core.loadingUrl.add('board/category/all')
      api({
        url: 'board-category',
        params: {
          parentId: id
        }
      })
        .then(({ data }) => {
          this.categories = [
            ...data.map((item) => ({
              id: item.id,
              value: item.id,
              title: item.name,
              pId: item.parentId
            }))
          ]

          this.categories = [
            ...new Map(
              this.categories.map((item) => [item['value'], item])
            ).values()
          ]
        })
        .catch((error) => {
          useCore().switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('board/category/all')
        })
    }
  }
})
export default useBoard
