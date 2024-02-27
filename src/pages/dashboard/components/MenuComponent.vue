<script setup>
import Logo from '@/components/Logo.vue'
import UserComponent from '@/pages/dashboard/components/UserComponent.vue'
import { ref } from 'vue'
import IconGrid from '@/components/icons/IconGrid.vue'
import IconPieChart from '@/components/icons/IconPieChart.vue'
import IconAnnouncement from '@/components/icons/IconAnnouncement.vue'
import IconCoinsStacked from '@/components/icons/IconCoinsStacked.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconNotificationText from '@/components/icons/IconNotificationText.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import IconHelp from '@/components/icons/IconHelp.vue'
import IconPowerOff from '@/components/icons/IconPowerOff.vue'
import { useRouter } from 'vue-router'

const { collapsed } = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})
const router = useRouter()
const selected = ref(['main'])

const setCollapse = ({ key }) => {
  router.push(`/dashboard/${key}`)
}
</script>

<template>
  <div class="aside" :class="collapsed && 'collapsed'">
    <div class="px-3">
      <a-row class="py-3" align="middle" justify="center">
        <a-col
          :xs="24"
          :sm="24"
          :md="collapsed ? 24 : 12"
          :lg="collapsed ? 24 : 8"
          :xxl="collapsed ? 24 : 6"
          class="text-center"
        >
          <logo />
        </a-col>
        <template v-if="!collapsed">
          <a-col :xs="24" :sm="24" :md="12" :lg="16" :xxl="16">
            <h2 class="m-0 logo-name">
              ADS-<span class="text-primary">PRO</span>
            </h2>
            <p class="m-0 text-muted small">Administrator</p>
          </a-col>
        </template>
      </a-row>
      <user-component avatar="true" class="mb-4" />
      <a-menu
        @click="setCollapse"
        v-model:selectedKeys="selected"
        mode="inline"
      >
        <a-menu-item :key="`main`">
          <template #icon>
            <icon-grid />
          </template>
          Asosiy sahifa
        </a-menu-item>
        <a-menu-item :key="`ads`">
          <template #icon>
            <icon-announcement />
          </template>
          E'lonlar
        </a-menu-item>
        <a-menu-item :key="`report`">
          <template #icon>
            <icon-pie-chart />
          </template>
          E'lon bo'yicha hisobot
        </a-menu-item>
        <a-menu-item :key="`audience`">
          <template #icon>
            <icon-users />
          </template>
          Auditoriya
        </a-menu-item>
        <a-menu-item :key="`billing`">
          <template #icon>
            <icon-coins-stacked />
          </template>
          Billing va to'lovlar
        </a-menu-item>
      </a-menu>
    </div>
    <div class="aside-footer m-3">
      <ul class="aside-footer-list" :class="collapsed && 'collapse'">
        <li>
          <a-tooltip title="Yordam">
            <router-link class="text-success" to="#">
              <icon-help />
            </router-link>
          </a-tooltip>
        </li>
        <li>
          <a-tooltip title=" Xabar va yangilik">
            <router-link to="#">
              <icon-notification-text />
            </router-link>
          </a-tooltip>
        </li>
        <li>
          <a-tooltip title="Sozlamalar">
            <router-link to="#">
              <icon-settings />
            </router-link>
          </a-tooltip>
        </li>
        <li>
          <a-tooltip title="Tizimdan chiqish">
            <router-link to="#">
              <icon-power-off />
            </router-link>
          </a-tooltip>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
:deep(.logo) {
  font-size: 36px;
  color: $primary;
}
:deep(.ant-menu) {
  border: none !important;
}
.logo-name {
  font-weight: 700;
  * {
    font-weight: 700;
  }
}
.aside {
  height: 100%;
  overflow: auto;
  position: relative;
  .aside-footer {
    font-size: 16px;
    border-top: 1px solid rgba($muted, 0.3);
    padding-top: 1rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    &-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem 0.5rem 24px;
        svg {
          vertical-align: -2px;
        }
      }
      &.collapse {
        flex-direction: column;
        li {
          padding-left: 1rem;
        }
      }
    }
  }
}
</style>
