import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useUpload = defineStore('upload', {
  state: () => ({
    fileHashId: null,
    loadingFile: false
  }),
  actions: {
    uploadFile(file) {
      const core = useCore()
      const form_data = new FormData()
      form_data.append('file', file)
      this.loadingFile = true
      api({
        url: 'file',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: form_data
      })
        .then(({ data }) => {
          this.fileHashId = data
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          this.loadingFile = false
        })
    }
  }
})
export default useUpload
