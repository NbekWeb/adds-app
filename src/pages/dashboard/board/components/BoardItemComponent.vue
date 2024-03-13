<script setup>
import IconTrash from '@/components/icons/IconTrash.vue'
import { onMounted, ref } from 'vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDotsVertical from '@/components/icons/IconDotsVertical.vue'
import IconUser from '@/components/icons/IconUser.vue'
import useBoard from '@/store/boadr.pinia.js'
import IconLoader from '@/components/icons/IconLoader.vue'
import { storeToRefs } from 'pinia'
import IconPlus from '@/components/icons/IconPlus.vue'
import useCore from '@/store/core.pinia.js'
import { useRouter } from 'vue-router'
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
const emits = defineEmits(['addNewConfig'])

const router = useRouter()
const corePinia = useCore()
const boardPinia = useBoard()
const { loadingUrl } = storeToRefs(corePinia)
const baseUrl = ref(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/`)
const config = ref([
  'Junior',
  'Middle',
  'Senior',
  'Team lead',
  'Junior',
  'Middle',
  'Senior',
  'Team lead'
])
const timeConfig = ref([
  '8:00',
  '9:00',
  '10:00',
  '8:00',
  '9:00',
  '10:00',
  '8:00',
  '9:00',
  '10:00'
])
const configLength = ref(0)
const timeConfigLength = ref(0)
const parentConfig = ref(null)
const childConfig = ref(null)
const parentTimeConfig = ref(null)
const childTimeConfig = ref(null)

const handleOffsetWith = () => {
  if (childConfig.value?.offsetWidth > parentConfig.value?.offsetWidth) {
    configLength.value = Math.floor(
      parentConfig.value.offsetWidth /
        (childConfig.value.offsetWidth / config.value.length)
    )
  }
  if (
    childTimeConfig.value?.offsetWidth > parentTimeConfig.value?.offsetWidth
  ) {
    timeConfigLength.value = Math.floor(
      parentTimeConfig.value.offsetWidth /
        (childTimeConfig.value.offsetWidth / timeConfig.value.length)
    )
  }
}

const handleVisibleDrover = () => {
  emits('addNewConfig', props.item.id, 'configuration')
}
const handleVisibleTimeDrover = () => {
  emits('addNewConfig', props.item.id, 'time-configuration')
}
const handleNavigate = () => {
  router.push(`/dashboard/board/item/${props.item.id}/configurations`)
}
onMounted(() => {
  handleOffsetWith()
})
</script>

<template>
  <a-spin :spinning="loadingUrl.has(`board/delete/${item.id}`)">
    <template #indicator>
      <icon-loader />
    </template>
    <a-card hoverable class="board-item" :loading="loading">
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
      <div class="board-main-info">
        <div class="logo">
          <img :src="`${baseUrl}file/${item?.logoHashId}`" alt="" />
        </div>
        <div>
          <h1 class="board-name">{{ item?.name }}</h1>
          <span class="subscriptions">
            <icon-user />
            <span>12k</span>
          </span>
        </div>
      </div>

      <div class="description mb-2">
        <p class="description-text">
          {{ item?.description }}
        </p>
      </div>
      <!--      <div class="board-type pl-2">-->
      <!--        <icon-telegram />-->
      <!--        <icon-instagram />-->
      <!--      </div>-->
      <div class="board-configurations">
        <h5>Board configuration</h5>
        <div class="configurations mb-1">
          <div ref="parentConfig" class="board-configuration-parent">
            <div ref="childConfig" class="board-configuration">
              <a-tag color="blue" v-for="tag in config">
                {{ tag }}
              </a-tag>
            </div>
          </div>

          <a-space class="buttons">
            <template v-if="configLength">
              <a-tag @click="handleNavigate" size="small" color="blue"
                ><span class="more">...</span></a-tag
              >
            </template>
            <a-button
              @click="handleVisibleDrover"
              size="small"
              type="primary"
              class="configuration-add-btn"
            >
              <icon-plus />
            </a-button>
          </a-space>
        </div>
        <h5>Board time configuration</h5>
        <div class="configurations">
          <div ref="parentTimeConfig" class="board-configuration-parent">
            <div ref="childTimeConfig" class="board-time-configuration">
              <a-tag color="blue" v-for="tag in timeConfig"> {{ tag }} </a-tag>
            </div>
          </div>

          <a-space class="buttons">
            <template v-if="timeConfigLength">
              <a-tag @click="handleNavigate" size="small" color="blue">
                ...
              </a-tag>
            </template>
            <a-button
              @click="handleVisibleTimeDrover"
              size="small"
              type="primary"
              class="configuration-add-btn"
            >
              <icon-plus />
            </a-button>
          </a-space>
        </div>
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
.board-item {
  position: relative;
  &:deep(.ant-card-body) {
    min-height: auto;
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
