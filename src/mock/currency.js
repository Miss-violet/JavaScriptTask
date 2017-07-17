const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { api } = config

let usersListData = Mock.mock({
  'sizeData|20': [
    {
      id: () => Mock.Random.increment(),
      eu_size: '@integer(36, 43)',
      sold_num: '@integer(0)',
      recommend_proportion: '@float(0, 99, 2, 2)',
      gender: '@integer(0, 3)',
      'brand_id|+1': 1,
      'category_id|+1': 1
    },
  ],
  'colorData|20': [
    {
      id: () => Mock.Random.increment(),
      color: '@pick(["红", "橙", "黄", "绿", "蓝"])',
      sole_num: '@integer(0)',
      recommend_proportion: '@float(0, 99, 2, 2)',
      gender: '@integer(0, 3)',
      'brand_id|+1': 1,
      'category_id|+1': 1,
      season: '@integer(0, 3)'
    }
  ]
})

let sizeData = usersListData.sizeData
let colorData = usersListData.colorData

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


  [`POST ${api.currency.list}`](req, res) {
    let filter = req.body

    let newSizeData = sizeData, newColorData = colorData

    for (let key in filter) {
      if (key === 'season') continue
      if (filter[key] === '') continue
      if ({}.hasOwnProperty.call(filter, key)) {
        newSizeData = newSizeData.filter(item => {
          return item[key] === filter[key]
        })
      }
    }

    for (let key in filter) {
      if (filter[key] === '') continue
      if ({}.hasOwnProperty.call(filter, key)) {
        newColorData = newColorData.filter(item => {
          return item[key] === filter[key]
        })
      }
    }

    res.status(200).json({
      data: {
        newSizeData,
        newColorData
      }
    })
  },

  [`POST ${api.currency.uri}`](req, res) {
    const newData = req.body
    newData.id = Mock.Random.increment()
    newData.modifyUser = Mock.mock('@cname')
    newData.modifyTime = Date.now()

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${api.currency.id}`](req, res) {
    const { id } = req.params
    const data = queryArray(database, Number(id), 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${api.currency.id}`](req, res) {
    const { id } = req.params
    const data = queryArray(database, Number(id), 'id')
    if (data) {
      database = database.filter((item) => item.id !== Number(id))
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${api.currency.id}`](req, res) {
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
