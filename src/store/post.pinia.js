import { defineStore } from 'pinia'
import { uniqueItems } from '@/composables/index.js'
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
      this.page = 0
      this.posts = []
      this.totalElements = 0
      this.totalPages = 0
    },
    clearPostInfo() {
      this.postInfo = null
    },
    getAllPosts(page, size = 10) {
      const core = useCore()
      this.page = page
      core.loadingUrl.add('get/post/all')
      api({
        url: `post`,
        params: {
          page: page,
          size: size
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
    getOnePostById(id, callback) {
      const core = useCore()
      core.loadingUrl.add('get/post/one')
      api({
        url: `post`,
        pk: id
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

    createNewPost(form, callback) {
      const core = useCore()
      core.loadingUrl.add('create/post')

      const data = {
        text: form.text,
        fileHashId: form?.fileHashId,
        buttons: form.buttons
      }

      api({
        url: `post`,
        method: 'POST',
        data: data
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'POST_ADDED_SUCCESSFULLY'
          })
          callback()
        })
        .catch((error) => {
          console.log(error)
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('create/post')
        })
    },
    updatePost(id, form, callback) {
      const core = useCore()
      core.loadingUrl.add('update/post')

      const data = {
        text: form.text,
        fileHashId: form.fileHashId,
        buttons: form.buttons.map((item) => ({
          orderNumber: item.orderNumber,
          text: item.text,
          url: item.url,
          id: item.id
        }))
      }
      api({
        url: `post`,
        pk: id,
        method: 'PUT',
        data: data
      })
        .then(() => {
          core.setToast({
            type: 'success',
            locale: 'POST_UPDATED_SUCCESSFULLY'
          })
          callback()
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('update/post')
        })
    },

    deletePostById(id) {
      const core = useCore()
      core.loadingUrl.add(`delete/post/${id}`)
      api({
        url: `post`,
        pk: id,
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
