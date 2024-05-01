import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useKioskBoard = defineStore('kiosk-board', {
  state: () => ({
    kioskBoards: [],
    kioskBoard: {}
  }),
  actions: {
    clearBoardInfo() {
      this.kioskBoards = []
    },
    // getKioskBoardCategories(id = null) {
    //   const core = useCore()
    //   core.loadingUrl.add('board/category/all')
    //   api({
    //     url: 'board-category',
    //     params: {
    //       parentId: id
    //     }
    //   })
    //     .then(({ data }) => {
    //       this.categories = [
    //         ...data.map((item) => ({
    //           id: item.id,
    //           value: item.id,
    //           title: item.name,
    //           pId: item.parentId
    //         }))
    //       ]
    //       this.categories = uniqueItems(this.categories, 'value')
    //     })
    //     .catch((error) => {
    //       core.switchStatus(error)
    //     })
    //     .finally(() => {
    //       core.loadingUrl.delete('board/category/all')
    //     })
    // },
    getAllKioskBoard(page, name = null, categoryId = null) {
      const core = useCore()
      core.loadingUrl.add('get/kiosk-board/owner/all')
      api({
        url: 'kiosk-board',
        params: {
          page: page,
          size: 10,
          name: name,
          categoryId: categoryId
        }
      })
        .then(({ data }) => {
          // this.kioskBoards.push(...data.content)
          // this.kioskBoards.push(...data.content)
          console.log('data.content', data.content)
          this.kioskBoards = [...data.content]
          console.log(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/kiosk-board/owner/all')
        })
    },
    getOneKioskBoard(id, callback) {
      const core = useCore()
      api({
        url: `kiosk-board/${id}`
      })
        .then(({data}) => {
          callback(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/kiosk-board/owner/all')
        })
    },
    createBoard(form) {
      const core = useCore()
      core.loadingUrl.add('create/kiosk-board')
      api({
        url: 'kiosk-board',
        method: 'POST',
        data: form
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('create/kiosk-board')
        })
    },
    updateBoard(id, form) {
      const core = useCore()
      core.loadingUrl.add('update/kiosk-board')
      api({
        url: `kiosk-board/${id}`,
        method: 'PUT',
        data: form
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('update/kiosk-board')
        })
    },
    deleteBoard(id) {
      const core = useCore()
      core.loadingUrl.add(`delete/kiosk-board/${id}`)
      api({
        url: `kiosk-board/${id}`,
        method: 'DELETE'
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete(`delete/kiosk-board/${id}`)
        })
    }
  }
})
export default useKioskBoard
