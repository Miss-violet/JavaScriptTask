import pathToRegexp from 'path-to-regexp'
import { query } from '../../services/warehouse'

export default {

    namespace: 'warehouseEdit',

    state: {
        data: {},
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
                if (location.pathname.indexOf('/warehouse/edit') > -1) {
                    if (location.query.type === 'update') {
                        dispatch({
                            type: 'query',
                            payload: location.query,
                        })
                    }
                }
            })
        }
    },

    effects: {
        *query({ payload, }, { call, put }) {
            const data = yield call(query, { id: payload.id })
            const { success, message, status, body } = data
            if (success) {
                let pagenum = Number(payload.pageNumber) || 1
                let pagesize = Number(payload.pageSize) || 20
                yield put({
                    type: 'querySuccess',
                    payload: {
                        data: body,
                        pagination: {
                            current: pagenum,
                            pageSize: pagesize,
                        },
                    },
                })
            } else {
                throw data
            }
        },
    },
    reducers: {
        querySuccess(state, { payload }) {
            const { data, pagination } = payload
            return {
                ...state,
                data,
                pagination: {
                    ...state.pagination,
                    ...pagination,
                }
            }
        },
    }
}