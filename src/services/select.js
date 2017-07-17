import { request, config } from '../utils'
const { api } = config
const { select } = api

export async function queryBrandList(params) {
  return request({
    url: select.brand,
    method: 'post',
    data: params,
  })
}

export async function queryPlatformList(params) {
  return request({
    url: select.platform,
    method: 'post',
    data: params,
  })
}

export async function queryWarehouseList(params) {
  return request({
    url: select.warehouse,
    method: 'post',
    data: params,
  })
}

export async function queryDimensionList(params) {
  return request({
    url: select.dimension,
    method: 'get',
    data: params,
  })
}
