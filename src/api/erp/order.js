import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/sales/orders/',
    method: 'get',
    params: query
  })
}

export function getOrder(id) {
  return request({
    url: '/api/sales/orders/' + id + '/',
    method: 'get'
  })
}

export function saveOrder(data) {
    return request({
      url: '/api/sales/orders/',
      method: 'post',
      data
    })
}

export function deleteOrder(id) {
    return request({
      url: '/api/sales/orders/' + id + '/',
      method: 'delete'
    })
}
  
