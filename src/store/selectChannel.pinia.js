import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

const useSelectChannel = defineStore('categories', {
  state: () => ({
    selectChannel: useRouter().currentRoute.value.query.channel || 'telegram'
  }),
  actions: {
    updateChannel(val) {
      this.selectChannel = val
    }
  },
  getters: {
    getSelectChannel() {
      if (this.selectChannel === 'telegram') {
        return ''
      } else if (this.selectChannel.startsWith('kiosk-')) {
        return this.selectChannel
      } else {
        return 'kiosk-'
      }
    }
  }
})

export default useSelectChannel
