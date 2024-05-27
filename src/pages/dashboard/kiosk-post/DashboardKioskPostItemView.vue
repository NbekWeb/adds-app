<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { fileBaseUrl } from '@/utils/conf.js'
import useCore from '@/store/core.pinia.js'
import useKioskPost from '@/store/kiosk-post.pinia.js'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import VideoPlayerComponent from '@/components/VideoPlayerComponent.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconFile from '@/components/icons/IconFile.vue'

const route = useRoute()
const router = useRouter()

const corePinia = useCore()
const kioskPostPinia = useKioskPost()

const { loadingUrl } = storeToRefs(corePinia)

const post = ref()

onMounted(() => {
  if (route.params.id) {
    kioskPostPinia.getOnePostById(route.params.id, (data) => {
      post.value = data
    })
  }
})
</script>

<template>
  <a-spin :spinning="loadingUrl.has('get/kiosk-post/one')">
    <template #indicator>
      <IconLoader />
    </template>
    <scrollbar-component height="calc(100vh - 190px)">
      <template #content>
        <div class="post-item-file">
          <template v-if="post?.messageType === 'IMAGE'">
            <img
              :src="`${fileBaseUrl}/file/${post?.fileDto?.fileHashId}`"
              alt=""
            />
          </template>
          <template v-if="post?.messageType === 'VIDEO'">
            <div class="flex justify-center">
              <video-player-component
                class="plyr-video"
                :file="{
                  snapshotHashId: post?.snapshotHashId,
                  hashId: post?.fileDto?.fileHashId
                }"
              />
            </div>
          </template>
          <template v-if="post?.messageType === 'DOCUMENT'">
            <div class="document justify-between align-center p-2">
              <span class="flex align-center">
                <IconFile />
                <span>{{ post?.fileName }}</span>
              </span>
              <a-space class="ml-3">
                <a
                  target="_blank"
                  rel="opener"
                  :href="`${fileBaseUrl}/file/${post?.fileDto?.fileHashId}`"
                >
                  <a-button class="btn" type="text">
                    <template #icon>
                      <IconEye />
                    </template>
                  </a-button>
                </a>
              </a-space>
            </div>
          </template>
        </div>
        <div class="mt-2" v-html="post?.text"></div>
        <a-row :gutter="[10, 10]">
          <a-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="8"
            :xl="6"
            v-for="(button,i) in post?.buttons"
            :key="i"
          >
            <a-popover>
              <template #title>
                <div class="flex justify-between">
                  <h4 class="m-0">{{ $t('URL') }}</h4>
                </div>
              </template>
              <template #content>
                <div class="button-url-container">
                  <a
                    :href="button.url"
                    target="_blank"
                    rel="opener"
                    class="button-url"
                  >
                    {{ button.url }}
                  </a>
                </div>
              </template>
              <a-button class="w-full" type="primary">
                {{ button.text }}
              </a-button>
            </a-popover>
          </a-col>
        </a-row>
      </template>
    </scrollbar-component>
  </a-spin>

  <div class="mt-2">
    <a-button @click="router.back()">
      {{ $t('BACK') }}  
    </a-button>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.post-item-file {
  img {
    width: 100%;
  }
}
.plyr-video {
  width: 100% !important;
}
.document {
  display: inline-flex;
  min-width: 400px;
  background: $light;
  font-size: 24px;
  border-radius: 4px;
  span {
    margin-left: 4px;
  }
  button {
    font-size: 18px;
  }
}
</style>
