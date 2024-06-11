<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { fileBaseUrl } from '@/utils/conf.js'
import useCore from '@/store/core.pinia.js'
import usePost from '@/store/post.pinia.js'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import IconLoader from '@/components/icons/IconLoader.vue'
import VideoPlayerComponent from '@/components/VideoPlayerComponent.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconFile from '@/components/icons/IconFile.vue'
import ImageComponent from "@/components/ImageComponent.vue";
import IconPlay from "@/components/icons/IconPlay.vue";

const route = useRoute()
const router = useRouter()

const corePinia = useCore()
const postPinia = usePost()

const { loadingUrl, visibleDrawer } = storeToRefs(corePinia)

const post = ref()

onMounted(() => {
  if (route.params.id) {
    postPinia.getOnePostById(route.params.id, (data) => {
      post.value = data
    })
  }
})
</script>

<template>
  <a-spin :spinning="loadingUrl.has('get/post/one')">
    <template #indicator>
      <IconLoader />
    </template>
    <scrollbar-component height="calc(100vh - 190px)">
      <template #content>
        <div class="post-item-file flex justify-center">
          <template v-if="post?.messageType === 'IMAGE'">
            <image-component
              :hash-id="post?.fileDto?.fileHashId"
              alt="Post image"
            />
          </template>
          <template v-if="post?.messageType === 'VIDEO'">
            <a-modal
              centered
              destroy-on-close
              class="modal-view"
              :footer="null"
              :closable="false"
              :open="visibleDrawer.has('post-item/view')"
              @cancel="visibleDrawer.delete('post-item/view')"
            >
              <video-player-component
                :file="{
                  snapshotHashId: post?.snapshotHashId,
                  hashId: post?.fileDto?.fileHashId
                }"
              />
            </a-modal>
            <div class="video-poster flex justify-center">
              <image-component
                :hash-id="post?.snapshotHashId"
                alt="Post video"
              />
              <a-button
                type="primary"
                shape="circle"
                class="video-poster__play flex justify-center align-center"
                @click="visibleDrawer.add('post-item/view')"
              >
                <IconPlay />
              </a-button>
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
            v-for="(button, i) in post?.buttons"
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
    <div class="mt-2">
      <a-button @click="router.back()">
        {{ $t('BACK') }}
      </a-button>
    </div>
  </a-spin>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
@import '@/assets/styles/responsive';
.video-poster {
  position: relative;
  &__play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    width: 60px;
    height: 60px;
  }
}

.post-item-file {
  background: $light;
  height: 300px;
  @include responsive-sm {
    height: 200px;
  }
  &:deep(img) {
    object-fit: contain;
  }
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
