<script setup>
import { storeToRefs } from 'pinia'
import { fileBaseUrl } from '@/composables/index.js'
import useCore from '@/store/core.pinia.js'
import usePost from '@/store/post.pinia.js'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'

const corePinia = useCore()
const postPinia = usePost()

const { visibleDrawer, loadingUrl } = storeToRefs(corePinia)
const { postInfo } = storeToRefs(postPinia)

function closeDrawer() {
  visibleDrawer.value.delete('post/get/one')
  postPinia.clearPostInfo()
}
</script>

<template>
  <a-drawer
    :open="visibleDrawer.has('post/get/one')"
    @close="closeDrawer"
    width="500"
    :title="$t('POST')"
  >
    <a-spin :spinning="loadingUrl.has('get/post/one')">
      <template #indicator>
        <icon-loader />
      </template>
      <scrollbar-component height="calc(100vh - 110px)">
        <template #content>
          <template v-if="postInfo?.messageType === 'IMAGE'">
            <div class="post-image mb-2">
              <img
                :src="`${fileBaseUrl}/file/${postInfo?.fileHashId}`"
                alt=""
              />
            </div>
          </template>
          <div>
            <div v-html="postInfo?.text"></div>
          </div>
          <div>
            <a-button
              type="primary"
              :href="button.url"
              v-for="button in postInfo?.buttons"
              class="w-full mb-2"
            >
              {{ button.text }}
            </a-button>
          </div>
        </template>
      </scrollbar-component>
    </a-spin>
  </a-drawer>
</template>

<style scoped lang="scss">
.post-image {
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}
</style>
