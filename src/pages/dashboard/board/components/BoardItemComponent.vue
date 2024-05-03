<script setup>
import { useRouter } from 'vue-router'
import { fileBaseUrl } from '@/utils/conf.js'
import IconShoppingCard from '@/components/icons/IconShoppingCard.vue'
import IconEye from '@/components/icons/IconEye.vue'

const { item } = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const router = useRouter()
</script>

<template>
  <a-card class="board-item-card">
    <div class="flex flex-column justify-between h-full">
      <div class="flex justify-between">
        <div class="flex align-center">
          <a-avatar
            class="avatar"
            :src="`${fileBaseUrl}/file/${item.logoHashId}`"
            size="large"
          />
          <div class="flex justify-center flex-column ml-2">
            <h1 class="board-name mb-0">{{ item.name }}</h1>

            <p class="members-count text-bold m-0 text-muted">
              {{
                item.channelMembersCount > 999
                  ? `${Math.floor(item.channelMembersCount / 1000)}k`
                  : item.channelMembersCount
              }}
              <span class="text-bold"> obunachi </span>
            </p>
          </div>
        </div>
        <p class="category-name m-0">{{ item.category.name }}</p>
      </div>
      <div>
        <p class="description">{{ item.description }}</p>
      </div>
      <div class="flex justify-between flex-column">
        <div class="flex justify-between align-center">
          <a-space>
            <a-button
              @click="
                router.push({
                  name: 'BoardConfigurationsView',
                  params: {
                    id: item.id
                  }
                })
              "
              size="small"
              class="flex justify-center align-center board-item-btn"
            >
              <IconShoppingCard />
            </a-button>
            <a-button
              @click="
                router.push({
                  name: 'DashboardBoardItemInfoView',
                  params: {
                    id: item.id
                  }
                })
              "
              size="small"
              class="flex justify-center align-center board-item-btn"
            >
              <IconEye />
            </a-button>
          </a-space>
        </div>
      </div>
    </div>
  </a-card>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';

.board-item-card {
  min-height: 170px;
  height: 100%;
  &:hover {
    background: rgb($light, 0.2);
  }
  &:deep(.ant-card-body) {
    height: 100%;
  }
  &:deep(.ant-spin-nested-loading) {
    height: 100%;
    .ant-spin-container {
      height: 100%;
    }
  }
}
.logo {
  width: 70px;
  height: 70px;
}
.members-count {
  font-size: 12px;
  color: $body;
}
.board-name {
  width: 126px;
  line-height: 16px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.category-name {
  font-weight: bolder;
  text-align: end;
  color: $body;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.activated-btn {
  cursor: pointer;
}
//.board-item-btn {
//  width: 70px;
//}
</style>
