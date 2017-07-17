import { request, config } from '../utils'
const { api } = config
const { queryData } = api

export async function queryList(params) {
  return request({
    url: queryData.noPaging,
    method: 'post',
    data: params,
  })
}

export async function queryPagingList(params) {
  return request({
    url: queryData.paging,
    method: 'post',
    data: params,
  })
}