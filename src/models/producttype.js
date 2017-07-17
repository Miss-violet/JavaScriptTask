import { create, remove, update } from '../services/producttype'
import { queryList } from '../services/producttype'
import { parse } from 'qs'
import { queryBrandList } from '../services/select'
import moment from 'moment'

const dateFormat = 'YYYYMM'
const preMonth = moment().subtract(1, 'month').format(dateFormat)
const initParams = {
  "batch_year": "",
  "brand_id": "-1",
  // page_number: '1',
  // page_size: '20',
  start_time: preMonth,
  end_time: preMonth,
  "uri": "pss_stock_age",
}

export default {

  namespace: 'producttype',

  state: {
    list: [],
    brandList: [],
    lineCharts: {},
    pieCharts: {},
    searchInfo: { ...initParams },
    initSearchValue: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/inventory/stock-age') {
          dispatch({
            type: 'query',
            payload: {
              ...initParams
            }
          })
          dispatch({ type: 'querySelect' })
        }
      })
    },
  },

  effects: {

    *query({ payload }, { call, put }) {
      const lineParams = { ...payload, uri: 'pss_stock_age_line', withScript: true }
      const pieParams = { ...payload, withScript: true }
      const [data, lineData] = yield [call(queryList, payload), call(queryList, lineParams)]
      const pieData = yield call(queryList, pieParams)

      if (data.success || brandSelectList.success) {
        let res = data.body.data
        yield put({
          type: 'querySuccess',
          payload: {
            list: res,
            searchInfo: payload,
            lineCharts: lineData.body,
            pieCharts: pieData.body
          },
        })
      } else {
        throw data
      }
    },
    *querySelect({ payload }, { call, put }) {
      const brandSelectData = yield call(queryBrandList)
      if (brandSelectData.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            brandList: brandSelectData.body
          }
        })
      }
    }
  },

  reducers: {

    querySuccess(state, { payload }) {
      return { ...state, ...payload }
    },
    searchInfo(state, { payload }) {
      return {
        ...state,
        searchInfo: payload
      }
    },
    initSearchValue(state, { payload }) {
      return {
        ...state,
        initSearchValue: payload
      }
    }
  }
}
