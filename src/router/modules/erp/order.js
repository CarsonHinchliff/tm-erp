import Layout from '@/views/layout/Layout'

const router = {
  path: '/order',
  component: Layout,
  redirect: '/order/index',
  name: 'Order',
  meta: {
    title: 'Order',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/erp/order/index'),
      name: 'Order',
      meta: { title: 'Order' }
    }
  ]
}
export default router
