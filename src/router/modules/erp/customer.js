import Layout from '@/views/layout/Layout'

const router = {
  path: '/customer',
  component: Layout,
  redirect: '/customer/index',
  name: 'Customer',
  meta: {
    title: 'Customer',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/erp/customer/index'),
      name: 'Customer',
      meta: { title: 'Customer' }
    }
  ]
}
export default router
