import Layout from '@/views/layout/Layout'

const systemControlsRouter = {
  path: '/system-controls',
  component: Layout,
  name: 'System Controls',
  meta: { title: 'System Controls', icon: 'example' },
  children: [
    {
      path: 'security-and-permission',
      name: 'Security and Permission',
      component: () => import('@/views/system-controls/general/security-and-permission'),
      meta: {
        title: 'Security & Permission',
        icon: 'table'
      }
    },
    {
      path: 'security-and-permission2',
      name: 'Security & Permission2',
      component: () => import('@/views/system-controls/general/security-and-permission'),
      meta: {
        title: 'Security & Permission',
        icon: 'table'
      }
    }
  ]
}

export default systemControlsRouter
