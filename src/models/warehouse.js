import { queryList, queryPaging } from '../services/warehouse'
import { parse } from 'qs'
import { routerRedux } from 'dva/router'
import { queryBrandList, queryWarehouseList } from '../services/select'
import moment from 'moment'

const initalInfo = {
  "pattern": "",
  "goods_name": "",
  "is_paging": "true",
  "page_number": "1",
  "page_size": "20",
  "start_time": "",
  "end_time": "",
  "logic_warehouse_type_id": "-1",
  "sku_code": "",
  "seller_code": "",
  "brand_id": "-1",
  "logic_warehouse_id": "-1",
  // "company_code": "lsyj-roomy",
  "order_index": '',
  "order_sort": '',
  "uri": "profit_loss_sku"
}

export default {

  namespace: 'warehouse',

  state: {
    list: [],
    type: 'create',
    brandList: [],
    warehouseList: [],
    isShowModal: false,
    searchInfo: initalInfo,
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
        if (location.pathname === '/inventory/profit-loss-sku') {
          dispatch({
            type: 'query',
            payload: initalInfo
          })
        }
      })
    },
  },

  effects: {

    *query({ payload }, { call, put }) {
      if (!payload.start_time) {
        const now = moment().format('YYYYMMDD')
        const recent30 = moment().subtract(30, 'days').format('YYYYMMDD')
        payload.start_time = recent30
        payload.end_time = now
      }

      let data = yield call(queryPaging, payload)
      console.log('date', data)
      let [brandSelectList, warehouseSelectList] = yield [call(queryBrandList, {}), call(queryWarehouseList, {})]
      if (data.success && data.body && warehouseSelectList.success) {
        let res = data.body
        let brandList = brandSelectList.body
        let warehouseList = warehouseSelectList.body
        let pagenum = Number(payload.page_number) || 1
        let pagesize = Number(payload.page_size) || 20
        let rowNo = (pagenum - 1) * pagesize + 1
        res.data.forEach(ele => { ele.rowNo = rowNo++ })
        yield put({
          type: 'querySuccess',
          payload: {
            list: res.data.slice(0, pagesize),
            brandList,
            warehouseList,
            pagination: {
              current: pagenum, //Number(payload.pageNumber) || 1,
              pageSize: pagesize, //Number(payload.pageSize) || 20,
              total: res.total,
            },
          },
        })
      } else {
        throw data
      }
    },

    *queryList({ payload }, { call, put }) {
      let data = yield call(queryPaging, payload)
      console.log('date', data)
      if (data.success && data.body) {
        let res = data.body
        let pagenum = Number(payload.page_number) || 1
        let pagesize = Number(payload.page_size) || 20
        let rowNo = (pagenum - 1) * pagesize + 1
        res.data.forEach(ele => { ele.rowNo = rowNo++ })
        yield put({
          type: 'queryListSuccess',
          payload: {
            list: res.data.slice(0, pagesize),
            searchInfo: { ...payload },
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
  },

  reducers: {

    querySuccess(state, action) {
      const { list, pagination, brandList, warehouseList } = action.payload
      return {
        ...state,
        list,
        brandList,
        warehouseList,
        pagination: {
          ...state.pagination,
          ...pagination,
        }
      }
    },

    queryListSuccess(state, { payload }) {
      const { list, pagination, searchInfo } = payload
      return {
        ...state,
        list,
        searchInfo,
        pagination: {
          ...state.pagination,
          ...pagination
        }
      }
    },

    modalVisible(state) {
      const visible = state.isShowModal
      return {
        ...state,
        isShowModal: !visible
      }
    },

    searchInfo(state, { payload }) {
      return {
        ...state,
        searchInfo: payload
      }
    }
  },

}
