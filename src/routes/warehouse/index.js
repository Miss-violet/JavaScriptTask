import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const Warehouse = ({ location, dispatch, warehouse, loading }) => {
  const { list, pagination, searchInfo, brandList, warehouseList, isShowModal } = warehouse
  const { pageSize } = pagination

  const handleOrder = (e) => {
    console.log('e', e.target.id)
    let id = e.target.id
    let { order_index, order_sort } = searchInfo
    if (order_index && order_sort) {
      if (order_index !== id) {
        order_index = id
        order_sort = 'desc'
      } else {
        order_sort = order_sort === 'desc' ? 'asc' : 'desc'
      }
    } else {
      order_index = id
      order_sort = 'desc'
    }

    dispatch({
      type: 'warehouse/queryList',
      payload: {
        ...searchInfo,
        order_index,
        order_sort
      }
    })
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['warehouse/query'],
    pagination,
    location,
    handleOrder,
    searchInfo,
    isShowModal,
    dispatch,
    onChange(pageNumber, filter, sorter) {
      // console.log('pageNumber', pageNumber)
      // console.log('pagination', pagination)
      // console.log('sorter', sorter)
      // console.log('order', orderInfo)
      if (pageNumber.current === pagination.current) {
        dispatch({
          type: 'warehouse/queryList',
          payload: {
            ...searchInfo,
            order_index: sorter.columnKey,
            order_sort: sorter.order === 'ascend' ? 'asc' : 'desc'
          }
        })
      } else {
        dispatch({
          type: 'warehouse/queryList',
          payload: {
            ...searchInfo,
            page_number: String(pageNumber.current),
            page_size: String(pageNumber.pageSize)
          }
        })
      }
    },
  }

  const filterProps = {
    brandList,
    warehouseList,
    pagination,
    onSearch(fieldsValue) {
      dispatch({
        type: 'warehouse/queryList',
        payload: {
          ...fieldsValue
        }
      })
    },
    searchInfo(info) {
      dispatch({
        type: 'warehouse/searchInfo',
        payload: {
          ...info
        }
      })
    },
  }

  return (
    <div className="content-wrap">
      <Filter {...filterProps} />
      <List {...listProps} />
    </div>
  )
}

Warehouse.propTypes = {
  warehouse: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ warehouse, loading }) => ({ warehouse, loading }))(Warehouse)
