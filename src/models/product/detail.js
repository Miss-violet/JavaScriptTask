import pathToRegexp from 'path-to-regexp'
import { query } from '../../services/product'

export default {

  namespace: 'productDetail',

  state: {
    data: {},
    currentItem: {},
    isMore: false,
    type: 'create',
    ptypesList: []    
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        const match = pathToRegexp('/product/:id').exec(location.pathname)
        if (match && Number(match[1])) {
          dispatch({ type: 'query', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, payload)
      const { success, message, status, body } = data
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: body,
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
