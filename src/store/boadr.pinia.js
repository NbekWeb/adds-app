import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import date from '@/composables/date.js'

const useBoard = defineStore('board', {
  state: () => ({
    categories: [],
    boardList: [],
    boardConfigurationList: [],
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

    getAllBoard(page = this.page, categoryId) {
      const core = useCore()
      core.loadingUrl.add('board/all')
      this.page = page
      api({
        url: 'board',
        params: {
          size: 9,
          page: page,
          categoryId: categoryId
        }
      })
        .then(({ data }) => {
          this.boardList.push(...data.content)
          this.totalElements = data.totalElements
          this.totalPages = data.totalPages
          this.boardList = [
            ...new Map(
              this.boardList.map((item) => [item['id'], item])
            ).values()
          ]
        })
        .catch((error) => {
          useCore().switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('board/all')
        })
    },
    getOneById(id, callback) {
      const core = useCore()
      core.loadingUrl.add(`get/board/one`)
      api({
        url: `board/${id}`
      })
        .then(({ data }) => {
          callback(data)
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
          this.categories.push(
            ...data.map((item) => ({
              id: item.id,
              value: item.id,
              title: item.name,
              pId: item.parentId
            }))
          )

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
    },

    checkChannel(link, callback) {
      const core = useCore()
      core.loadingUrl.add('channel/check')
      api({
        url: 'channel/info',
        method: 'POST',
        data: {
          link: link
        }
      })
        .then(({ data }) => {
          callback(data?.channelInfo)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('channel/check')
        })
    },
    addNewBoard(form, callback) {
      const core = useCore()
      core.loadingUrl.add('board/create')
      api({
        url: 'board',
        method: 'POST',
        data: form
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'CHANNEL_ADDED_SUCCESSFULLY'
          })
          callback()
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('board/create')
        })
    },
    updateBoard(id, form, callback) {
      const core = useCore()
      core.loadingUrl.add(`update/board`)
      api({
        url: `board/${id}`,
        method: 'PUT',
        data: {
          categoryId: form.categoryId,
          name: form.name,
          description: form.description,
          logo: form.logoHashId
        }
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'CHANNEL_UPDATED_SUCCESSFULLY'
          })
          callback()
        })
        .catch((error) => {
          useCore().switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('update/board')
        })
    },
    deleteBoard(id) {
      const core = useCore()
      core.loadingUrl.add(`board/delete/${id}`)
      api({
        url: `board/${id}`,
        method: 'DELETE'
      })
        .then(() => {
          this.boardList = [...this.boardList.filter((item) => item.id !== id)]
          core.setToast({
            type: 'success',
            locale: 'CHANNEL_DELETED_SUCCESSFULLY'
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete(`board/delete/${id}`)
        })
    }
  }
})
export default useBoard
