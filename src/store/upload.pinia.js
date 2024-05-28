import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useUpload = defineStore('upload', {
  actions: {
    uploadFile(file, callback, progress) {
      const core = useCore()
      const form_data = new FormData()
      form_data.append('file', file)
      core.loadingUrl.add('file/upload')
      api({
        url: `file/telegram`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: form_data,
        onUploadProgress: (progressEvent) => {
          progress(
            parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            )
          )
        }
      })
        .then(({ data }) => {
          callback(data)
        })
        .catch((error) => {
          console.log(type)
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('file/upload')
        })
    },
    uploadFileKiosk(file, callback, progress) {
      const core = useCore()
      const form_data = new FormData()
      form_data.append('file', file)
      core.loadingUrl.add('file/upload')
      api({
        url: `file/kiosk`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: form_data,
        onUploadProgress: (progressEvent) => {
          progress(
            parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            )
          )
        }
      })
        .then(({ data }) => {
          callback(data)
        })
        .catch((error) => {
          console.log(type)
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingUrl.delete('file/upload')
        })
    }
  }
})
export default useUpload
