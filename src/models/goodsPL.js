import { queryPaging } from '../services/goodsPL'
import { queryList as enterQueryList } from '../services/brandPL'
import { queryBrandList, queryWarehouseList } from '../services/select'
import { parse } from 'qs'
import moment from 'moment'

const params = {
    pattern: '',
    goods_name: '',
    is_paging: 'true',
    page_number: '1',
    page_size: '20',
    start_time: '20170603',
    end_time: '20170703',
    logic_warehouse_type_id: '-1',
    brand_id: '-1',
    logic_warehouse_id: '-1',
    "order_index": '',
    "order_sort": '',
    uri: 'profit_loss_goods',
}

export default {

    namespace: 'goodsPL',

    state: {
        list: [],
        brandList: [],
        warehouseList: [],
        columnsData: [],
        modalVisible: false,
        modalType: 'create',
        searchInfo: params,
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

                if (location.pathname === '/inventory/profit-loss-goods') {
                    dispatch({
                        type: 'query',
                        payload: {
                            start_time: moment().subtract(30, 'days').format('YYYYMMDD'),
                            end_time: moment().format('YYYYMMDD'),
                        },
                    })
                }
            })
        },
    },

    effects: {
        *query({ payload }, { call, put }) {
            payload = { ...params, ...payload }
            console.log('payload2 =>', payload)

            const [data, brandData, warehouseData] = yield [call(queryPaging, payload), call(queryBrandList), call(queryWarehouseList)]

            if (!data.success) {
                throw data
            }

            let res = data.body
            let pagenum = Number(payload.page_number) || 1
            let pagesize = Number(payload.page_size) || 20
            let rowNo = (pagenum - 1) * pagesize + 1
            console.log('RES =>', res)
            res.data.forEach(ele => { ele.rowNo = rowNo++ })
            yield put({
                type: 'querySuccess',
                payload: {
                    list: res.data.slice(0, pagesize),
                    brandList: brandData.body,
                    warehouseList: warehouseData.body,
                    searchInfo: { ...payload },
                    pagination: {
                        current: pagenum, //Number(payload.pageNumber) || 1,
                        pageSize: pagesize, //Number(payload.pageSize) || 20,
                        total: res.total,
                    }
                },
            })
        },

        *'delete'({ payload }, { call, put }) {
            const data = yield call(remove, { id: payload })
            if (data.success) {
                yield put({
                    type: 'query',
                    payload: {}
                })
            } else {
                throw data
            }
        },

        *create({ payload }, { call, put }) {
            const data = yield call(create, payload)
            if (data.success) {
                yield put({ type: 'hideModal' })
                yield put({ type: 'query', payload: { toFirstPage: true } })
            } else {
                throw data
            }
        },

        *update({ payload }, { select, call, put }) {
            const data = yield call(update, payload)
            if (data.success) {
                yield put({ type: 'hideModal' })
                yield put({ type: 'query' })
            } else {
                throw data
            }
        },

    },

    reducers: {

        querySuccess(state, action) {
            const { list, pagination, brandList, warehouseList, searchInfo} = action.payload
            return {
                ...state,
                list,
                brandList,
                warehouseList,
                searchInfo,
                pagination: {
                    ...state.pagination,
                    ...pagination,
                }
            }
        },
        onColConfig(state, action) {
            return { ...state, columnsData: action.payload, modalVisible: false }
        },
        showModal(state, action) {
            return { ...state, ...action.payload, modalVisible: true }
        },

        hideModal(state) {
            return { ...state, modalVisible: false }
        },

        recordFilter(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    },

}
