import { request, config } from '../utils'
const { api } = config
const { product } = api

const KEY_MAP = ['id',
  'pageNumber',
  'pageSize',
  'daysCount',
  'redemptionType',
  'productTypeId',
  'status',
  'enableTimeBegin',
  'enableTimeEnd'
]



const forceKeyNumber = (params) => {
  let toParams = { ...params }
  KEY_MAP.forEach(item => {
    if (params[item]) {
      toParams[item] = Number(params[item])
    }
  })
  return toParams;
}

export async function query(params) {
  return request({
    url: product.id,
    method: 'get',
    data: forceKeyNumber(params),
  })
}

export async function create(params) {
  return request({
    url: product.uri,
    method: 'post',
    data: forceKeyNumber(params),
  })
}

export async function remove(params) {
  return request({
    url: product.id,
    method: 'delete',
    data: forceKeyNumber(params),
  })
}

export async function update(params) {
  return request({
    url: product.id,
    method: 'patch',
    data: forceKeyNumber(params),
  })
}

export async function updateStatus(params) {
  return request({
    url: product.status,
    method: 'patch',
    data: forceKeyNumber(params),
  })
}

export async function queryList(params) {

  return request({
    url: product.list,
    method: 'post',
    data: forceKeyNumber(params),
  })
}
