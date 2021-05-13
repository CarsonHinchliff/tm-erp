import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sales/customers/',
    method: 'get',
    params: query
  })
}
