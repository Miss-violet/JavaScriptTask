const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { api } = config
var Random = Mock.Random

let usersListData = Mock.mock({
  'sizeData|20': [
    {
      'id|+1': 1,
      size: '@integer(36, 42)',
      inventory_proportion: '@float(0, 9, 2, 2)',
      finance_inventory_quantity: '@integer(1000, 9999)',
      recommend_proportion: '@integer(0, 10)',
      sold_num: '@integer(20, 99)'
    }
  ],
  'colorData|20': [
    {
      'id|+1': 1,
      color: '@pick(["红", "绿", "蓝"])',
      inventory_proportion: '@float(0, 9, 2, 2)',
      finance_inventory_quantity: '@integer(1000, 9999)',
      recommend_proportion: '@integer(0, 10)',
      sold_num: '@integer(20, 99)'
    }
  ]
})


let { sizeData, colorData } = usersListData

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {


  [`POST ${api.goodsinf}`](req, res) {
    let filter = req.body
    let newData
    if ({}.hasOwnProperty.call(filter, 'uri')) {
      if (filter.uri === 'dm_csr_goods_color_reorder') {
        newData = colorData
      } else if (filter.uri === 'dm_csr_goods_size_reorder') {
        newData = sizeData
      }
    }

    res.status(200).json({
      data: newData
    })
  }
}