import { create, remove, update } from '../services/brandPL'
import { queryPaging } from '../services/brandPL'
import { queryBrandList, queryWarehouseList } from '../services/select'
import { parse } from 'qs'
import { routerRedux } from 'dva/router'
import moment from 'moment'

const params = {
  'logic_warehouse_type_id': '-1',
  'is_paging': 'true',
  'page_offset': '0',
  'page_size': '10',
  'start_time': '20170603',
  'end_time': '20170703',
  'brand_id': '-1',
  'logical_warehouse_id': '-1',
  'company_code': 'lsyj-roomy',
  'uri': 'profit_loss_brand',
}

export default {

  namespace: 'brandPL',

  state: {
    list: [],
    brand_name: [],
    lw_name: [],
    currentItem: {},
    columnsData: [],
    orderInfo: {},
    type: 'create',
    filter: {},
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
      pageSizeOptions: ['20', '50', '100'],

    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/inventory/profit-loss-brand') {
          dispatch({
            type: 'query',
            payload: {
              start_time: moment().subtract(30, 'days').format('YYYYMMDD'),
              end_time: moment().format('YYYYMMDD'),
            },
          })
          dispatch({
            type: 'querySelect',
          })
        }
      })
    },
  },

  effects: {

    *query({ payload }, { call, put }) {

      let [data] = yield [call(queryPaging, { ...params, ...payload })]
      if (data.success) {
        let res = data.body
        let pagenum = Number(payload.page_number) || 1
        let pagesize = Number(payload.page_size) || 20
        let rowNo = (pagenum - 1) * pagesize + 1
        res.data.forEach(ele => { ele.rowNo = rowNo++ })
        yield put({
          type: 'querySuccess',
          payload: {
            list: res.data.slice(0, pagesize),
            pagination: {
              current: pagenum,
              pageSize: pagesize,
              total: res.total,
            },
          },
        })
      } else {
        throw data
      }
    },
    *querySelect({ payload }, { call, put }) {

      let [brand_name, lw_name] = yield [call(queryBrandList), call(queryWarehouseList)]
      if (brand_name.success) {
        yield put({
          type: 'querySelectSuccess',
          payload: {
            brand_name: brand_name.body,
            lw_name: lw_name.body,
          },
        })
      } else {
        throw brand_name
      }
    },

    *delete({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(create, payload.data)
      if (data.success) {
        yield put(routerRedux.push({
          pathname: '/brandPL',
        }))
        // yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(update, payload.data)
      if (data.success) {
        yield put(routerRedux.push({
          pathname: '/brandPL',
          query: {
            ...payload.pagination
          }
        }))
        // yield put({ type: 'query' })
      } else {
        throw data
      }
    },

  },

  reducers: {

    querySuccess(state, action) {
      const { list, pagination } = action.payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        }
      }
    },
    querySelectSuccess(state, action) {
      const { brand_name, lw_name, lw_type } = action.payload
      return {
        ...state,
        brand_name,
        lw_name,
        lw_type
      }
    },

    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

    order(state, { payload }) {
      const { orderInfo } = payload
      let newOrder = {}
      if (orderInfo.order === "descend") {
        newOrder.order = 'ascend'
        newOrder.columnkey = 'profit_loss'
      }
      if (orderInfo.order === 'ascend') {
        newOrder.order = 'descend'
        newOrder.columnkey = 'profit_loss'
      }
      if (!orderInfo.order) {
        newOrder.order = 'ascend'
        newOrder.columnkey = 'profit_loss'
      }
      return {
        ...state,
        orderInfo: newOrder
      }
    },

    recordFilter(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }

  },

}
