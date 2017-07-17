import pathToRegexp from 'path-to-regexp'
import { query } from '../../services/warehouse'

export default {

  namespace: 'warehouseDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        const match = pathToRegexp('/warehouse/:id').exec(location.pathname)
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
