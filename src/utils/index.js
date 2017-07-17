import config from './config'
import menu from './menu'
import request from './request'
import classnames from 'classnames'
import { color } from './theme'
import lodash from 'lodash'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}
// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

var inject;
async function injectRequest(options) {
  let data = await request(options)
  // console.info("data => ", data)
  if (inject && (data.status >= 400)) {
    inject(data);
    data.success = false
  }
  return data;
}

const injectResponse_Error = (inject_func) => {
  inject = inject_func;
}

// 金额格式化(数值=>金额)
const formatMoney = (value) => {
  if (!value && value !== 0) return '-'
  return value.toFixed(2).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
}

// 金额格式化(金额=>数值)
const formatNumber = (value) => {
  return Number(value.replace(/\,/g, ''))
}

// 加载上传文件图标
const uploadIcon = (type) => {
  if (type.indexOf('doc') > -1) {
    return config.icons.word
  } else if (type.indexOf('xls') > -1) {
    return config.icons.excel
  } else if (type.indexOf('pdf') > -1) {
    return config.icons.PDF
  } else if (type === 'rar' || type === 'zip' || type === 'gzip') {
    return config.icons.zip
  } else if (type === 'png' || type === 'jpg' || type === 'jpeg' || type === 'bmp') {
    return config.icons.img
  }
}

module.exports = {
  config,
  menu,
  request: injectRequest,
  injectResponse_Error,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  formatMoney,
  formatNumber,
  uploadIcon
}
