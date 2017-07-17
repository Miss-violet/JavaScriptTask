const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { api } = config
var Random = Mock.Random


let usersListData = Mock.mock({
  'data|80-100': [
    {
      'id': () => Mock.Random.increment(),
      'productTypeName': '@cword(2)',
      'productTypeId|+1': 1,
      code: 'DC@integer(1,100)',
      name: '@cword(4)',
      'capitalOccupyFeeRateMin|0-50.2': 0,
      'capitalOccupyFeeRateMax|51-100.2': 0,
      'agentFeeRateMin|0-50.2': 0,
      'agentFeeRateMax|51-100.2': 0,
      redemptionType: '@integer(0,1)',
      'borrowingDaysMin|0-50': 0,
      'borrowingDaysMax|51-100': 0,
      modifyUser: '@cname',
      modifyTime: '@integer(1490000000000, 1493999999999)',
      enableUser: '@cname',
      enableTime: '@integer(1490000000000, 1493999999999)',
      isModify: '@boolean',
      status: '@integer(0,2)',
      remark: '@cword(100)',
      'interestCountFirstDays|0-50': 0,
      'interestActualCountDays|0-50': 0,
      'overdueFeeRateMin|0-50.2': 0,
      'overdueFeeRateMax|51-100.2': 0,
      'marginFeePayRateMin|0-50.2': 0,
      'marginFeePayRateMax|51-100.2': 0,
      'pledgeRateMin|0-50.2': 0,
      'pledgeRateMax|51-100.2': 0,
      daysCount: '@integer(0,2)',
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

  [`POST ${api.product.list}`](req, res) {
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

  [`PATCH ${api.product.status}`](req, res) {
    let { status } = req.body
    let { id } = req.params

    const data = queryArray(database, Number(id), 'id')
    if (data) {
      data.status = status
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }

  },

  [`POST ${api.product.uri}`](req, res) {
    const newData = req.body
    newData.id = Mock.Random.increment()

    newData.modifyUser = Mock.mock('@cname')
    newData.modifyTime = new Date().getTime()//Mock.mock('@now')
    newData.productType = Mock.mock('test-@cword(3)')
    newData.enableTime = Mock.Random.date('T')

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${api.product.id}`](req, res) {
    const { id } = req.params
    const data = queryArray(database, Number(id), 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${api.product.id}`](req, res) {
    const { id } = req.params
    const data = queryArray(database, Number(id), 'id')
    if (data) {
      database = database.filter((item) => item.id !== Number(id))
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${api.product.id}`](req, res) {
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
