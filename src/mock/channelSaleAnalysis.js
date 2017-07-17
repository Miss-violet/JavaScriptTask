const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { api } = config

let usersListData = Mock.mock({
  'data|80-100': [
    {
      id: () => Mock.Random.increment(),
      pattern: 'KH@integer(1,999999)',
      goods_name: '@cname',
      profit_loss: '@integer(1, 9999)',
      def_profit_loss: '@integer(1, 9999)',
      good_profit_loss: '@integer(1, 9999)',
      fin_profit_loss: '@integer(1, 9999)',
      fin_def_profit_loss: '@integer(1, 9999)',
      fin_good_profit_loss: '@integer(1, 9999)',
      wh_profit_loss: '@integer(1, 9999)',
      wh_def_profit_loss: '@integer(1, 9999)',
      allot_profit_loss: '@integer(1, 9999)',
      allot_def_profit_loss: '@integer(1, 9999)',
      allot_good_profit_loss: '@integer(1, 9999)',
      trans_def_profit_loss: '@integer(1, 9999)',
      trans_good_profit_loss: '@integer(1, 9999)',
      wh_good_profit_loss: '@integer(1, 9999)',
      brand_name: '@pick(["品牌1", "品牌2","品牌3"]',
      warehouse_name: '@pick(["仓库1", "仓库2","仓库3"]',
      logic_warehouse_type_id: '@integer(0, 3)'
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

  [`POST ${api.invoiceAnalysis.list}`](req, res) {
    let { pageSize, pageNumber, ...other } = req.body
    pageSize = pageSize || 20
    pageNumber = pageNumber || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
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

  [`POST ${api.invoiceAnalysis.uri}`](req, res) {
    const newData = req.body
    newData.id = Mock.Random.increment()
    newData.alias = Mock.mock('@cword(4)')
    newData.modifyTime = Date.now()
    newData.modifyUser = Mock.mock('@cname')

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${api.invoiceAnalysis.id}`](req, res) {
    const { id } = req.params
    const data = queryArray(database, Number(id), 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${api.invoiceAnalysis.id}`](req, res) {
    const { id } = req.params
    const data = queryArray(database, Number(id), 'id')
    if (data) {
      database = database.filter((item) => item.id !== Number(id))
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${api.invoiceAnalysis.id}`](req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false
    database = database.map((item) => {
      if (item.id === Number(id)) {
        isExist = true
        item.modifyTime = Date.now()
        item.modifyUser = Mock.mock('@cname')
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
