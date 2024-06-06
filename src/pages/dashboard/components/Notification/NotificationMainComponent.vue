<script setup>
import IconBell from '@/components/icons/IconBell.vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import useNotifications from '@/store/notifications.pinia.js'
import { storeToRefs } from 'pinia'
import { notification } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import NotificationItem from '@/pages/dashboard/components/Notification/NotificationItem.vue'
import ScrollbarComponent from '@/components/ScrollbarComponent.vue'
import useCore from '@/store/core.pinia.js'
import IconClose from "@/components/icons/IconClose.vue";

const { t } = useI18n()

const corePinia = useCore()
const notificationPinia = useNotifications()
const { loadingUrl } = storeToRefs(corePinia)
const { notifications, totalPages, count, newNotifications, notificationTimeouts } =
  storeToRefs(notificationPinia)

const currentPage = ref(0)
const open = ref(false)
const notificationInterval = ref()
const clearAllBtn = ref(false)

function mutationNotificationBox(mutationsList) {
  const childCount = mutationsList[0]?.target?.childElementCount
  if (childCount > 2) {
    clearAllBtn.value = true
  } else if (!childCount || childCount < 3) {
    clearAllBtn.value = false
  }
}

let observer = new MutationObserver(mutationNotificationBox);

function clearAllNotifications() {
  notification.destroy()
  clearAllBtn.value = false
  notificationTimeouts.value?.forEach(time => {
    clearTimeout(time)
  })
  notificationTimeouts.value = []
}

const openNotification = async () => {
  newNotifications.value.forEach((item, index) => {
    const timeOut = setTimeout(() => {
      notification.open({
        message: t('NOTIFICATIONS'),
        description: item.message,
        placement: 'topRight',
        duration: 10
      })
      if (!clearAllBtn.value) {
        const notificationBox = document.querySelector('.ant-notification div')
        if (notificationBox) {
          observer.observe(notificationBox, { childList: true });
        }
      }
    }, index * 1000)

    notificationTimeouts.value.push(timeOut)
  })
}
function checkNotifications() {
  notificationPinia.checkNotifications()
}
watch(newNotifications, () => {
  openNotification()
})
function getPegableNotifications(page) {
  notificationPinia.getNotifications(page)
  currentPage.value = page
}

onMounted(() => {
  checkNotifications()
  notificationPinia.getUnreadNotifications()
  notificationPinia.getNotifications(0)
  notificationInterval.value = setInterval(checkNotifications, 60000)
})

onBeforeUnmount(() => {
  clearInterval(notificationInterval.value)
  notificationPinia.clearAllNotifications()
  clearAllNotifications()
})
</script>

<template>
  <div>
    <template v-if="clearAllBtn">
      <teleport to=".ant-notification">
        <a-button @click="clearAllNotifications" shape="circle" class="clear-all__notifications btn">
          <IconClose />
        </a-button>
      </teleport>
    </template>
    <a-popover
        :title="$t('NOTIFICATIONS')"
        placement="bottomLeft"
        trigger="click"
        v-model:open="open"
    >
      <template #content>
        <div class="notification-content">
          <scrollbar-component
              height="calc(100vh - 200px)"
              :page="currentPage"
              :total-pages="totalPages"
              :loading="loadingUrl.has('get/all/notifications')"
              @get-data="getPegableNotifications"
          >
            <template #content>
              <template v-if="notifications.length">
                <notification-item
                    v-for="(item, index) in notifications"
                    :notification="item"
                    :key="index"
                    v-model:open="open"
                />
                <a-skeleton
                    :paragraph="{ rows: 2, width: '100%' }"
                    active
                    :loading="loadingUrl.has('get/all/notifications')"
                />
              </template>
              <template v-else>
                <div class="h-full flex align-center justify-center">
                  <a-empty :description="$t('NO_NOTIFICATIONS')" />
                </div>
              </template>
            </template>
          </scrollbar-component>
        </div>
      </template>
      <a-badge class="badge-count" :count="count">
        <a-button
            shape="circle"
            type="text"
            class="btn notification-btn text-2xl"
            @click="open = true"
        >
          <template #icon>
            <IconBell />
          </template>
        </a-button>
      </a-badge>
    </a-popover>
  </div>
</template>

<style scoped lang="scss">
.clear-all__notifications {
  position: absolute;
  top: 0;
  left: -40px;
}
.notification-content {
  min-width: 400px;
  max-width: 300px;
  min-height: 200px;

  &:deep(.ant-skeleton-title) {
    display: none !important;
  }
}
.badge-count {
  &:deep(.ant-badge-count) {
    background-color: #0020c2;
  }
}
</style>
