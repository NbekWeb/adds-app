<script setup>
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import usePost from '@/store/post.pinia.js'
import useCore from '@/store/core.pinia.js'
import IconLoader from '@/components/icons/IconLoader.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconShoppingCard from '@/components/icons/IconShoppingCard.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import { fileBaseUrl } from '@/utils/conf.js'
import IconFile from '@/components/icons/IconFile.vue'

const router = useRouter()
const route = useRoute()

const emits = defineEmits(['edit'])
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
  if (route.query.channel == 'telegram') {
    postPinia.deleteTelegramPostById(item.id)
  } else {
    postPinia.deleteKioskPostById(item.id)
  }
}

const pushToPost = () => {
  if (route.query.channel == 'telegram') {
    router.push({
      name: 'TelegramPostItemView',
      params: { id: item.id }
    })
  } else {
    router.push({
      name: 'KioskPostItemView',
      params: { id: item.id }
    })
  }
}

const pushToEdit = () => {
  if (route.query.channel == 'telegram') {
    router.push({
      name: 'TelegramPostEditView',
      params: { id: item.id }
    })
  } else {
    router.push({
      name: 'KioskPostEditView',
      params: { id: item.id }
    })
  }
}

const pushToShop = () => {
  if (route.query.channel == 'telegram') {
    router.push({
      name: 'TelegramOrderView',
      params: {
        postId: item.id
      }
    })
  } else {
    router.push({
      name: 'KioskOrderView',
      params: {
        postId: item.id
      }
    })
  }
}

function editPost(id) {
  emits('edit', id)
}
</script>

<template>
  <a-spin class="spin" :spinning="loadingUrl.has(`delete/post/${item.id}`)">
    <template #indicator>
      <icon-loader />
    </template>
    <a-card class="card">
      <template #cover v-if="item.messageType !== 'TEXT'">
        <div class="cover">
          <template
            v-if="item.messageType === 'IMAGE' || item.messageType === 'VIDEO'"
          >
            <img
              class="post-cover"
              :src="`${fileBaseUrl}/file/${item.messageType === 'IMAGE' ? item?.fileDto?.fileHashId : item.snapshotHashId}`"
              alt=""
            />
          </template>
          <template v-if="item.messageType === 'DOCUMENT'">
            <div
              class="post-item-document flex justify-center align-center h-full"
            >
              <IconFile />
            </div>
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
        <a-button @click="pushToPost" size="small">
          <icon-eye class="mt-1" />
        </a-button>
        <template v-if="item?.editable">
          <a-button @click="pushToEdit" size="small">
            <IconEdit class="mt-1" />
          </a-button>
        </template>

        <a-button @click="pushToShop" size="small">
          <icon-shopping-card class="mt-1" />
        </a-button>
        <a-popconfirm
          :title="$t('DOU_YOU_WANT_TO_LOG_OUT')"
          :ok-text="$t('YES')"
          :cancel-text="$t('NO')"
          @confirm="deletePost"
        >
          <a-button size="small" danger >
            <icon-trash class="mt-1" />
          </a-button>
        </a-popconfirm>
      </template>
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
.cover {
  width: 100%;
  height: 200px;
}
.post-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
.post-item-document {
  background: $light;
  font-size: 48px;
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
