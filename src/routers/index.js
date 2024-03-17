import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/pages/dashboard/DashboardView.vue'
import DashboardBoardView from '@/pages/dashboard/board/DashboardBoardView.vue'
import DashboardBoardListView from '@/pages/dashboard/board/DashboardBoardListView.vue'
import DashboardListView from '@/pages/dashboard/DashboardListView.vue'
import NotFound from '@/pages/_404.vue'
import DashboardUserListView from '@/pages/dashboard/user/DashboardUserListView.vue'
import DashboardUserView from '@/pages/dashboard/user/DashboardUserView.vue'
import DashboardUserEditView from '@/pages/dashboard/user/[id]/DashboardUserEditView.vue'
import DashboardSettingsView from '@/pages/dashboard/settings/DashboardSettingsView.vue'
import DashboardBoardFormView from '@/pages/dashboard/board/DashboardBoardFormView.vue'
import BoardConfigurationsView from '@/pages/dashboard/board/[id]/configurations/BoardConfigurationsView.vue'
import DashboardBoardItemView from '@/pages/dashboard/board/[id]/DashboardBoardItemView.vue'
import AuthView from '@/pages/auth/AuthView.vue'
import DashboardPostListView from '@/pages/dashboard/post/DashboardPostListView.vue'
import DashboardPostView from '@/pages/dashboard/post/DashboardPostView.vue'
import DashboardPostFormView from '@/pages/dashboard/post/DashboardPostFormView.vue'

const LoginView = () => import('@/pages/auth/AuthView.vue')

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
            // {
            //   path: 'item/:id',
            //   name: 'DashboardBoardItemView',
            //   component: DashboardBoardItemView,
            //   children: [
            //     {
            //       path: 'configurations',
            //       name: 'BoardConfigurationsView',
            //       component: BoardConfigurationsView
            //     }
            //   ]
            // },
            // {
            //   name: 'AddBoardView',
            //   path: 'add',
            //   component: DashboardBoardFormView
            // }
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
      if (to.path.includes('dashboard')) {
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
