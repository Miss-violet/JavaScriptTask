import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { Button, Icon } from 'antd'
import styles from './List.less'

const Product = ({ location, dispatch, product, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, isMore } = product
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['product/update'],
    title: `${modalType === 'create' ? 'Create Product' : 'Update Product'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `product/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'product/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['product/query'],
    pagination,
    location,
    isMotion,
    onChange(pageNumber) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          pageNumber: pageNumber.current,
          pageSize: pageNumber.pageSize,
        },
      }))
    },
    onDeleteItem(id) {
      dispatch({
        type: 'product/delete',
        payload: id,
      })
    },
    onEditItem(id) {
      dispatch(routerRedux.push({
        pathname: '/product/edit',
        query : {
          type : 'update',
          from: 'current',
          id
        }
      }))

    },
    changeStatus(id, status) {
      dispatch({
        type: 'product/updateStatus',
        payload: {
          data: {
            // ...record,
            id,
            status
          }
        },
      })
    },
  }

  const filterProps = {
    isMore,
    filter: {
      ...location.query,
      product
    },
    showMore() {
      dispatch({
        type: 'product/showMore'
      })
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
        pathname: '/product',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/product',
      }))
    },
    onAdd() {
      dispatch(routerRedux.push({
        pathname: '/product/edit',
        query : {
          type : 'create',
          from: 'current'
        }
      }))            

    },
  }

  return (
    <div className="content-wrap">
      <Filter {...filterProps} />
      <div className='tool-bar'>
        <Button className='antdIcon-btn ant-btn-primary' onClick={filterProps.onAdd}><Icon type='plus' />新增</Button>
      </div>
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ product, loading }) => ({ product, loading }))(Product)
