import { create, remove, update, updateStatus } from '../services/product'
import { query, queryList } from '../services/product'
import { queryList as ptypesQuery } from '../services/producttype'
import pathToRegexp from 'path-to-regexp'

import { parse } from 'qs'
import { routerRedux } from 'dva/router'

export default {

  namespace: 'product',

  state: {
    list: [],
    currentItem: {},
    isMore: false,
    type: 'create',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
      pageSizeOptions: ['20', '50', '100'],
    },
    ptypesList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/product') {
          dispatch({
            type: 'query',
            payload: location.query || {},
          })          
          return
        } else if (location.pathname.indexOf('/product') === -1) {
          dispatch({
            type: 'closeExtend',
            payload: {
              isMore: false
            }
          })
        }

         console.info("product/id => listen => ", location.pathname)
        const match = pathToRegexp('/product/:id').exec(location.pathname)
        if (match) {
            if (match[1] === 'edit') {
              if (location.query.type === 'create') {
                dispatch({ type: 'query', payload: { type: location.query.type} })
              } else {
                dispatch({ type: 'query', payload: { type: location.query.type, id: location.query.id } })
              }
                
            }else{
                let type = location.query.type || 'detail'
                dispatch({ type: 'query', payload: { type, id: Number(match[1]) } })
            }
        }

      })
    },
  },

  effects: {

    *query({ payload }, { call, put, select, take }) {
      console.log('获取产品信息编辑')
      //ProductTypes
      let ptypesList = []
      //FIXME: 强耦合
      const pdata = yield call(ptypesQuery, { pageNumber: "1", pageSize: "999" })
      if (!pdata.success) {
        throw pdata
      }
      ptypesList = pdata.body.data

      let productList = []
      let productTotal = 0
      let pagenum = 1
      let pagesize = 20
      let currentItem = {}
      if (!payload.type) { //query all
        payload = parse(location.search.substr(1)) || {}
        let data = yield call(queryList, payload)
        if (!data.success) {
          throw data
        }
        productList = data.body.data.slice(0, pagesize)
        productTotal = data.body.total
        if (payload.pageNumber)
          pagenum = Number(payload.pageNumber)
        if (payload.pageSize) {
          pagesize = Number(payload.pageSize)
        }

        //todo
      } else {
        if (payload.type !== 'create') {
          let data = yield call(query, { id: payload.id })
          console.log('进入product信息编辑')
          if (!data.success) {
            throw data
          }
          // productList.push(data.body)
          // productTotal = 1
          currentItem = data.body
        }
      }

      let rowNo = (pagenum - 1) * pagesize + 1
      if (productList.length > 0) {
        productList.forEach(ele => { ele.rowNo = rowNo++ })
      }
      let ptype = payload.type || 'create'

      yield put({
        type: 'querySuccess',
        payload: {
          currentItem: currentItem,
          list: productList,
          pagination: {
            current: pagenum, //Number(payload.pageNumber) || 1,
            pageSize: pagesize, //Number(payload.pageSize) || 10,
            total: productTotal,
          },
          type: ptype,
          ptypesList,
        },
      })


    },

    *'delete'({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
      // if (data.success) {
      //   yield put({ type: 'query' })
      // } else {
      //   throw data
      // }
      console.info("data create => ", data)
      if (data.success) {
        yield put(routerRedux.push({
          pathname: '/product'
        }))
        yield put(routerRedux.push({
          pathname: '/product',
          query: {
            ...payload.pagination
          }
        }))
      } else {
        throw data
      }      
    },

    *create({ payload }, { call, put }) {
      const data = yield call(create, payload.data)
      console.info("data create => ", data)
      if (data.success) {
        yield put(routerRedux.push({
          pathname: '/product'
        }))
        yield put({ type: 'query',payload: {} })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(update, payload.data)
      // console.info("data => ", data)
      if (data.success) {
        yield put(routerRedux.push({
          pathname: '/product',
          query: {
            ...payload.pagination
          }
        }))
        // yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *updateStatus({ payload }, { select, call, put }) {
      const data = yield call(updateStatus, payload.data)
      // console.info("data => ", data)
      if (data.success) {
        yield put(routerRedux.push({
          pathname: '/product',
          query: {
            ...payload.pagination
          }
        }))
      } else {
        throw data
      }
    },

  },

  reducers: {

    querySuccess(state, action) {
      const { list, pagination, ptypesList, type, currentItem } = action.payload
      return {
        ...state,
        currentItem,
        list,
        ptypesList,
        type,
        pagination: {
          ...state.pagination,
          ...pagination,
        }
      }
    },

    closeCredit(state, action) {
      return { ...state, isCredit: true }
    },

    openCredit(state, action) {
      return { ...state, isCredit: false }
    },

    showMore(state) {
      return { ...state, isMore: !state.isMore }
    },

    closeExtend(state, { payload }) {
      return { ...state, isMore: payload.isMore }
    }

  },

}
