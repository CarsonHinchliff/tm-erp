import Layout from '@/views/layout/Layout'

const router = {
  path: '/order',
  component: Layout,
  redirect: '/order/index',
  name: 'Order',
  meta: {
    title: 'OrderManagement',
    icon: 'table'
  },
  alwaysShow: true,
  children: [
    {
      path: 'index',
      component: () => import('@/views/erp/order/index'),
      name: 'Order',
      meta: { title: 'OrderList' }
    }
  ]
}
export default router
