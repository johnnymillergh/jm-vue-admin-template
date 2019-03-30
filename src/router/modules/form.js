import Layout from '@/views/layout/Layout'

const formRouter = {
  path: '/form',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: { title: 'Form', icon: 'form' }
    }
  ]
}

export default formRouter
