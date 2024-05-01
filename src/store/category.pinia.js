import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import { treeData, uniqueItems } from '@/composables'

const useCategories = defineStore('categories', {
  state: () => ({
    categories: []
  }),
  actions: {
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
          this.categories = treeData(data)
          console.log(this.categories)
          // this.categories = uniqueItems(this.categories, 'value')
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
export default useCategories
