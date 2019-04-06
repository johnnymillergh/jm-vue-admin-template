import Layout from '@/views/layout/Layout'

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
 * @type {Object}
 */
const systemControlsRouter = {
  path: '/system-controls',
  component: Layout,
  name: 'System Controls',
  meta: {
    title: 'System Controls',
    icon: 'repairing'
  },
  children: [
    {
      path: 'security-and-permission',
      name: 'SecurityAndPermission',
      component: () => import('@/views/system-controls/general/security-and-permission'),
      meta: {
        title: 'Security & Permission',
        keepAlive: true
      }
    },
    {
      path: 'users-and-groups',
      name: 'UsersAndGroups',
      component: () => import('@/views/system-controls/general/security-and-permission'),
      meta: {
        title: 'Security & Permission',
        keepAlive: true
      }
    }
  ]
}

export default systemControlsRouter
