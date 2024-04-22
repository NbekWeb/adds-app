<script setup>
import { computed, ref, shallowRef } from 'vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconAnnouncement from '@/components/icons/IconAnnouncement.vue'
import IconMessageTextSquare from '@/components/icons/IconMessageTextSquare.vue'
import IconShoppingCard from '@/components/icons/IconShoppingCard.vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const emits = defineEmits(['change'])
const selected = ref([])

const activeLink = computed(() => route.fullPath.split('/')[2])

const setCollapse = ({ key }) => {
  router.push(`/dashboard/${key}`)
  emits('change')
}
const menuList = shallowRef([
  {
    path: 'main',
    name: 'DashboardListView',
    icon: IconHome
  },
  {
    path: 'board',
    name: 'DashboardBoardListView',
    icon: IconAnnouncement
  },
  {
    path: 'post',
    name: 'DashboardPostListView',
    icon: IconMessageTextSquare
  },
  {
    path: 'order',
    name: 'DashboardOrderListView',
    icon: IconShoppingCard
  }
])
</script>

<template>
  <a-menu
    @click="setCollapse"
    v-model="selected"
    :selectedKeys="[activeLink]"
    mode="inline"
    class="menu"
  >
    <a-menu-item v-for="menu in menuList" :key="menu.path">
      <template #icon>
        <component :is="menu.icon" />
      </template>
      {{ $t(menu.name) }}
    </a-menu-item>
  </a-menu>
</template>

<style scoped lang="scss">
.menu {
  border: none !important;
}
</style>
