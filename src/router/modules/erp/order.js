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
      meta: { title: 'OrderList', icon: 'table'}
    },
    {
      path: 'issued',
      component: () => import('@/views/erp/order/issued/index'),
      name: 'Issued',
      meta: { title: 'IssuedList', icon: 'table'}
    }
  ]
}
export default router
