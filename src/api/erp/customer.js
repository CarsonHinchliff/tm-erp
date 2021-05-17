import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sales/customers/',
    method: 'get',
    params: query
  })
}

export function getCustomer(id) {
  return request({
    url: '/api/sales/customers/' + id + '/',
    method: 'get'
  })
}

export function saveCustomer(data) {
    return request({
      url: '/api/sales/customers/',
      method: 'post',
      data
    })
}

export function putCustomer(id, data) {
  return request({
    url: '/api/sales/customers/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteCustomer(id) {
    return request({
      url: '/api/sales/customers/' + id + '/',
      method: 'delete'
    })
}
  
