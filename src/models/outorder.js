import { queryList, queryPagingList } from '../services/outorder'
import { parse } from 'qs'

export default {

    namespace: 'outorder',

    state: {
        list: [],
        goodsList: [],
        regionList: [],
        brandList: [],
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
                if (location.pathname === '/outorder') {
                    dispatch({
                        type: 'queryGoods',
                    })
                    dispatch({
                        type: 'queryRegion'
                    })
                    dispatch({
                        type: 'queryBrand'
                    })
                }
            })
        },
    },

    effects: {

        // 商品构成
        *queryGoods({ payload }, { call, put }) {
            let pramas = {
                "start_date": "20170428",
                "end_date": "20170504",
                "query_unit": "day",
                "pattern": "",
                "company_code": "lsyj-roomy",
                "department": "",
                "order_source_type": "-1",
                "order_index": "pay_goods_num",
                "page_offset": "0",
                "page_size": "20",
                "order_sort": "desc",
                "is_paging": "false",
                "top_n": "10",
                "uri": "csa_goods"
            }
            const data = yield call(queryList, pramas)
            console.log('data', data)
            if (data.success) {
                let res = data.body
                for (let i = 0; i < res.length; i++) {
                    res[i].rowNo = i + 1
                }
                yield put({
                    type: 'queryGoodsSuccess',
                    payload: {
                        goodsList: res,
                    },
                })
            } else {
                throw data
            }
        },

        // 地域构成
        *queryRegion({ payload }, { call, put }) {
            let parmas = {
                "channel_id": "-1",
                "start_date": "20170101",
                "end_date": "20170507",
                "order_source_type": "0",
                "order_index": "pay_amount",
                "query_unit": "day",
                "company_code": "lsyj-roomy",
                "order_sort": "desc",
                "is_paging": "false",
                "top_n": "",
                "platform_id": "-1",
                "uri": "csa_areas"
            }
            let data = yield call(queryList, parmas)
            console.log('queryRegion', data)
            if (data.success) {
                let res = data.body
                for (let i = 0; i < res.length; i++) {
                    res[i].rowNo = i + 1
                }
                yield put({
                    type: 'queryRegionSuccess',
                    payload: {
                        regionList: res
                    }
                })
            } else {
                throw data
            }
        },

        // 品牌构成
        *queryBrand({ payload }, { call, put }) {
            let parmas = {
                "start_date": "20170510",
                "end_date": "20170610",
                "query_unit": "day",
                "company_code": "lsyj-roomy",
                "department": "",
                "order_source_type": "-1",
                "order_index": "pay_goods_num",
                "page_offset": "0",
                "page_size": "20",
                "brand_id": "-1",
                "order_sort": "desc",
                "is_paging": "false",
                "top_n": "10",
                "uri": "csa_brand"
            }
            const data = yield call(queryList, parmas)
            console.log('brand', data)
            if (data.success) {
                let res = data.body
                for (let i = 0; i < res.length; i++) {
                    res[i].rowNo = i + 1
                }
                yield put({
                    type: 'queryBrandSuccess',
                    payload: {
                        brandList: res
                    }
                })
            } else {
                throw data
            }
        }
    },

    reducers: {

        queryGoodsSuccess(state, { payload }) {
            const { goodsList } = payload
            return {
                ...state,
                goodsList,
            }
        },

        queryRegionSuccess(state, { payload }) {
            const { regionList } = payload
            return {
                ...state,
                regionList
            }
        },

        queryBrandSuccess(state, { payload }) {
            const { brandList } = payload
            return {
                ...state,
                brandList
            }
        }
    },

}
