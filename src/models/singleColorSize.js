import { queryList } from '../services/singleColorSize'
import { queryDimensionList } from '../services/select'
import { parse } from 'qs'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default {

  namespace: 'singleColorSize',

  state: {
    dimensionList: [],
    sizeList: [],
    colorList: [],
    colorParams: {},
    season: '春',
    dropdownPlaceholder: '请输入款号'
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/singleColorSize') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *query({ payload }, { call, put }) {
      const sizeParams = {
        pattern: 'SK001',
        company_id: 'lsyj-roomy',
        uri: 'dm_csr_goods_size_reorder'
      }
      const colorParams = {
        pattern: 'SK001',
        season: '春',
        company_id: 'lsyj-roomy',
        uri: 'dm_csr_goods_color_reorder'
      }

      const [sizeData, colorData] = yield [call(queryList, sizeParams), call(queryList, colorParams)]

      if (sizeData.success && colorData.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            sizeList: sizeData.body,
            colorList: colorData.body,
            colorParams
          },
        })
      } else {
        throw data
      }
    },

    *queryDimensionList({ payload }, { call, put }) {
      const dimensionData = yield call(queryDimensionList, payload)
      if (dimensionData.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            dimensionList: dimensionData.body
          }
        })
      }
    },

    *selectChange({ payload }, { call, put }) {
      const { sizeParams, colorParams } = payload
      const [sizeData, colorData] = yield [call(queryList, sizeParams), call(queryList, colorParams)]

      if (sizeData.success && colorData.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            sizeList: sizeData.body,
            colorList: colorData.body,
            colorParams
          }
        })
      }
    },

    *seasonChange({ payload }, { call, put }) {
      const colorData = yield call(queryList, payload)
      if (colorData.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            colorList: colorData.body,
            colorParams: payload
          }
        })
      }
    }

  },

  reducers: {

    querySuccess(state, { payload }) {
      return { ...state, ...payload }
    },

    dropdownChange(state, { payload }) { // 改变输入框placeholder
      return { ...state, dropdownPlaceholder: payload.placeholder, dimensionList: [] }
    },

    queryDimensionListEmpty(state) {
      return { ...state, dimensionList: [] }
    },

  },

}