<script setup>
import IconTrash from '@/components/icons/IconTrash.vue'
import { computed, ref } from 'vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDotsVertical from '@/components/icons/IconDotsVertical.vue'
import IconUser from '@/components/icons/IconUser.vue'
import useBoard from '@/store/boadr.pinia.js'
import IconLoader from '@/components/icons/IconLoader.vue'
import { storeToRefs } from 'pinia'
import useCore from '@/store/core.pinia.js'
import { useRoute, useRouter } from 'vue-router'
import useUser from '@/store/user.pinia.js'
import IconEye from '@/components/icons/IconEye.vue'
import IconClockStopwatch from '@/components/icons/IconClockStopwatch.vue'
// import IconTelegram from '@/components/icons/IconTelegram.vue'
// import IconInstagram from '@/components/icons/IconInstagram.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
defineEmits(['addNewConfig'])

const router = useRouter()
const route = useRoute()

const corePinia = useCore()
const userPinia = useUser()
const boardPinia = useBoard()

const { loadingUrl } = storeToRefs(corePinia)
const { user } = storeToRefs(userPinia)

const baseUrl = ref(
  `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_AOO_BASE_API_VERSION}`
)

const boardStatus = ref(
  props.item.boardStatus === 'ACTIVE'
    ? 'success'
    : props.item.boardStatus === 'INACTIVE'
      ? 'error'
      : 'warning'
)
console.log(boardStatus.value)
</script>

<template>
  <div class="board-item-container">
    <a-spin :spinning="loadingUrl.has(`board/delete/${item.id}`)">
      <template #indicator>
        <icon-loader />
      </template>
      <a-card class="board-item" :loading="loading">
        <a-row class="board-main-info">
          <a-col class="logo-col flex align-center">
            <div class="logo">
              <img :src="`${baseUrl}/file/${item?.logoHashId}`" alt="" />
            </div>
            <div>
              <h1 class="board-name">{{ item?.name }}</h1>
              <span class="subscriptions">
                <icon-user />
                <span>{{
                  item?.channelMembersCount > 1000
                    ? `${Math.floor(item?.channelMembersCount / 1000)}k`
                    : item?.channelMembersCount
                }}</span>
              </span>
            </div>
          </a-col>

          <a-col class="category">
            <h3 class="category-name m-0">{{ item?.category?.name }}</h3>
            <span class="category-label"> Kategoriyasi </span>
          </a-col>
          <a-col class="status">
            <a-tag
              :bordered="false"
              :color="
                item.status.boardStatus === 'ACTIVE'
                  ? 'success'
                  : item.status.boardStatus === 'INACTIVE'
                    ? 'error'
                    : 'warning'
              "
            >
              <span class="status-name">
                {{ item?.status?.localName }}
              </span>
            </a-tag>
            <span class="status-label block"> Holati </span>
          </a-col>
          <a-col class="actions">
            <a-button
              @click="
                router.push(`/dashboard/board/item/${item.id}/configurations`)
              "
              size="middle"
              type="primary"
              shape="round"
              class="flex align-center"
            >
              Ta'riflar
            </a-button>
          </a-col>
        </a-row>
      </a-card>
    </a-spin>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
:deep(.ant-dropdown-menu-item) {
  padding: 0 !important;
}
:deep(.ant-dropdown-menu-item):hover {
  background-color: transparent !important;
}
:deep(.btn-card-actions-delete),
:deep(.btn-card-actions-edit) {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $body;
  background-color: transparent;
  transition: background-color 0.5s;
  &:hover {
    //background-color: rgb($primary, 0.1);
  }
  box-shadow: none;
}
:deep(.btn-card-actions-edit) {
  color: rgb($success, 0.8) !important;
  background-color: rgb($success, 0.1) !important;
}
:deep(.btn-card-actions-edit):hover {
  color: $success !important;
  background-color: rgb($success, 0.4) !important;
}
:deep(.btn-card-actions-delete) {
  color: rgb($danger, 0.8) !important;
  background-color: rgb($danger, 0.1) !important;
}
:deep(.btn-card-actions-delete):hover {
  color: $danger !important;
  background-color: rgb($danger, 0.4) !important;
}
.board-item-container {
  height: 100%;
  :deep(.ant-spin-nested-loading),
  :deep(.ant-spin-container) {
    height: 100%;
  }
}

.board-item {
  height: 100%;
  position: relative;
  &:deep(.ant-card-body) {
    //height: calc(100% - 50px);
    padding: 12px;
    cursor: pointer;
    &:hover {
      background-color: $light;
    }
  }

  .btn-card-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    //position: absolute;
    //right: 8px;
    //top: 8px;
    color: $body;
    background-color: transparent;
    transition: background-color 0.5s;
    &:hover {
      background-color: rgb($primary, 0.1);
    }
    &:focus-visible {
      outline: none;
      background-color: rgb($primary, 0.1);
    }
    box-shadow: none;
  }
  .board-main-info {
    display: flex;
    align-items: center;
    //margin-bottom: 5px;
    .board-name {
      font-weight: bolder;
      margin-bottom: 0;
    }
    .subscriptions {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: $muted;
      svg {
        margin-bottom: 2px;
      }
    }
  }

  //.border-bottom {
  //  border-bottom: 1px solid $muted;
  //}
  .category {
    width: 30%;
  }
  .status {
    width: 20%;
    .status-name {
      font-weight: bolder;
    }
  }
  .actions {
    width: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .category-label,
  .status-label {
    color: $muted;
    font-size: 14px;
  }
  .category-name {
    font-weight: bold;
    color: rgb($body, 0.8);
  }
  .status {
    font-weight: bolder;
  }
}
.logo-col {
  width: 40%;
  gap: 8px;
  .logo {
    display: block;
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    img {
      display: block;
      width: 50px;
      height: 50px;
    }
  }
}
</style>
