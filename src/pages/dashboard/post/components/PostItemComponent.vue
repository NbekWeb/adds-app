<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import usePost from '@/store/post.pinia.js'
import useCore from '@/store/core.pinia.js'
import IconLoader from '@/components/icons/IconLoader.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconFile from '@/components/icons/IconFile.vue'
import IconShoppingCard from '@/components/icons/IconShoppingCard.vue'
import { useRouter } from 'vue-router'
import IconEye from '@/components/icons/IconEye.vue'
import IconPaperClip from '@/components/icons/IconPaperClip.vue'
import IconEdit from '@/components/icons/IconEdit.vue'

const router = useRouter()

const emits = defineEmits(['getOne'])
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const corePinia = useCore()
const postPinia = usePost()

const { loadingUrl } = storeToRefs(corePinia)
const baseUrl = ref(
  `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_AOO_BASE_API_VERSION}`
)

const deletePost = () => {
  postPinia.deletePostById(props.item.id)
}
</script>

<template>
  <a-spin class="spin" :spinning="loadingUrl.has(`delete/post/${item.id}`)">
    <template #indicator>
      <icon-loader />
    </template>
    <a-card class="card">
      <template #cover v-if="item.messageType !== 'TEXT'">
        <div class="post-cover">
          <template v-if="item.messageType === 'DOCUMENT'">
            <icon-file class="file" />
          </template>
          <template v-if="item.messageType === 'IMAGE'">
            <img
              class="post-image"
              :src="`${baseUrl}/file/${item.fileHashId}?type=TELEGRAM`"
              alt=""
            />
          </template>
        </div>
      </template>

      <a-card-meta class="mb-3">
        <template #description>
          <div
            :class="{ text: item.messageType === 'TEXT' }"
            class="post-text"
            v-html="item.text"
          ></div>
        </template>
      </a-card-meta>
      <template #actions>
        <a-button @click="emits('getOne', item.id)" type="primary" size="small">
          <icon-eye class="mt-1" />
        </a-button>
        <a-button
          @click="
            router.push({
              name: 'DashboardOrderFormView',
              params: {
                postId: item.id
              }
            })
          "
          type="primary"
          size="small"
        >
          <icon-shopping-card class="mt-1" />
        </a-button>
        <a-button type="primary" size="small" danger @click="deletePost">
          <icon-trash class="mt-1" />
        </a-button>
      </template>
      <div class="actions">
        <a-space> </a-space>
      </div>
    </a-card>
  </a-spin>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.card {
  position: relative;
  &:deep(.ant-card-body) {
    padding: 12px 12px 12px 12px;
  }
}
.post-cover {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  .post-image {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  .file {
    font-size: 88px;
    color: $muted;
  }
}

.actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 10px;
  left: 0;
  padding: 0 12px 0 12px;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.post-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  color: $body;
  &:deep(p) {
    margin: 0 !important;
  }
}
.text {
  -webkit-line-clamp: 15;
}
</style>
