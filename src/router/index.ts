import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import Page404Layout from '../layouts/Page404Layout.vue'

import RouteViewComponent from '../layouts/RouterBypass.vue'
import UIRoute from '../pages/admin/ui/route'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'login' },
  },
  {
    name: 'admin',
    path: '/admin',
    component: AppLayout,
    children: [
      {
        name: 'property',
        path: 'property',
        component: RouteViewComponent,
        children: [
          {
            name: 'buildings',
            path: 'buildings',
            component: () => import('../pages/admin/property-management/buildings/BuildingsPage.vue'),
          },
          {
            name: 'floors',
            path: '/:buildingId/floors',
            component: () => import('../pages/admin/property-management/floors/FloorsPage.vue'),
          },
          {
            name: 'manage-buildings',
            path: 'manage-buildings',
            component: () => import('../pages/admin/property-management/manage-buildings/ManageBuildingsPage.vue'),
          },
          {
            name: 'units',
            path: '/:buildingId/floors/:floorId/units',
            component: () => import('../pages/admin/property-management/units/UnitsPage.vue'),
          },
          {
            name: 'add-units',
            path: '/:buildingId/floors/:floorId/add-units',
            component: () => import('../pages/admin/property-management/add-units/AddUnitsPage.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Maps',
            },
          },
        ],
      },
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('../pages/admin/dashboard/Dashboard.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('../pages/auth/login/Login.vue'),
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('../pages/auth/signup/Signup.vue'),
      },
      {
        name: 'recover-password',
        path: 'recover-password',
        component: () => import('../pages/auth/recover-password/RecoverPassword.vue'),
      },
      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
