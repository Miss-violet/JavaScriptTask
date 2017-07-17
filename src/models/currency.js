import { queryList } from '../services/currency'
import { queryBrandList } from '../services/select'
import { parse } from 'qs'

export default {

  namespace: 'currency',

  state: {
    data: {},
    brandList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/currency') {
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
      payload = parse(location.search.substr(1))

      const [ data, brandData ]  = yield [call(queryList, payload), call(queryBrandList)]

      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data.body.data,
            brandList: brandData.body.data
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {

    querySuccess(state, { payload }) {
      const { data, brandList } = payload
      return {
        ...state,
        data,
        brandList
      }
    },

  },

}
