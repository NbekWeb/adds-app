import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useBoard = defineStore('board', {
  state: () => ({
    loading: false,
    boardList: [],
    totalElements: 0,
    totalPages: 0,
    size: 10
  }),
  actions: {
    getAllBoard() {
      api({
        url: 'board'
      })
        .then(() => {})
        .catch((error) => {
          useCore().switchStatus(error)
        })
    }
  }
})
export default useBoard
