import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'


const BrandPL = ({ location, dispatch, brandPL, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, brand_name, lw_name, lw_type, filter, orderInfo, columnsData } = brandPL
  const { pageSize } = pagination

  const handleOrder = (e) => {
    dispatch({
      type: 'brandPL/order',
      payload: {
        orderInfo
      }
    })
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['brandPL/query'],
    pagination,
    handleOrder,
    orderInfo,
    location,
    isMotion,
    onChange(pageNumber) {
      const { query, pathname } = location
      if (pageNumber.current === pagination.current) {
        handleOrder()
      } else {
        dispatch({
          type: 'brandPL/query',
          payload: {
            ...filter,
            page_number: String(pageNumber.current),
            page_size: String(pageNumber.pageSize),
          }
        })
      }
    },
  }

  const modalProps = {
    columnsData,
    title: '',
    footer: null,
    closable: false,
    visible: modalVisible,
    confirmLoading: loading.effects['brandPL/update'],
    wrapClassName: 'vertical-center-modal ant-colConfig-modal',
    onCancel() {
      dispatch({
        type: 'brandPL/hideModal',
      })
    },
    onShow() {
      dispatch({
        type: 'brandPL/showModal',
      })
    },
    /*保留 弹窗提交发起动作，暂时没用*/
    onColConfig(columnsConfig) {
      dispatch({
        type: 'brandPL/onColConfig',
        payload: {
          ...columnsConfig
        }
      })
    },
  }

  const filterProps = {
    brand_name: brand_name,
    lw_name: lw_name,
    lw_type: lw_type,
    onSearch(fieldsValue) {
      dispatch({
        type: 'brandPL/recordFilter',
        payload: {
          filter: fieldsValue,
        }
      })
      dispatch({
        type: 'brandPL/query',
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

BrandPL.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ brandPL, loading }) => ({ brandPL, loading }))(BrandPL)
