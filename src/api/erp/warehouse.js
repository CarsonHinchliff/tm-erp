import request from '@/utils/request'

export function fetchIncomeList(query) {
  return request({
    url: '/api/warehouse/income/',
    method: 'get',
    params: query
  })
}
export function getIncome(id) {
  return request({
    url: '/api/warehouse/income/' + id + '/',
    method: 'get'
  })
}

export function saveIncome(data) {
    return request({
      url: '/api/warehouse/income/',
      method: 'post',
      data
    })
}

export function deleteIncome(id) {
    return request({
      url: '/api/warehouse/income/' + id + '/',
      method: 'delete'
    })
}

export function fetchInventoryList(query) {
  return request({
    url: '/api/warehouse/inventory/',
    method: 'get',
    params: query
  })
}

export function getInventory(id) {
  return request({
    url: '/api/warehouse/inventory/' + id + '/',
    method: 'get'
  })
}


export function saveInventory(data) {
    return request({
      url: '/api/warehouse/inventory/',
      method: 'post',
      data
    })
}

export function deleteInventory(id) {
    return request({
      url: '/api/warehouse/inventory/' + id + '/',
      method: 'delete'
    })
}
  
