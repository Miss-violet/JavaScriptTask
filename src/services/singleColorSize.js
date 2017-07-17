import { request, config } from '../utils'
const { api } = config
const { goodsinf } = api

export async function queryList (params) {
  return request({
    url: goodsinf,
    method: 'post',
    data: params,
  })
}
