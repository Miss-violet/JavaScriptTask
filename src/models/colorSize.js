import { queryList } from '../services/producttype'

export default {

    namespace: 'colorSize',
    state: {
        echartsData: {}
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/colorSize') {
                    dispatch({
                        type: 'query',
                        payload: {

                        }
                    })
                }
            })
        }
    },

    effects: {
        *query({ payload }, { call, put }) {

            const params = {
                batch_year: '',
                brand_id: '-1',
                end_time: '201706',
                start_time: '201706',
                uri: 'pss_stock_age',
                withScript: true
            }

            const lineData = yield call(queryList, params)
            console.log(lineData)

            const echartsData = lineData.body
            
            if (true) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        echartsData
                    }
                })
            } else {
                throw data
            }
        },

        *queryDimensionList({ payload }, { call, put }) {
            
            if (true) {
                yield put({
                    type: 'querySuccess',
                    payload: {

                    }
                })
            } else {
                throw data
            }
        }
    },

    reducers: {
        querySuccess(state, { payload }) {
            const { echartsData } = payload
            return { ...state, echartsData }
        }
    }
}
