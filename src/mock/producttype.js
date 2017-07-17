const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { api } = config

let usersListData = Mock.mock({
  'data|15-20': [
    {
      'id': () => Mock.Random.increment(),
      'code': 'DLCG@integer(1,9999)',
      'modifyTime': '@integer(1490000000000, 1493999999999)',
      'modifyUser': '@cname',
      'name': '代理@cword(2)',
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

  [`POST ${api.producttype.list}`](req, res) {
    let { pageSize, pageNumber, ...other } = req.body
    pageSize = pageSize || 10
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

  [`POST ${api.producttype.uri}`](req, res) {
    const newData = req.body
    newData.modifyTime = new Date().getTime()//Mock.mock('@now')
    newData.createTime = newData.createTime
    newData.modifyUser = Mock.mock('@cname')
    newData.rowNo = 0
    newData.id = Mock.Random.increment()

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${api.producttype.id}`](req, res) {
    const { id } = req.params
    const data = queryArray(database, Number(id), 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${api.producttype.id}`](req, res) {
    const { id } = req.params
    const data = queryArray(database, Number(id), 'id')
    if (data) {
      database = database.filter((item) => item.id !== Number(id))
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${api.producttype.id}`](req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      if (item.id === Number(id)) {
        isExist = true
        item.modifyTime = new Date().getTime()//Mock.mock('@now')
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
