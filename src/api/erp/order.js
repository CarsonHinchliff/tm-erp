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

export function putOrder(id, data) {
  return request({
    url: '/api/sales/orders/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteOrder(id) {
    return request({
      url: '/api/sales/orders/' + id + '/',
      method: 'delete'
    })
}



export function fetchIssuedList(query) {
  return request({
    url: '/api/sales/orders/issued/',
    method: 'get',
    params: query
  })
}

export function getIssued(id) {
  return request({
    url: '/api/sales/orders/issued/' + id + '/',
    method: 'get'
  })
}

export function saveIssued(data) {
    return request({
      url: '/api/sales/orders/issued/',
      method: 'post',
      data
    })
}

export function putIssued(id, data) {
  return request({
    url: '/api/sales/orders/issued/' + id + '/',
    method: 'put',
    data
  })
}

export function deleteIsued(id) {
    return request({
      url: '/api/sales/orders/issued/' + id + '/',
      method: 'delete'
    })
}
  
