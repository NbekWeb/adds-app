<script setup>
import IconHelp from '@/components/icons/IconHelp.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import IconNotificationText from '@/components/icons/IconNotificationText.vue'
import IconPowerOff from '@/components/icons/IconPowerOff.vue'
import useUser from '@/store/user.pinia.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})
const userPinia = useUser()

const logOut = () => {
  localStorage.clear()
  userPinia.$reset()
  router.push('/')
}
</script>

<template>
  <div class="aside-footer m-3">
    <ul class="aside-footer-list px-2" :class="[{ collapse: collapsed }]">
      <li>
        <a-tooltip :title="$t('Help')">
          <router-link class="text-success" :to="`/dashboard/help`">
            <a-button type="link" size="small" link>
              <icon-help />
            </a-button>
          </router-link>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :title="$t('News')">
          <router-link :to="`/dashboard/news`">
            <a-button type="link" size="small" link>
              <icon-notification-text />
            </a-button>
          </router-link>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :title="$t('Settings')">
          <router-link :to="`/dashboard/settings`">
            <a-button type="link" size="small" link>
              <icon-settings />
            </a-button>
          </router-link>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :title="$t('LogOut')">
          <a-popconfirm
            :title="$t('DOU_YOU_WANT_TO_LOG_OUT')"
            :ok-text="$t('YES')"
            :cancel-text="$t('NO')"
            @confirm="logOut"
          >
            <a-button class="log-out" type="link" size="small" link danger>
              <icon-power-off />
            </a-button>
          </a-popconfirm>
        </a-tooltip>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.aside-footer {
  font-size: 16px;
  border-top: 1px solid rgba($muted, 0.3);
  padding-top: 1rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  &-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    li {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        color: $body !important;
      }
      .log-out {
        color: $danger !important;
      }
      .router-link-exact-active {
        button {
          background-color: rgb($info, 0.2);
          color: $primary !important;
        }
      }

      svg {
        vertical-align: -2px;
      }
    }
    &.collapse {
      flex-direction: column;
      li {
        padding: 0.5rem 0.6rem 0.5rem 0.6rem;
      }
    }
  }
  .btn-dark {
    li {
      button {
        color: rgba(255, 255, 255, 0.65) !important;
      }
      .log-out {
        color: $danger !important;
      }
      .router-link-exact-active {
        button {
          background: $primary;
          color: $white !important;
        }
      }
    }
  }
}
</style>
