import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sales/customers/',
    method: 'get',
    params: query
  })
}

export function saveCustomer(data) {
    return request({
      url: '/api/sales/customers/',
      method: 'post',
      data
    })
}

export function deleteCustomer(id) {
    return request({
      url: '/api/sales/customers/' + id + '/',
      method: 'delete'
    })
}
  
