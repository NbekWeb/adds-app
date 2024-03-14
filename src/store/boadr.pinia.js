import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useBoard = defineStore('board', {
  state: () => ({
    categories: [],
    boardList: [],
    boardStatusAll: [],
    boardConfigurationList: [],
    page: 0,
    totalElements: 0,
    totalPages: 0,
    channel: {
      link: null,
      channelInfo: {
        id: null,
        chatId: null,
        title: null,
        username: null,
        description: null,
        membersCount: null,
        hashId: null
      },
      createdAt: null
    }
  }),
  actions: {
    clearBoardList() {
      this.boardList = []
      this.page = 0
      this.totalElements = 0
      this.totalPages = 0
    },
    getAllBoard({ page = this.page, ...props }) {
      const core = useCore()
      core.loadingUrl.add('board/all')
      this.page = page
      api({
        url: 'board',
        params: {
          size: 9,
          page: page,
          type: props.type,
          categoryId: props.categoryId,
          status: props.status
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
              value: item.id,
              label: item.name,
              parentId: item.parentId
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
    getAllBoardStatus() {
      const core = useCore()
      core.loadingUrl.add('board/status/all')
      api({
        url: 'board/status-list'
      })
        .then(({ data }) => {
          this.boardStatusAll = data.map((item) => ({
            label: item.localName,
            value: item.boardStatus
          }))
        })
        .catch((error) => {
          useCore().switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('board/status/all')
        })
    },

    checkChannel(link) {
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
          this.channel = data
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('channel/check')
        })
    },
    addNewBoard(form) {
      const core = useCore()
      core.loadingUrl.add('board/create')
      api({
        url: 'board',
        method: 'POST',
        data: {
          categoryId: form.categoryId,
          name: form.name,
          description: form.description,
          logoHashId: form.logoHashId,
          channelId: this.channel.channelInfo.id
        }
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'CHANNEL_ADDED_SUCCESSFULLY'
          })
          core.redirect('/dashboard/board')
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.add('board/create')
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
