import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/pages/dashboard/DashboardView.vue'
import DashboardBoardView from '@/pages/dashboard/board/DashboardBoardView.vue'
import CRUDBoardView from '@/pages/dashboard/board/[id]/CRUDBoardView.vue'
import DashboardBoardListView from '@/pages/dashboard/board/DashboardBoardListView.vue'
import DashboardListView from '@/pages/dashboard/DashboardListView.vue'
import NotFound from '@/pages/_404.vue'
import DashboardUserListView from '@/pages/dashboard/user/DashboardUserListView.vue'
import DashboardUserView from '@/pages/dashboard/user/DashboardUserView.vue'
import DashboardUserEditView from '@/pages/dashboard/user/[id]/DashboardUserEditView.vue'
import DashboardSettingsView from '@/pages/dashboard/settings/DashboardSettingsView.vue'
import DashboardBoardFormView from '@/pages/dashboard/board/DashboardBoardFormView.vue'

const LoginView = () => import('@/pages/auth/AuthView.vue')

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginView',
      component: LoginView,
      children: []
    },
    {
      path: '/dashboard',
      name: 'DashboardView',
      component: DashboardView,
      redirect: '/dashboard/main',
      children: [
        {
          path: 'settings',
          name: 'DashboardSettingsView',
          component: DashboardSettingsView
        },
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
              name: 'UpdateBoardView',
              path: 'add/:id',
              component: CRUDBoardView
            },
            {
              name: 'AddBoardView',
              path: 'add',
              component: DashboardBoardFormView
            }
          ]
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
          path: '/:pathMatch(.*)*',
          component: NotFound,
          name: 'DashboardNotFond'
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
      name: 'MainNotFound'
    }
  ]
})

const routerFactory = (i18n) => {
  router.beforeEach((to, from, next) => {
    document.title = i18n.t(to.name)
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      if (to.name === 'LoginView') {
        return next({ name: 'DashboardView' })
      }
      return next()
    } else {
      if (to.name !== 'LoginView') {
        return next({ name: 'LoginView' })
      }
      next()
    }
  })
  return router
}

export default routerFactory
