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
import DashboardOrderView from '@/pages/dashboard/order/telegram-order/DashboardOrderView.vue'
import DashboardOrderListView from '@/pages/dashboard/order/telegram-order/DashboardOrderListView.vue'
import DashboardBoardItemInfoView from '@/pages/dashboard/board/[id]/DashboardBoardItemInfoView.vue'
import DashboardOrderFormView from '@/pages/dashboard/order/telegram-order/DashboardOrderFormView.vue'
import BoardConfigurationsView from '@/pages/dashboard/board/[id]/configurations/BoardConfigurationsView.vue'
import DashboardPostFormView from '@/pages/dashboard/post/DashboardPostFormView.vue'
import DashboardPostItemView from '@/pages/dashboard/post/DashboardPostItemView.vue'
import DashboardOrderItemView from '@/pages/dashboard/order/telegram-order/[id]/DashboardOrderView.vue'
import DashboardKioskBoardItemView from '@/pages/dashboard/kiosk-board/[id]/DashboardKioskBoardItemView.vue'
import DashboardKioskPostView from '@/pages/dashboard/kiosk-post/DashboardKioskPostView.vue'
import DashboardKioskPostListView from '@/pages/dashboard/kiosk-post/DashboardKioskPostListView.vue'
import DashboardKioskPostFormView from '@/pages/dashboard/kiosk-post/DashboardKioskPostFormView.vue'
import DashboardKioskPostItemView from '@/pages/dashboard/kiosk-post/DashboardKioskPostItemView.vue'
import DashboardKioskOrderView from '@/pages/dashboard/order/kiosk-order/DashboardKioskOrderView.vue'
import DashboardKioskOrderListView from '@/pages/dashboard/order/kiosk-order/DashboardKioskOrderListView.vue'
import DashboardKioskOrderFormView from '@/pages/dashboard/order/kiosk-order/DashboardKioskOrderFormView.vue'
import DashboardKioskOrderItemView from '@/pages/dashboard/order/kiosk-order/[id]/DashboardOrderView.vue'

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
              name: 'DashboardPostCreateFormView',
              component: DashboardPostFormView
            },
            {
              path: 'edit/:id',
              name: 'DashboardPostEditFormView',
              component: DashboardPostFormView
            },
            {
              path: 'item/:id',
              name: 'DashboardPostItemView',
              component: DashboardPostItemView
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
              name: 'DashboardOrderFormView',
              component: DashboardOrderFormView
            },
            {
              path: 'item/:id',
              name: 'DashboardOrderItemView',
              component: DashboardOrderItemView
            }
          ]
        },
        {
          path: 'kiosk-order',
          name: 'DashboardKioskOrderView',
          component: DashboardKioskOrderView,
          children: [
            {
              path: '',
              name: 'DashboardKioskOrderListView',
              component: DashboardKioskOrderListView
            },
            {
              path: 'create/:postId',
              name: 'DashboardKioskOrderFormView',
              component: DashboardKioskOrderFormView
            },
            {
              path: 'item/:id',
              name: 'DashboardKioskOrderItemView',
              component: DashboardKioskOrderItemView
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
