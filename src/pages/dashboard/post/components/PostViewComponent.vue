<script setup>
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import { fileBaseUrl } from '@/composables/index.js'
import IconLoader from '@/components/icons/IconLoader.vue'

defineProps({
  post: {
    type: Object,
    required: true
  }
})
const corePinia = useCore()

const { visibleDrawer, loadingUrl } = storeToRefs(corePinia)
</script>

<template>
  <a-drawer
    :open="visibleDrawer.has('post/get/one')"
    @close="visibleDrawer.delete('post/get/one')"
    width="500"
    :title="$t('POST')"
  >
    <a-spin :spinning="loadingUrl.has('get/post/one')">
      <template #indicator>
        <icon-loader />
      </template>
      <scrollbar-component height="calc(100vh - 110px)">
        <template #content>
          <template v-if="post.messageType === 'IMAGE'">
            <div class="post-image mb-2">
              <img :src="`${fileBaseUrl}/file/${post.fileHashId}`" alt="" />
            </div>
          </template>
          <div>
            <div v-html="post.text"></div>
          </div>
          <div>
            <a-button
              type="primary"
              :href="button.url"
              v-for="button in post?.buttons"
              class="w-full mb-2"
            >
              {{ button.text }}
            </a-button>
            <a-button
              type="primary"
              :href="button.url"
              v-for="button in post?.buttons"
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
