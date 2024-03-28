import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/pages/dashboard/DashboardView.vue'
import DashboardBoardView from '@/pages/dashboard/board/DashboardBoardView.vue'
import DashboardBoardListView from '@/pages/dashboard/board/DashboardBoardListView.vue'
import DashboardListView from '@/pages/dashboard/DashboardListView.vue'
import NotFound from '@/pages/_404.vue'
import ServerError from '@/pages/_500.vue'
import DashboardUserListView from '@/pages/dashboard/user/DashboardUserListView.vue'
import DashboardUserView from '@/pages/dashboard/user/DashboardUserView.vue'
import DashboardUserEditView from '@/pages/dashboard/user/[id]/DashboardUserEditView.vue'
import DashboardSettingsView from '@/pages/dashboard/settings/DashboardSettingsView.vue'
import DashboardBoardFormView from '@/pages/dashboard/board/DashboardBoardFormView.vue'
import BoardConfigurationsView from '@/pages/dashboard/board/[id]/configurations/BoardConfigurationsView.vue'
import DashboardBoardItemView from '@/pages/dashboard/board/[id]/DashboardBoardItemView.vue'
import DashboardPostListView from '@/pages/dashboard/post/DashboardPostListView.vue'
import DashboardPostView from '@/pages/dashboard/post/DashboardPostView.vue'
import DashboardPostFormView from '@/pages/dashboard/post/DashboardPostFormView.vue'
import DashboardKioskBoardView from '@/pages/dashboard/kiosk-board/DashboardKioskBoardView.vue'
import DashboardKioskBoardListView from '@/pages/dashboard/kiosk-board/DashboardKioskBoardListView.vue'
import DashboardPaymentListView from '@/pages/dashboard/payment/DashboardPaymentListView.vue'
import DashboardPaymentView from '@/pages/dashboard/payment/DashboardPaymentView.vue'
import DashboardOrderView from '@/pages/dashboard/order/DashboardOrderView.vue'
import DashboardOrderListView from '@/pages/dashboard/order/DashboardOrderListView.vue'

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
      path: '/dashboard/:role',
      name: 'DashboardView',
      component: DashboardView,
      redirect: `/dashboard/ads/main`,
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
              path: 'item/:id',
              name: 'DashboardBoardItemView',
              component: DashboardBoardItemView,
              children: [
                {
                  path: 'configurations',
                  name: 'BoardConfigurationsView',
                  component: BoardConfigurationsView
                }
              ]
            },
            {
              name: 'AddBoardView',
              path: 'add',
              component: DashboardBoardFormView
            },
            {
              path: 'edit/:id',
              name: 'EditBoardView',
              component: DashboardBoardFormView
            }
          ]
        },
        {
          path: 'kiosk-board',
          name: 'DashboardKioskBoardView',
          component: DashboardKioskBoardView,
          children: [
            {
              path: '',
              name: 'DashboardKioskBoardListView',
              component: DashboardKioskBoardListView
            },
            {
              path: 'create',
              name: 'DashboardPostFormView',
              component: DashboardPostFormView
            }
          ]
        },
        {
          path: 'post',
          name: 'DashboardPostView',
          component: DashboardPostView,
          children: [
            {
              path: '',
              name: 'DashboardPostListView',
              component: DashboardPostListView
            },
            {
              path: 'create',
              name: 'DashboardPostFormView',
              component: DashboardPostFormView
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
        },
        {
          path: 'user',
          name: 'DashboardUserView',
          component: DashboardUserView,
          children: [
            {
              path: '',
              name: 'DashboardUserListView',
              component: DashboardUserListView
            },
            {
              path: 'edit/:id',
              name: 'DashboardUserEditView',
              component: DashboardUserEditView
            }
          ]
        },
        {
          path: '/:role/:pathMatch(.*)*',
          component: NotFound,
          name: 'DashboardNotFond'
        }
      ]
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
        return next({ name: 'DashboardView', params: { role: 'ads' } })
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
