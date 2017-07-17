import { queryPaging } from '../services/channelSaleAnalysis'
import { queryList as enterQueryList } from '../services/brandPL'
import { queryBrandList, queryWarehouseList } from '../services/select'
import { parse } from 'qs'

export default {

    namespace: 'channelSaleAnalysis',

    state: {
        list: [],
        brandList: [],
        warehouseList: [],
        columnsData: [],
        orderInfo: {},
        modalVisible: false,
        modalType: 'create',
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
                if (location.pathname === '/channelSaleAnalysis') {
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
            const toFirstPage = payload && payload.toFirstPage
            payload = parse(location.search.substr(1))
            if (toFirstPage) {
                payload.pageNumber = 1
            }
            let params = {
                pattern: '',
                goods_name: '',
                is_paging: 'true',
                page_offset: '0',
                page_number: '1',
                page_size: '10',
                start_time: '20170603',
                end_time: '20170703',
                logic_warehouse_type_id: '-1',
                brand_id: '-1',
                logic_warehouse_id: '-1',
                uri: 'profit_loss_goods',
            }

            payload = { ...params, ...payload }
            const data = yield call(queryPaging, payload)

            const brandData = yield call(queryBrandList)
            const warehouseData = yield call(queryWarehouseList)
            if (!data.success) {
                throw data
            }

            let res = data.body
            let pagenum = Number(payload.pageNumber) || 1
            let pagesize = Number(payload.pageSize) || 20
            let rowNo = (pagenum - 1) * pagesize + 1
            res.forEach(ele => { ele.rowNo = rowNo++ })
            yield put({
                type: 'querySuccess',
                payload: {
                    list: res.slice(0, pagesize),
                    brandList: brandData.body,
                    warehouseList: warehouseData.body,
                    pagination: {
                        current: pagenum, //Number(payload.pageNumber) || 1,
                        pageSize: pagesize, //Number(payload.pageSize) || 20,
                        total: res.total,
                    },
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
        onColConfig(state, action) {
            return { ...state, columnsData: action.payload, modalVisible: false }
        },
        showModal(state, action) {
            return { ...state, ...action.payload, modalVisible: true }
        },

        hideModal(state) {
            return { ...state, modalVisible: false }
        },
        order(state, { payload }) {
            const { orderInfo } = payload
            let newOrder = {}
            if (orderInfo.order === "descend") {
                newOrder.order = 'ascend'
                newOrder.columnkey = 'profit_loss'
            }
            if (orderInfo.order === 'ascend') {
                newOrder.order = 'descend'
                newOrder.columnkey = 'profit_loss'
            }
            if (!orderInfo.order) {
                newOrder.order = 'ascend'
                newOrder.columnkey = 'profit_loss'
            }
            return {
                ...state,
                orderInfo: newOrder
            }
        },
    },

}
