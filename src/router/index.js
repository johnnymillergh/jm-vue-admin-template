import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'
import systemControlsRouter from './modules/system-controls'
import componentDemoRouter from './modules/component-demo'

Vue.use(Router)

/**
 * constantRouterMap is a base page that does not have permission requirements. All roles can be accessed.
 * Note: sub-menu only appear when route children.length >= 1.
 *
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
        title: generateDashboardTitle(),
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
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: false }
      }
    ]
  }
]

/**
 * Generate dashboard title with environment tag when the environment is not production.
 * @return {string} dashboard title
 */
function generateDashboardTitle () {
  const dashboardTitle = 'Dashboard'
  return process.env.VUE_APP_ENV !== 'prod' ? dashboardTitle.concat(' (', process.env.VUE_APP_ENV, ')') : dashboardTitle
}

export default new Router({
  // mode: 'history',
  // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  systemControlsRouter,
  componentDemoRouter,
  // New router table should be added above: { path: '*', redirect: '/404', hidden: true }
  { path: '*', redirect: '/404', hidden: true }
]
