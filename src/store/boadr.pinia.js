import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useBoard = defineStore('board', {
  state: () => ({
    channelName: null,
    configurationType: null,
    openDrover: false,
    categories: [],
    boardId: null,
    boardType: null,
    boardStatus: null,
    boardCategory: null,
    boardList: [],
    boardStatusAll: [],
    page: 0,
    size: 9,
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
    visibleDrover(isOpen, id = null, channelName = null, type) {
      if (isOpen) {
        this.openDrover = true
        this.boardId = id
        this.channelName = channelName
        this.configurationType = type
      } else {
        this.openDrover = false
        this.channelName = null
        this.boardId = null
        this.configurationType = null
      }
    },
    clearBoardList() {
      this.boardList = []
    },
    getAllBoard(page = this.page) {
      const core = useCore()
      core.loadingUrl.add('board/all')
      this.page = page
      api({
        url: 'board',
        params: {
          size: this.size,
          page: page,
          type: this.boardType,
          categoryId: this.boardCategory,
          status: this.boardStatus
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
    addNewBoardConfiguration(form) {
      const core = useCore()
      core.loadingUrl.add('board/configuration/create')
      api({
        url: `board-configuration?boardId=${this.boardId}`,
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
          amount: Number(form.amount.toString().replace(/[^0-9]/g, ''))
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
          core.loadingUrl.delete('board/configuration/create')
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
          console.log(error)
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete(`board/delete/${id}`)
        })
    }
  }
})
export default useBoard
