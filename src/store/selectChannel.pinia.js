import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

const useSelectChannel = defineStore('categories', {
  state: () => ({
    selectChannel: ''
  }),
  actions: {
    initialize() {
      const router = useRouter()
      const channel = router.currentRoute.value.query.channel

      if (channel === 'telegram') {
        this.selectChannel = ''
      } else {
        this.selectChannel = 'kiosk-'
      }
    },
    updateChannel(val) {
      this.selectChannel = val
    }
  },
  hooks: {
    beforeMount() {
      this.initialize()
    }
  }
})

export default useSelectChannel
