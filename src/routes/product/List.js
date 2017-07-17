import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Popconfirm } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'
import { PRODUCT_STATUS, REDEEM_MODE } from '../../utils/globaldef'
import moment from 'moment'
const confirm = Modal.confirm

const List = ({
  onDeleteItem,
  onEditItem,
  location,
  changeStatus,
  ...tableProps
}) => {
  const handleUpdateClick = (id, e) => {
    onEditItem(id)
  }

  /* 点击 启用，切换为 启用 状态 */
  const handleEnableClick = (id, e) => {
    changeStatus(id, PRODUCT_STATUS.ENABLE)
  }
  /* 点击 停用，切换为 停用 状态 */
  const handleDisableClick = (id, e) => {
    changeStatus(id, PRODUCT_STATUS.DISABLE)
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'rowNo',
      key: 'rowNo',
      className: 'rowNo'
    }, {
      title: '产品类型',
      dataIndex: 'productTypeName',
      key: 'productTypeName',
      render: (text) => {
         if(!text && text !== 0) return '-'
        return text
      }
    }, {
      title: '产品编号',
      dataIndex: 'code',
      key: 'code',
      render: (text) => {
         if(!text && text !== 0) return '-'
        return text
      }
    }, {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
         if(!text && text !== 0) return '-'
        return <Link to={`/product/${record.id}?type=check&from=current`}>{text}</Link>
      }
    }, {
      title: '资金占用费率(年化)',
      dataIndex: 'capitalOccupyFeeRateMin',
      key: 'capitalOccupyFeeRateMin',
      render: (text, record) => {
         if(!text && text !== 0) return '-'
        return <span>{text}~{record.capitalOccupyFeeRateMax}%</span>
      }
    }, {
      title: '代理费率',
      dataIndex: 'agentFeeRateMin',
      key: 'agentFeeRateMin',
      render: (text, record) => {
         if(!text && text !== 0) return '-'
        return <span>{text}~{record.agentFeeRateMax}%</span>
      }
    }, {
      title: '赎回方式',
      dataIndex: 'redemptionType',
      key: 'redemptionType',
      render: (text, record) => {
         if(!text && text !== 0) return '-'
        return text === REDEEM_MODE.CASH ? '现金还款' : '赊销+浮动质押'
      }
    }, {
      title: '单笔借款日期(天)',
      dataIndex: 'borrowingDaysMin',
      key: 'borrowingDaysMin',
      render: (text, record) => {
         if(!text && text !== 0) return '-'
        return <span>{text}~{record.borrowingDaysMax}</span>
      }
    }, {
      title: '最后修改人',
      dataIndex: 'modifyUser',
      key: 'modifyUser',
      render: (text) => {
         if(!text && text !== 0) return '-'
        return text
      }
    }, {
      title: '最后修改时间',
      dataIndex: 'modifyTime',
      key: 'modifyTime',
      className: 'alignCenter',
      render: time => {
        if(!time && time !== 0) return '-'
        return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss')
      }
    }, {
      title: '启用人',
      dataIndex: 'enableUser',
      key: 'enableUser',
      render: (text) => {
         if(!text && text !== 0) return '-'
        return text
      }
    }, {
      title: '启用时间',
      dataIndex: 'enableTime',
      key: 'enableTime',
      className: 'alignCenter',
      render: time => {
        let enableTime = (!time && time !== 0) ? '-' : moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss')
        
        return enableTime
      }
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      className: 'alignCenter',
      render: text => {
         if(!text && text !== 0) return '-'
        if (text === PRODUCT_STATUS.NOT_ENABLED) {
          return <span>未启用</span>
        }
        if (text === PRODUCT_STATUS.ENABLE) {
          return <span>启用</span>
        }
        if (text === PRODUCT_STATUS.DISABLE) {
          return <span>停用</span>
        }
      }
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      className: 'alignCenter',
      render: (text, record) => {
        if (record.status === PRODUCT_STATUS.NOT_ENABLED) {     /* 未启用 状态 */
          return (
            <span>
              <a href='javascript:void(0)' className='blue' onClick={e => handleEnableClick(record.id, e)}>
                启用
              </a><span className='dividing-line'>
                |
              </span><a href='javascript:void(0)' className='blue' onClick={e => handleUpdateClick(record.id, e)}>
                修改
              </a><span className='dividing-line'>
                |
              </span>
              <Popconfirm title='是否确认删除?' okText='确定' cancelText='取消' onConfirm={() => onDeleteItem(record.id)}>
                <a className='blue' href='javascript:void(0)'>删除</a>
              </Popconfirm>
            </span>
          )
        }
        else if (record.status === PRODUCT_STATUS.ENABLE) {  /* 启用 状态 */
          return (
            <span>
              <a href='javascript:void(0)' className='blue' onClick={e => handleDisableClick(record.id, e)}>
                停用
              </a>
            </span>
          )
        }
        else if (record.status === PRODUCT_STATUS.DISABLE) {    /* 停用 状态 */
          return (
            <span>
              <a href='javascript:void(0)' className='blue' onClick={e => handleEnableClick(record.id, e)}>
                启用
              </a><span className='dividing-line'>
                |
              </span>
              <Popconfirm title='是否确认删除?' okText='确定' cancelText='取消' onConfirm={() => onDeleteItem(record.id)}>
                <a className='blue' href='javascript:void(0)'>删除</a>
              </Popconfirm>
            </span>
          )
        }
      }
    }
  ]

  const getBodyWrapperProps = {
    pageNumber: location.query.pageNumber,
    current: tableProps.pagination.current,
  }
  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }
  return (
    <div>
      <Table className='ui-table'
        {...tableProps}
        columns={columns}
        simple
        rowKey={record => record.id}
        />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
  changeStatus: PropTypes.func,
}

export default List
