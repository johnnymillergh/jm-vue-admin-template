import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import nestedRouter from './modules/nested'
import formRouter from './modules/form'
import exampleRouter from './modules/example'
import systemControlsRouter from './modules/system-controls'

Vue.use(Router)

// In development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slowly.
// Only enable lazy-loading in production environment.
// Detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

/**
 * ELEMENT DESCRIPTION
 *
 * hidden: true                If hidden:true will not show in the sidebar (default is false).
 * alwaysShow: true            If true, will always show the root menu, whatever its child routes length.
 *                             If not set alwaysShow, only more than one route under the children.
 *                             It will becomes nested mode, otherwise not show the root menu.
 * redirect: `noredirect`      If `redirect:noredirect` will no redirect in the breadcrumb.
 * name: `ComponentName`       The name is used by <keep-alive> and equal to the name defined in component (required).
 * meta : {                    The meta data is some data descried function.
 *   title: `title`            The title name show in subMenu and breadcrumb (recommended to set).
 *   icon: `svg-name`          The icon show in the sidebar.
 *   noCache: true             If true, the page will no be cached (default is false.
 *   breadcrumb: false         If false, the item will hidden in breadcrumb (default is true).
 *   affix: true               If true, the tag will affix in the tags-view.
 * }
 *
 * @type {Array}
 */
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },

  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/join', component: () => import('@/views/join/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: 'Dashboard',
        icon: 'dashboard',
        noCache: true,
        affix: true
      }
    }]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/johnnymillergh/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history',
  // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  systemControlsRouter,
  formRouter,
  nestedRouter,
  exampleRouter,
  // New router table should be added above: { path: '*', redirect: '/404', hidden: true }
  { path: '*', redirect: '/404', hidden: true }
]
