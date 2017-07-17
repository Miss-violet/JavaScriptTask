import { request, config } from '../utils'
const { api } = config
const { sku } = api

export async function queryList(params) {
  return request({
    url: sku.list,
    method: 'post',
    data: params,
  })
}

export async function queryPaging(params) {
  return request({
    url: sku.paging,
    method: 'post',
    data: params,
  })
}
