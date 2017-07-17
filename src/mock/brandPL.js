const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { api, apiPrefix } = config
const Random = Mock.Random
let usersListData = Mock.mock({
  'data|60-80': [
    {
      'rowNo|+1':1,
      brand_name: '@cword(2)品牌',
      'brand_id|+1': 1,
      'lw_type|1': ['自有', '代发', '代采', '质押'],
      profit_loss: '@integer(1,16)',
      good_profit_loss: '@integer(1,16)',
      def_profit_loss: '@integer(1,16)',
      fin_profit_loss: '@integer(1,16)',
      fin_good_profit_loss: '@integer(1,16)',
      fin_def_profit_loss: '@integer(1,16)',
      wh_profit_loss: '@integer(1,16)',
      wh_good_profit_loss: '@integer(1,16)',
      wh_def_profit_loss: '@integer(1,16)',
      allot_profit_loss: '@integer(1,16)',
      allot_good_profit_loss: '@integer(1,16)',
      allot_def_profit_loss: '@integer(1,16)',
      trans_good_profit_loss: '@integer(1,16)',
      trans_def_profit_loss: '@integer(1,16)',
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

// const post_enterprise = api.brandPL.replace('/:id', '')

module.exports = {
  [`POST ${api.brandPL.list}`](req, res) {
    let { pageSize, pageNumber, ...other } = req.body
    
    pageSize = pageSize || 20
    pageNumber = pageNumber || 1
    let newData = database,
        filterData = [],
        tmp_data = []
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {

        // newData = newData.filter((item) => {
        //   if ({}.hasOwnProperty.call(item, key)) {
        //     return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
        //   }
        // return true

        let otherKeyArray = other[key].split(',')   // 把字符串转换为数组

        otherKeyArray.forEach((v, i, a) => {        // 遍历数组，与 数据 做匹配
          filterData = database.filter((item) => {
            if ({}.hasOwnProperty.call(item, key)) {
                return String(item[key]).trim().indexOf(decodeURI(otherKeyArray[i]).trim()) > -1
            }
            return true
          })

          newData = tmp_data.concat(filterData)     //将每次filter后的结果合并在一起

          tmp_data = filterData                     //存储每次filter后的结果，方便下次查询后将结果合并在一起
        })
      }
    }
    res.status(200).json({
      data: newData.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
      total: newData.length,
    })
  },

  [`POST ${api.brandPL.uri}`](req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.id = Mock.Random.increment()
    newData.modifyTime = new Date().getTime()
    newData.modifyUser = Mock.mock('@cname')
    newData.rowNo = 0

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${api.brandPL.id}`](req, res) {
    const { id } = req.params
    const data = queryArray(database, Number(id), 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${api.brandPL.id}`](req, res) {
    const { id } = req.params
    const data = queryArray(database, Number(id), 'id')
    if (data) {
      database = database.filter((item) => item.id !== Number(id))
      res.status(200).json({ code: 0, msg: 'ok' }).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${api.brandPL.id}`](req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      if (item.id === Number(id)) {
        isExist = true
        editItem.modifyTime = new Date().getTime()
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
