import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Popconfirm, Icon, Button, Tooltip } from 'antd'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'
import moment from 'moment'

const confirm = Modal.confirm

const List = ({
  location,
  initSearchValue,
  ...tableProps
}) => {
  // console.log('props', tableProps)
  // 判断当前维度
  const firstItem = tableProps.dataSource[0] || []
  let type = 1
  if (firstItem.brand_name) {
    type = 0
  }

  const columns = [
    {
      title: <span>维度</span>,
      dataIndex: 'batch_year',
      key: 'batch_year',
      render: (text, record) => {
        if (record.batch_year) return <Link ><span id='batch_year' onClick={(e) => { handleClick(e, record.batch_year) }}>{record.batch_year}</span></Link>
        if (record.brand_name) return <Link ><span id='brand_name' onClick={(e) => { handleClick(e, record.brand_name) }}>{record.brand_name}</span></Link>
        return '-'
      }
    },
    {
      title: <Tooltip placement="top" title={type ? '对应首批入库时间商品当前财务库存数' : '对应首批入库时间、品牌的商品当前财务库存数'}>
        <span>当前库存数</span>
      </Tooltip>,
      dataIndex: 'finance_stock',
      key: 'finance_stock',
      className: 'alignCenter',
      render: (text) => text || text === 0 ? <span className='amount'>{text}</span> : '-'
    },
    {
      title: <Tooltip placement="top" title={type ? '对应首批入库时间商品当前财务库存成本金额' : '对应首批入库时间、品牌的商品当前财务库存成本金额'}>
        <span>当前库存成本</span>
      </Tooltip>,
      dataIndex: 'purchase_amt',
      key: 'purchase_amt',
      className: 'alignCenter',
      render: (text) => text || text === 0 ? <span className='amount'>{`${text.toFixed(2)}`}</span> : '-'
    }, {
      title: <Tooltip placement="top" title={type ? '对应首批入库时间商品当前财务库存成本结构占比' : '对应首批入库时间、品牌的商品当前财务库存成本结构占比'}>
        <span>当前库存成本结构占比</span>
      </Tooltip>,
      dataIndex: 'purchase_amt_proportion',
      key: 'purchase_amt_proportion',
      render: (text) => text || text === 0 ? <span className='amount'>{`${(text * 100).toFixed(2)}%`}</span> : '-'
    },
    {
      title: <Tooltip placement="top" title={type ? '当前选择时间范围内发货的对应首批入库时间商品发货件数' : '当前选择时间范围内发货且对应首批入库时间、品牌的商品发货件数'}>
        <span>发货商品数</span>
      </Tooltip>,
      dataIndex: 'send_num',
      key: 'send_num',
      className: 'alignCenter',
      render: (text) => text || text === 0 ? <span className='amount'>{text}</span> : '-'
    },
    {
      title: <Tooltip placement="top" title={type ? '当前选择时间范围内发货的对应首批入库时间商品采购成本价' : '当前选择时间范围内发货且对应首批入库时间、品牌的商品采购成本价'}>
        <span>发货商品成本</span>
      </Tooltip>,
      dataIndex: 'send_cost_amt',
      key: 'send_cost_amt',
      className: 'alignCenter',
      render: (text) => text || text === 0 ? <span className='amount'>{`${text.toFixed(2)}`}</span> : '-'
    },
    {
      title: <Tooltip placement="top" title={type ? '当前选择时间范围内发货的对应首批入库时间商品实收，不包含快递、手续费收入' : '当前选择时间范围内发货且对应首批入库时间、品牌的商品实收，不包含快递、手续费收入'}>
        <span>发货商品实收</span>
      </Tooltip>,
      dataIndex: 'send_received_amt',
      key: 'send_received_amt',
      className: 'alignCenter',
      render: (text) => text || text === 0 ? <span className='amount'>{`${text.toFixed(2)}`}</span> : '-'
    },
    {
      title: <Tooltip placement="top" title={type ? '当前选择时间范围内发货的对应首批入库时间商品平均毛利率' : '当前选择时间范围内发货且对应首批入库时间、品牌的商品平均毛利率'}>
        <span>发货商品毛利率</span>
      </Tooltip>,
      dataIndex: 'send_profit_rate',
      key: 'send_profit_rate',
      className: 'alignCenter',
      render: (text) => {
        if (typeof (text) === 'number') return <span className='amount'>{`${(text * 100).toFixed(2)}%`}</span>
        return <span className='amount'>{text}</span>
      }
    },
    {
      title: <Tooltip placement="top" title={type ? '当前选择时间范围内发货的对应首批入库时间商品采购成本价结构占比' : '当前选择时间范围内发货且对应首批入库时间、品牌的商品采购成本价结构占比'}>
        <span>发货商品成本结构占比</span>
      </Tooltip>,
      dataIndex: 'send_cost_amt_proportion',
      key: 'send_cost_amt_proportion',
      className: 'alignCenter',
      render: (text) => text || text === 0 ? <span className='amount'>{`${(text * 100).toFixed(2)}%`}</span> : '-'
    },
  ]

  const handleClick = (e, value) => {
    initSearchValue(e.target.id, value)
  }

  const handleExport = () => {

  }

  return (
    <div>
      <div className='tool-bar'>
        <div className="title">
          <span>库龄结构分析</span>
          <Tooltip placement="top" title='鼠标移入每列的列头将出现该指标的口径解释'>
            <Icon type="exclamation-circle-o" />
          </Tooltip>
        </div>
        <Button onClick={handleExport}>导出</Button>
      </div>
      <Table className='ui-table'
        {...tableProps}
        columns={columns}
        simple
        rowKey={record => record.rowNo}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
