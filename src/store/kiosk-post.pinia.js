import { defineStore } from 'pinia'
import { uniqueItems } from '@/composables/index.js'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useKioskPost = defineStore('kiosk-post', {
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
        url: `kiosk-post`,
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
        url: `kiosk-post`,
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
      core.loadingUrl.add('kiosk-create/post')

      const data = {
        text: form.text,
        fileHashId: form?.fileHashId
      }

      api({
        url: `kiosk-post`,
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
          core.loadingUrl.delete('kiosk-create/post')
        })
    },
    updatePost(id, form, callback) {
      const core = useCore()
      core.loadingUrl.add('update/kiosk-post')
      api({
        url: 'kiosk-post',
        pk: id,
        method: 'PUT',
        data: {
          text: form.text,
          fileHashId: form.fileHashId
        }
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
          console.log('form')
        })
        .finally(() => {
          core.loadingUrl.delete('create/kiosk-post')
        })
    },
    deletePostById(id) {
      const core = useCore()
      core.loadingUrl.add(`delete/kiosk-post/${id}`)
      api({
        url: `kiosk-post`,
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
          core.loadingUrl.delete(`delete/kiosk-post/${id}`)
        })
    },
    getDurationLimit(callback) {
      const core = useCore()
      core.loadingUrl.add('get/duration-limit')
      api({
        url: 'duration-limit',
        method: 'GET'
      })
        .then(({ data }) => {
          callback(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/duration-limit')
        })
    },
    getPostDetails(id, callback) {
      const core = useCore()
      core.loadingUrl.add('get/kiosk-post/details')
      api({
        url: `kiosk-post/details/${id}`,
        method: 'GET'
      })
        .then(({ data }) => {
          callback(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('get/kiosk-post/details')
        })
    }
  }
})
export default useKioskPost
