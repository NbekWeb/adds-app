import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const usePost = defineStore('post', {
  state: () => ({
    posts: [],
    totalElements: 0,
    totalPages: 0,
    page: 0
  }),
  actions: {
    clearPost() {
      this.posts = []
      this.totalElements = 0
      this.totalPages = 0
    },
    getAllPosts(page) {
      const core = useCore()
      core.loadingUrl.add('get/post/all')
      api({
        url: 'post',
        params: {
          page: page,
          size: 10
        }
      })
        .then(({ data }) => {
          this.posts = data.content
          this.totalElements = data.totalElements
          this.totalPages = data.totalPages
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/post/all')
        })
    },
    getOnePostById(id, callback) {
      const core = useCore()
      core.loadingUrl.add('get/post/one')
      api({
        url: `post/${id}`
      })
        .then(({ data }) => {
          callback(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/post/one')
        })
    },
    createNewPost(form, cb) {
      const core = useCore()
      core.loadingUrl.add('create/post')
      api({
        url: 'post',
        method: 'POST',
        data: {
          text: form.text,
          fileHashId: form.fileHashId,
          buttons: form.buttons.map((item) => ({
            orderNumber: item.orderNumber,
            text: item.text,
            url: item.url
          }))
        }
      })
        .then(({ data }) => {
          core.setToast({
            type: 'success',
            locale: 'POST_ADDED_SUCCESSFULLY'
          })
          cb()
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('create/post')
        })
    },
    deletePostById(id) {
      const core = useCore()
      core.loadingUrl.add(`delete/post/${id}`)
      api({
        url: `post/${id}`,
        method: 'DELETE'
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'POST_DELETED_SUCCESSFULLY'
          })
          this.clearPost()
          this.getAllPosts(0)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete(`delete/post/${id}`)
        })
    }
  }
})
export default usePost
