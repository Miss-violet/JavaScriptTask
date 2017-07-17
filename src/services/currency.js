import { request, config } from '../utils'
const { api } = config
const { currency } = api

const KEY_MAP = ['gender', 'brand_id', 'category_id', 'season_id']

const forceKeyNumber = (params) => {
  const toParams = { ...params }
  KEY_MAP.forEach(item => {
    if (params[item]) {
      toParams[item] = Number(params[item])
    }
  })
  return toParams
}

export async function queryList (params) {
  return request({
    url: currency.list,
    method: 'post',
    data: forceKeyNumber(params),
  })
}
