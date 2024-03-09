import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useBoard = defineStore('board', {
  state: () => ({
    loading: false,
    loadingCategory: false,
    loadingChannel: false,
    loadingDelete: null,
    categories: [],
    boardList: [],
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
    getAllBoard(size = this.size, page = this.page) {
      this.loading = true
      this.size = size
      this.page = page
      api({
        url: 'board',
        params: {
          size: size,
          page: page
        }
      })
        .then(({ data }) => {
          this.boardList.push(...data.content)
          this.totalElements = data.totalElements
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
          this.loading = false
        })
    },
    getBoardCategories(id = null) {
      this.loadingCategory = true
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
          this.loadingCategory = false
        })
    },
    checkChannel(link) {
      const corePinia = useCore()
      this.loadingChannel = true
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
          corePinia.switchStatus(error)
        })
        .finally(() => {
          this.loadingChannel = false
        })
    },
    addNewBoard(form) {
      const corePinia = useCore()
      this.loading = true
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
          corePinia.setToast({
            type: 'success',
            locale: 'CHANNEL_ADDED_SUCCESSFULLY'
          })
          corePinia.redirect('/dashboard/board')
        })
        .catch((error) => {
          corePinia.switchStatus(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    deleteBoard(id) {
      const corePinia = useCore()
      this.loadingDelete = id
      api({
        url: `board/${id}`,
        method: 'DELETE'
      })
        .then(() => {
          this.boardList = [...this.boardList.filter((item) => item.id !== id)]
          corePinia.setToast({
            type: 'success',
            locale: 'CHANNEL_DELETED_SUCCESSFULLY'
          })
        })
        .catch((error) => {
          console.log(error)
          corePinia.switchStatus(error)
        })
        .finally(() => {
          this.loadingDelete = null
        })
    }
  }
})
export default useBoard
