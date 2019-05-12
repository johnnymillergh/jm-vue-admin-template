import Layout from '@/layout'

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
const exampleRouter = {
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'Example',
  meta: { title: 'Example', icon: 'example' },
  children: [
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/views/table/index'),
      meta: {
        title: 'Table',
        icon: 'table'
      }
    },
    {
      path: 'tree',
      name: 'Tree',
      component: () => import('@/views/tree/index'),
      meta: { title: 'Tree', icon: 'tree' }
    }
  ]
}

export default exampleRouter
