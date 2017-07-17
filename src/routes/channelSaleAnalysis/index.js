import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { Button, Icon } from 'antd'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const ChannelSaleAnalysis = ({ location, dispatch, channelSaleAnalysis, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, columnsData, brandList, warehouseList, orderInfo } = channelSaleAnalysis
  const { pageSize } = pagination
  console.log('list', list)

  const handleOrder = (e) => {
    dispatch({
      type: 'channelSaleAnalysis/order',
      payload: {
        orderInfo
      }
    })
  }

  const modalProps = {
    columnsData,
    title: '',
    footer: null,
    closable: false,
    visible: modalVisible,
    confirmLoading: loading.effects['channelSaleAnalysis/update'],
    wrapClassName: 'vertical-center-modal ant-colConfig-modal',
    onCancel() {
      dispatch({
        type: 'channelSaleAnalysis/hideModal',
      })
    },
    onShow() {
      dispatch({
        type: 'channelSaleAnalysis/showModal',
      })
    },
    /*保留 弹窗提交发起动作，暂时没用*/
    onColConfig(columnsConfig) {
      dispatch({
        type: 'channelSaleAnalysis/onColConfig',
        payload: {
          ...columnsConfig
        }
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['channelSaleAnalysis/query'],
    pagination,
    handleOrder,
    orderInfo,
    onChange(pageNumber) {
      const { query, pathname } = location
      if (pageNumber.current === pagination.current) {
        handleOrder()
      } else {
        dispatch(routerRedux.push({
          pathname,
          query: {
            ...query,
            pageNumber: pageNumber.current,
            pageSize: pageNumber.pageSize,
          },
        }))
      }
    },
  }

  const filterProps = {
    brandList,
    warehouseList,
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          pageNumber: 1,
          pageSize,
        },
      }))
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/channelSaleAnalysis',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/channelSaleAnalysis',
      }))
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

ChannelSaleAnalysis.propTypes = {
  channelSaleAnalysis: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ channelSaleAnalysis, loading }) => ({ channelSaleAnalysis, loading }))(ChannelSaleAnalysis)
