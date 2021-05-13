import Layout from '@/views/layout/Layout'

const router = {
  path: '/customer',
  component: Layout,
  redirect: 'noredirect',
  name: 'Customer',
  meta: {
    title: 'CustomerManagement',
    icon: 'table'
  },
  alwaysShow: true,
  children: [
    {
      path: 'index',
      component: () => import('@/views/erp/customer/index'),
      name: 'Customer',
      meta: { title: 'CustomerList' }   
    }
  ]
}
export default router
