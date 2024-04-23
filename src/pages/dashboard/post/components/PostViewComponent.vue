<script setup>
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import usePost from '@/store/post.pinia.js'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import PostFileViewModalComponent from '@/pages/dashboard/post/components/PostFileViewModalComponent.vue'
import { computed, onMounted, ref } from 'vue'
import { fileBaseUrl } from '@/utils/conf.js'

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
function openViewModal() {
  corePinia.visibleDrawer.add(`post/file/view/${postInfo.value?.fileHashId}`)
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
          <div :class="{ 'post-file': postInfo?.messageType === 'DOCUMENT' }">
            <post-file-view-modal-component
              :file="{
                fileType: postInfo?.messageType,
                hashId: postInfo?.fileHashId,
                snapshotHashId: postInfo?.snapshotHashId
              }"
            />
            <div
              class="post-cover"
              :class="{ 'type-text': postInfo?.messageType === 'TEXT' }"
            >
              <template v-if="postInfo?.messageType === 'IMAGE'">
                <div class="post-image">
                  <img
                    :src="`${fileBaseUrl}/file/${postInfo?.fileHashId}`"
                    alt=""
                  />
                </div>
              </template>
              <template v-if="postInfo?.messageType === 'VIDEO'">
                <div class="post-video">
                  <img
                    :src="`${fileBaseUrl}/file/${postInfo?.snapshotHashId}`"
                    alt=""
                  />
                  <div class="video-play flex justify-center align-center">
                    <a-button
                      @click="openViewModal"
                      size="large"
                      shape="circle"
                      type="primary"
                      class="btn"
                    >
                      <template #icon>
                        <IconPlay />
                      </template>
                    </a-button>
                  </div>
                </div>
              </template>
              <template v-if="postInfo?.messageType === 'DOCUMENT'">
                <div class="post-document">
                  <icon-file class="file" />
                  <div class="download-btn flex justify-center align-center">
                    <a-tooltip :title="$t('DOWNLOAD')">
                      <a
                        :href="`${fileBaseUrl}/file/${postInfo?.fileHashId}`"
                        download
                      >
                        <IconDownloadCloud />
                      </a>
                    </a-tooltip>
                  </div>
                </div>
              </template>
            </div>
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
.post-image {
  width: 100%;
  height: auto;
  img {
    width: 100%;
  }
}
.post-video {
  position: relative;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .video-play {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
