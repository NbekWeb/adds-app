<script setup>
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import usePost from '@/store/post.pinia.js'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import PostFilesComponent from '@/pages/dashboard/post/components/PostFilesComponent.vue'
import { computed, onMounted, ref } from 'vue'

const corePinia = useCore()
const postPinia = usePost()

const { id } = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})
const { loadingUrl } = storeToRefs(corePinia)

const postInfo = ref({})
function handleOpenUrlNewTab(url) {
  window.open(
    url.includes('https') || url.includes('http') ? url : `http://${url}`,
    '_blank'
  )
}
onMounted(() => {
  postPinia.getOnePostById(id, (data) => {
    postInfo.value = data
  })
})
</script>

<template>
  <a-spin :spinning="loadingUrl.has('get/post/one')">
    <template #indicator>
      <icon-loader />
    </template>
    <scrollbar-component height="calc(100vh - 110px)">
      <template #content>
        <template v-if="postInfo">
          <div :class="{ 'post-file': postInfo.messageType === 'DOCUMENT' }">
            <post-files-component
              :file="{
                messageType: postInfo.messageType,
                hashId: postInfo.fileHashId,
                snapshotHashId: postInfo.snapshotHashId
              }"
            />
          </div>

          <div class="mt-2">
            <div v-html="postInfo?.text"></div>
          </div>
          <div>
            <a-button
              type="primary"
              @click="handleOpenUrlNewTab(button.url)"
              v-for="button in postInfo?.buttons"
              class="w-full mb-2"
            >
              {{ button.text }}
            </a-button>
          </div>
        </template>
      </template>
    </scrollbar-component>
  </a-spin>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.post-file {
  border-radius: 2px;
  border: 1px dashed $muted;
}
</style>
