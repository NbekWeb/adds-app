<script setup>
import { computed, h, ref, shallowRef } from 'vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconAnnouncement from '@/components/icons/IconAnnouncement.vue'
import IconMessageTextSquare from '@/components/icons/IconMessageTextSquare.vue'
import IconShoppingCard from '@/components/icons/IconShoppingCard.vue'
import IconMonitor from '@/components/icons/IconMonitor.vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import IconMenu2 from '@/components/icons/IconMenu2.vue'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const emits = defineEmits(['change'])
const selected = ref([])

const activeLink = computed(() => route.fullPath.split('/')[2].split('?')[0])

const setCollapse = ({ key }) => {
  router.push(`/dashboard/${key}`)
  emits('change')
}

const menuList = shallowRef([
  {
    key: 'main',
    icon: () => h(IconHome),
    label: t('DashboardListView')
  },
  {
    key: 'board',
    icon: () => h(IconMenu2),
    label: t('DashboardCurrentsView'),
    children: [
      {
        key: 'board',
        icon: () => h(IconAnnouncement),
        label: t('DashboardBoardListView')
      },
      {
        key: 'kiosk-board',
        icon: () => h(IconMonitor),
        label: t('DashboardKioskBoardListView')
      }
    ]
  },
  {
    key: 'kiosk-post',
    icon: () => h(IconMessageTextSquare),
    label: t('DashboardKioskPostListView')
  },
  {
    key: 'kiosk-order',
    icon: () => h(IconShoppingCard),
    label: t('DashboardKioskOrderListView')
  },
  {
    key: 'post',
    icon: () => h(IconMessageTextSquare),
    label: t('DashboardPostListView')
  },

  {
    key: 'order',
    icon: () => h(IconShoppingCard),
    label: t('DashboardOrderListView')
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
    :items="menuList"
  >
  </a-menu>
</template>

<style scoped lang="scss">
.menu {
  border: none !important;
}
</style>
