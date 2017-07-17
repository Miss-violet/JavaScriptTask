import { request, config } from '../utils'
const { api } = config
const { goodsinf } = api

export async function queryList(params) {
  return request({
    url: goodsinf,
    method: 'post',
    data: params,
  })
}

export async function queryLine(params) {
  return request({
    url: 'http://erp-qa.linesum.com/api/open',
    method: 'post',
    data: params
  })
}