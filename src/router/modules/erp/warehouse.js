import Layout from '@/views/layout/Layout'

const router = {
  path: '/warehouse',
  component: Layout,
  redirect: 'noredirect',
  name: 'Warehouse',
  meta: {
    title: 'WarehouseManagement',
    icon: 'table'
  },
  alwaysShow: true,
  children: [
    // {
    //   path: 'index',
    //   component: () => import('@/views/erp/warehouse/index'),
    //   name: 'Warehouse',
    //   meta: { title: 'WarehouseList', icon: 'table' }   
    // },
    {
        path: 'income',
        component: () => import('@/views/erp/warehouse/income/index'),
        name: 'WarehouseIncome',
        meta: { title: 'WarehouseIncome', icon: 'table' }   
    },
    {
        path: 'inventory',
        component: () => import('@/views/erp/warehouse/inventory/index'),
        name: 'WarehouseInventory',
        meta: { title: 'WarehouseInventory', icon: 'table' }   
    }
  ]
}
export default router
