import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useKioskBoard = defineStore('kiosk-board', {
  state: () => ({
    kioskBoards: []
  }),
  actions: {
    getAllKioskBoard({ page, role = 'ads', props }) {
      const core = useCore()
      core.loadingUrl.add('get/kiosk-board/owner/all')
      api({
        url: role === 'owner' ? 'board/kiosk-owner' : 'kiosk-board',
        params: {
          page: page,
          size: 10,
          type: props.type,
          categoryId: props.categoryId,
          status: props.status
        }
      })
        .then(({ data }) => {
          console.log(data)
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
