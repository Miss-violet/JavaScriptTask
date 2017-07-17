const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { api } = config

let usersListData = Mock.mock({
  'data|80-100': [
    {
      id: () => Mock.Random.increment(),
      "brand_name": () => Mock.Random.pick('耐克', '特步', '匹克', '鸿星尔克', '安踏'),
      "sku_code": "HHY@integer(1000,9999)",
      "goods_name": () => Mock.Random.pick('耐克', '特步', '匹克', '鸿星尔克', '安踏'),
      "pattern": '@integer(10000,99999)',
      "color": () => Mock.Random.pick('红', '白', '绿', '黄', '黑'),
      "size": () => Mock.Random.pick(40, 41, 42, 37, 38),
      "fin_good_profit_loss": '@integer(1000,9999)',
      "fin_def_profit_loss": '@integer(1000,9999)',
      "fin_profit_loss": '@integer(1000,9999)',
      "wh_good_profit_loss": '@integer(1000,9999)',
      "wh_def_profit_loss": '@integer(1000,9999)',
      "wh_profit_loss": '@integer(1000,9999)',
      "trans_good_profit_loss": '@integer(1000,9999)',
      "trans_def_profit_loss": '@integer(1000,9999)',
      "allot_good_profit_loss": '@integer(1000,9999)',
      "allot_def_profit_loss": '@integer(1000,9999)',
      "allot_profit_loss": '@integer(1000,9999)',
      "good_profit_loss": '@integer(1000,9999)',
      "def_profit_loss": '@integer(1000,9999)',
      "profit_loss": '@integer(1000,9999)',
      'brand_id': '@integer(1,20)',
      'logic_warehouse_id': '@integer(1,20)',
      'lw_type': '@integer(1,20)'
    },
  ],
})


let database = usersListData.data

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

  [`POST ${api.warehouse.list}`](req, res) {
    let { pageSize, pageNumber, ...other } = req.body
    pageSize = pageSize || 20
    pageNumber = pageNumber || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'brand_id' && other[key]) {
              let ids = other[key].split(',')
              let flag = false
              ids.forEach((id) => {
                if (item[key] === Number(id)) {
                  flag = true
                }
              })
              return flag
            }
            if (key === 'logic_warehouse_id' && other[key]) {
              let ids = other[key].split(',')
              let flag = false
              ids.forEach((id) => {
                if (item[key] === Number(id)) {
                  flag = true
                }
              })
              return flag
            }
            if (key === 'lw_type' && other[key]) {
              let ids = other[key].split(',')
              let flag = false
              ids.forEach((id) => {
                if (item[key] === Number(id)) {
                  flag = true
                }
              })
              return flag
            }
            if (key === 'good_name' && other[key]) {
              return item[key] === other[key]
            }
            if (key === 'seller_code' && other[key]) {
              return item[key] === other[key]
            }
            if (key === 'pattern' && other[key]) {
              return item[key] === Number(other[key])
            }
            if (key === 'sku_code' && other[key]) {
              return item[key] === other[key]
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
      total: newData.length,
    })
  },

  [`POST ${api.warehouse.uri}`](req, res) {
    const newData = req.body
    newData.id = Mock.Random.increment()
    newData.modifyTime = Date.now()
    newData.modifyUser = Mock.mock('@cname')
    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${api.warehouse.id}`](req, res) {
    const { id } = req.params
    const data = queryArray(database, Number(id), 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${api.warehouse.id}`](req, res) {
    const { id } = req.params
    const data = queryArray(database, Number(id), 'id')
    if (data) {
      database = database.filter((item) => item.id !== Number(id))
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${api.warehouse.id}`](req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      if (item.id === Number(id)) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
