import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/pages/dashboard/DashboardView.vue'
import DashboardBoardView from '@/pages/dashboard/board/DashboardBoardView.vue'
import DashboardBoardListView from '@/pages/dashboard/board/DashboardBoardListView.vue'
import DashboardListView from '@/pages/dashboard/DashboardListView.vue'
import NotFound from '@/pages/_404.vue'
import ServerError from '@/pages/_500.vue'

import DashboardSettingsView from '@/pages/dashboard/settings/DashboardSettingsView.vue'

import DashboardBoardItemView from '@/pages/dashboard/board/[id]/DashboardBoardItemView.vue'
import DashboardPostListView from '@/pages/dashboard/post/DashboardPostListView.vue'
import DashboardPostView from '@/pages/dashboard/post/DashboardPostView.vue'
import DashboardKioskBoardView from '@/pages/dashboard/kiosk-board/DashboardKioskBoardView.vue'
import DashboardKioskBoardListView from '@/pages/dashboard/kiosk-board/DashboardKioskBoardListView.vue'
import DashboardPaymentListView from '@/pages/dashboard/payment/DashboardPaymentListView.vue'
import DashboardPaymentView from '@/pages/dashboard/payment/DashboardPaymentView.vue'
import DashboardOrderView from '@/pages/dashboard/order/DashboardOrderView.vue'
import DashboardOrderListView from '@/pages/dashboard/order/DashboardOrderListView.vue'
import TelegramOrderView from '@/pages/dashboard/order/telegram/TelegramOrderView.vue'
import KioskOrderView from '@/pages/dashboard/order/kiosk/components/KioskOrderView.vue'
import DashboardBoardItemInfoView from '@/pages/dashboard/board/[id]/DashboardBoardItemInfoView.vue'
import TelegramPostEditView from '@/pages/dashboard/post/telegram/DashboardPostFormView.vue'
import KioskPostEditView from '@/pages/dashboard/post/kiosk/DashboardPostFormView.vue'
import BoardConfigurationsView from '@/pages/dashboard/board/[id]/configurations/BoardConfigurationsView.vue'
import TelegramPostItemView from '@/pages/dashboard/post/telegram/DashboardPostItemView.vue'
import KioskPostItemView from '@/pages/dashboard/post/kiosk/DashboardPostItemView.vue'
import TelegramOrderItemView from '@/pages/dashboard/order/telegram/[id]/DashboardOrderView.vue'
import KioskOrderItemView from '@/pages/dashboard/order/kiosk/[id]/DashboardOrderView.vue'
import DashboardKioskBoardItemView from '@/pages/dashboard/kiosk-board/[id]/DashboardKioskBoardItemView.vue'
import DashboardKioskPostView from '@/pages/dashboard/kiosk-post/DashboardKioskPostView.vue'
import DashboardKioskPostListView from '@/pages/dashboard/kiosk-post/DashboardKioskPostListView.vue'
import DashboardKioskPostFormView from '@/pages/dashboard/kiosk-post/DashboardKioskPostFormView.vue'
import DashboardKioskPostItemView from '@/pages/dashboard/kiosk-post/DashboardKioskPostItemView.vue'
import KioskBoardOrderComponent from "@/pages/dashboard/kiosk-board/[id]/KioskBoardOrderComponent.vue";

const AuthView = () => import('@/pages/auth/AuthView.vue')

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AuthView',
      component: AuthView
    },
    {
      path: '/dashboard',
      name: 'DashboardView',
      component: DashboardView,
      redirect: `/dashboard/main`,
      children: [
        {
          path: 'main',
          name: 'DashboardListView',
          component: DashboardListView
        },
        {
          path: 'board',
          name: 'DashboardBoardView',
          component: DashboardBoardView,
          children: [
            {
              path: '',
              name: 'DashboardBoardListView',
              component: DashboardBoardListView
            },

            {
              path: 'item',
              name: 'DashboardBoardItemView',
              component: DashboardBoardItemView,
              children: [
                {
                  path: 'info/:id',
                  name: 'DashboardBoardItemInfoView',
                  component: DashboardBoardItemInfoView
                },
                {
                  path: 'configurations/:id',
                  name: 'BoardConfigurationsView',
                  component: BoardConfigurationsView
                }
              ]
            }
          ]
        },

        {
          path: 'kiosk-board',
          name: 'DashboardKioskBoardView',
          component: DashboardKioskBoardView,
          redirect: { name: 'DashboardKioskBoardListView' },
          children: [
            {
              path: '',
              name: 'DashboardKioskBoardListView',
              component: DashboardKioskBoardListView
            },
            {
              path: 'item/:id',
              name: 'DashboardKioskBoardItemView',
              component: DashboardKioskBoardItemView
            },
            {
              path: 'order/:id',
              name: 'KioskBoardOrderComponent',
              component: KioskBoardOrderComponent
            }
          ]
        },

        {
          path: 'post',
          name: 'DashboardPostView',
          component: DashboardPostView,
          redirect: { name: 'DashboardPostListView' },
          children: [
            {
              path: '',
              name: 'DashboardPostListView',
              component: DashboardPostListView
            },
            {
              path: 'create',
              name: 'TelegramPostCreateView',
              component: TelegramPostEditView
            },
            {
              path: 'kiosk-create',
              name: 'KioskPostCreateView',
              component: KioskPostEditView
            },
            {
              path: 'edit/:id',
              name: 'TelegramPostEditView',
              component: TelegramPostEditView
            },
            {
              path: 'kiosk-edit/:id',
              name: 'KioskPostEditView',
              component: KioskPostEditView
            },
            {
              path: 'item/:id',
              name: 'TelegramPostItemView',
              component: TelegramPostItemView
            },
            {
              path: 'kiosk-item/:id',
              name: 'KioskPostItemView',
              component: KioskPostItemView
            }
          ]
        },
        {
          path: 'kiosk-post',
          name: 'DashboardKioskPostView',
          component: DashboardKioskPostView,
          children: [
            {
              path: '',
              name: 'DashboardKioskPostListView',
              component: DashboardKioskPostListView
            },
            {
              path: 'create',
              name: 'DashboardKioskPostCreateFormView',
              component: DashboardKioskPostFormView
            },
            {
              path: 'edit/:id',
              name: 'DashboardKioskPostEditFormView',
              component: DashboardKioskPostFormView
            },
            {
              path: 'item/:id',
              name: 'DashboardKioskPostItemView',
              component: DashboardKioskPostItemView
            }
          ]
        },
        {
          path: 'order',
          name: 'DashboardOrderView',
          component: DashboardOrderView,
          children: [
            {
              path: '',
              name: 'DashboardOrderListView',
              component: DashboardOrderListView
            },
            {
              path: 'create/:postId',
              name: 'TelegramOrderView',
              component: TelegramOrderView
            },
            {
              path: 'kiosk-create/:postId',
              name: 'KioskOrderView',
              component: KioskOrderView
            },
            {
              path: 'item/:id',
              name: 'TelegramOrderItemView',
              component: TelegramOrderItemView
            },
            {
              path: 'kiosk-item/:id',
              name: 'KioskOrderItemView',
              component: KioskOrderItemView
            }
          ]
        },
        {
          path: 'payment',
          name: 'DashboardPaymentView',
          component: DashboardPaymentView,
          children: [
            {
              path: '',
              name: 'DashboardPaymentListView',
              component: DashboardPaymentListView
            }
          ]
        },

        {
          path: 'settings',
          name: 'DashboardSettingsView',
          component: DashboardSettingsView
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
      name: 'DashboardNotFond'
    },
    {
      path: '/500',
      component: ServerError,
      name: 'ServerError'
    }
  ]
})

const routerFactory = (i18n) => {
  router.beforeEach((to, from, next) => {
    document.title = i18n.t(to.name)
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      if (to.path.includes('dashboard')) {
        return next()
      } else if (to.name === 'ServerError') {
        return next()
      } else {
        return next({ name: 'DashboardView' })
      }
    } else {
      if (!to.path.includes('dashboard')) {
        return next()
      } else {
        return next({ name: 'AuthView' })
      }
    }
  })
  return router
}

export default routerFactory
