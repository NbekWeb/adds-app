import { defineStore } from 'pinia'
import { uniqueItems } from '@/composables/index.js'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const usePost = defineStore('post', {
  state: () => ({
    posts: [],
    postInfo: null,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    form: {
      fileHashId: null,
      text: '',
      buttons: [
        {
          orderNumber: 0,
          text: null,
          url: null,
          firstUrl: null,
          open: false,
          error: false
        }
      ]
    }
  }),
  actions: {
    clearPost() {
      this.posts = []
      this.totalElements = 0
      this.totalPages = 0
    },
    clearPostInfo() {
      this.postInfo = null
    },
    getAllPosts(page) {
      const core = useCore()
      core.loadingUrl.add('get/post/all')
      this.page = page
      api({
        url: 'post',
        params: {
          page: page,
          size: 10
        }
      })
        .then(({ data }) => {
          if (page === 0) {
            this.clearPost()
          }
          this.posts.push(...data.content)
          this.posts = uniqueItems(this.posts, 'id')
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
    getOnePostById(id) {
      const core = useCore()
      core.loadingUrl.add('get/post/one')
      api({
        url: `post/${id}`
      })
        .then(({ data }) => {
          this.postInfo = data
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/post/one')
        })
    },
    createNewPost(callback) {
      const core = useCore()
      core.loadingUrl.add('create/post')
      api({
        url: 'post',
        method: 'POST',
        data: {
          text: this.form.text,
          fileHashId: this.form.fileHashId,
          buttons: this.form.buttons.map((item) => ({
            orderNumber: item.orderNumber,
            text: item.text,
            url: item.url
          }))
        }
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'POST_ADDED_SUCCESSFULLY'
          })
          callback()
          this.getAllPosts(0)
        })
        .catch((error) => {
          console.log(error)
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
