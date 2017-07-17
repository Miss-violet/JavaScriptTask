import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { Button, Icon } from 'antd'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const GoodsPL = ({ location, dispatch, goodsPL, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, columnsData, brandList, warehouseList, searchInfo, filter} = goodsPL
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
      type: 'goodsPL/query',
      payload: {
        ...searchInfo,
        order_index,
        order_sort
      }
    })
  }

  const modalProps = {
    columnsData,
    title: '',
    footer: null,
    closable: false,
    visible: modalVisible,
    confirmLoading: loading.effects['goodsPL/update'],
    wrapClassName: 'vertical-center-modal ant-colConfig-modal',
    onCancel() {
      dispatch({
        type: 'goodsPL/hideModal',
      })
    },
    onShow() {
      dispatch({
        type: 'goodsPL/showModal',
      })
    },
    /*保留 弹窗提交发起动作，暂时没用*/
    onColConfig(columnsConfig) {
      dispatch({
        type: 'goodsPL/onColConfig',
        payload: {
          ...columnsConfig
        }
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['goodsPL/query'],
    pagination,
    handleOrder,
    searchInfo,
    onChange(pageNumber, filter, sorter) {
      if (pageNumber.current === pagination.current) {
        dispatch({
          type: 'goodsPL/query',
          payload: {
            ...searchInfo,
            order_index: sorter.columnKey,
            order_sort: sorter.order === 'ascend' ? 'asc' : 'desc'
          }
        })
      } else {
        dispatch({
          type: 'goodsPL/query',
          payload: {
            ...filter,
            page_number: String(pageNumber.current),
            page_size: String(pageNumber.pageSize),
          }
        })
      }
    },
  }

  const filterProps = {
    brandList,
    warehouseList,
    onSearch(fieldsValue) {
      dispatch({
        type: 'goodsPL/recordFilter',
        payload: {
          filter: fieldsValue,
        }
      })
      dispatch({
        type: 'goodsPL/query',
        payload: {
          ...fieldsValue,
        }
      })
    },
  }

  const tableProps = {
    listProps,
    modalProps,
  }
  return (
    <div className="content-wrap">
      <Filter {...filterProps} />

      <List {...tableProps} />
    </div>
  )
}

GoodsPL.propTypes = {
  goodsPL: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ goodsPL, loading }) => ({ goodsPL, loading }))(GoodsPL)
