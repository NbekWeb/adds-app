import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/pages/dashboard/DashboardView.vue'
import DashboardBoardView from '@/pages/dashboard/board/DashboardBoardView.vue'
import CRUDBoardView from '@/pages/dashboard/board/[id]/CRUDBoardView.vue'
import DashboardBoardListView from '@/pages/dashboard/board/DashboardBoardListView.vue'
import DashboardListView from '@/pages/dashboard/DashboardListView.vue'
import NotFound from '@/pages/_404.vue'

const LoginView = () => import('@/pages/login/LoginView.vue')

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
              component: CRUDBoardView
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
