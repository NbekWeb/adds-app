<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import usePost from '@/store/post.pinia.js'
import useCore from '@/store/core.pinia.js'
import IconLoader from '@/components/icons/IconLoader.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconShoppingCard from '@/components/icons/IconShoppingCard.vue'
import IconEye from '@/components/icons/IconEye.vue'
import PostFilesComponent from '@/pages/dashboard/post/components/PostFilesComponent.vue'
import PostViewComponent from '@/pages/dashboard/post/components/PostViewComponent.vue'

const router = useRouter()

const { item } = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const corePinia = useCore()
const postPinia = usePost()

const { loadingUrl, visibleDrawer } = storeToRefs(corePinia)

const deletePost = () => {
  postPinia.deletePostById(item.id)
}
function handleGetOnePost() {
  corePinia.visibleDrawer.add(`post/get/one/${item.id}`)
}
</script>

<template>
  <a-drawer
    :open="visibleDrawer.has(`post/get/one/${item.id}`)"
    @close="visibleDrawer.delete(`post/get/one/${item.id}`)"
    destroy-on-close
    root-class-name="post-view-drawer"
    width="500"
    :title="$t('POST')"
  >
    <post-view-component :id="item.id" />
  </a-drawer>
  <a-spin class="spin" :spinning="loadingUrl.has(`delete/post/${item.id}`)">
    <template #indicator>
      <icon-loader />
    </template>
    <a-card class="card">
      <template #cover v-if="item.messageType !== 'TEXT'">
        <post-files-component
          :file="{
            messageType: item.messageType,
            hashId: item.fileHashId,
            snapshotHashId: item.snapshotHashId
          }"
        />
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
        <a-button
          @click="handleGetOnePost(item.id)"
          type="primary"
          size="small"
        >
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

<style lang="scss">
@import '@/assets/styles/variable';
@import '@/assets/styles/responsive';
.card {
  position: relative;
  &:deep(.ant-card-body) {
    height: 100%;
    padding: 12px 12px 12px 12px;
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

.post-view-drawer {
  .ant-drawer-content-wrapper {
    @include responsive-sm {
      width: 100% !important;
    }
  }
}
</style>
