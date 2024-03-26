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
const role = computed(() => route.params.role)

// const config = ref(['Junior', 'Middle', 'Senior', 'Team lead', 'Junior'])
// const timeConfig = ref([
//   '8:00',
//   '9:00',
//   '10:00',
//   '8:00',
//   '9:00',
//   '10:00',
//   '8:00',
//   '9:00',
//   '10:00'
// ])
// const configLength = ref(0)
// const timeConfigLength = ref(0)
// const parentConfig = ref(null)
// const childConfig = ref(null)
// const parentTimeConfig = ref(null)
// const childTimeConfig = ref(null)

// const handleOffsetWith = () => {
//   if (childConfig.value?.offsetWidth > parentConfig.value?.offsetWidth) {
//     configLength.value = Math.floor(
//       parentConfig.value.offsetWidth /
//         (childConfig.value.offsetWidth / config.value.length)
//     )
//   } else {
//     configLength.value = 0
//   }
//   if (
//     childTimeConfig.value?.offsetWidth > parentTimeConfig.value?.offsetWidth
//   ) {
//     timeConfigLength.value = Math.floor(
//       parentTimeConfig.value.offsetWidth /
//         (childTimeConfig.value.offsetWidth / timeConfig.value.length)
//     )
//   } else {
//     timeConfigLength.value = 0
//   }
// }

// window.addEventListener('resize', handleOffsetWith)

// const handleVisibleDrover = () => {
//   emits('addNewConfig', props.item.id, 'configuration')
// }
// const handleVisibleTimeDrover = () => {
//   emits('addNewConfig', props.item.id, 'time-configuration')
// }
// const handleNavigate = () => {
//   router.push(
//     `/dashboard/${role.value}/board/item/${props.item.id}/configurations`
//   )
// }

// onMounted(() => {
//   handleOffsetWith()
// })
</script>

<template>
  <div class="board-item-container">
    <a-spin :spinning="loadingUrl.has(`board/delete/${item.id}`)">
      <template #indicator>
        <icon-loader />
      </template>
      <a-card hoverable class="board-item" :loading="loading">
        <template v-if="role === 'owner'">
          <a-dropdown
            placement="bottomRight"
            class="actions-dropdown"
            trigger="click"
          >
            <a-button
              class="btn-card-actions"
              size="small"
              type="primary"
              shape="circle"
            >
              <icon-dots-vertical />
            </a-button>
            <template #overlay>
              <a-space direction="vertical" class="py-2">
                <a-button
                  @click="
                    router.push(`/dashboard/${role}/board/edit/${item?.id}`)
                  "
                  type="primary"
                  class="btn-card-actions-edit mx-1"
                  size="small"
                  shape="circle"
                >
                  <icon-edit />
                </a-button>
                <a-button
                  @click="boardPinia.deleteBoard(item?.id)"
                  type="primary"
                  class="btn-card-actions-delete mx-1"
                  size="small"
                  shape="circle"
                >
                  <icon-trash />
                </a-button>
              </a-space>
            </template>
          </a-dropdown>
        </template>

        <div class="board-main-info">
          <div>
            <div class="logo">
              <img :src="`${baseUrl}/file/${item?.logoHashId}`" alt="" />
            </div>
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
        </div>

        <div class="description mb-2">
          <p class="description-text">
            {{ item?.description }}
          </p>
        </div>

        <template #actions>
          <a-row justify="space-between" class="mx-3">
            <a-col class="pl-2">
              <span class="category-name">{{ item?.category?.name }}</span>
            </a-col>
            <a-col>
              <a-tag class="status" :bordered="false" color="warning">
                {{ item?.status?.localName }}
              </a-tag>
            </a-col>
          </a-row>
        </template>
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
    height: calc(100% - 50px);
  }

  .btn-card-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 8px;
    top: 8px;
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
    gap: 10px;
    margin-bottom: 5px;
    .board-name {
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
  .description {
    min-height: 60px;

    .description-text {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
  .board-type {
    font-size: 18px;
  }
  .configurations {
    display: flex;
    justify-content: space-between;
    gap: 5px;
    .buttons {
      &:deep(.ant-space-item) {
        .ant-tag {
          margin-right: 0;
        }
        width: max-content;
      }
      .configuration-add-btn {
        display: flex;
        align-items: center;
      }
    }
    .board-configuration-parent {
      overflow: hidden;
      width: 80%;
    }
    .board-configuration,
    .board-time-configuration {
      display: flex;
      justify-content: flex-start;
      width: max-content;
      .more {
        padding: 1px 0 1px 0;
      }
    }
  }

  .border-bottom {
    border-bottom: 1px solid $muted;
  }
  .category-name {
    font-weight: bold;
    color: rgb($body, 0.5);
  }
  .status {
    font-weight: bolder;
  }
}
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
</style>
