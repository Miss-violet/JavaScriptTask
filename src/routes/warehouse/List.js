import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm, Icon, Button, Modal, Checkbox, Form, Tooltip } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'
import { WAREHOUSE_TYPE } from '../../utils/globaldef'
import commonStyles from '../../assets/styles/index.less'

const CheckboxGroup = Checkbox.Group
const FormItem = Form.Item

const List = ({
  handleOrder,
  onChange,
  isShowModal,
  searchInfo,
  dispatch,
  ...tableProps,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
    resetFields,
  },
}) => {

  const options = [
    { label: '款号', value: 'pattern' },
    { label: '商品名称', value: 'goods_name' },
    { label: '损益总数', value: 'profit_loss' },
    { label: '损益总数（良品）', value: 'good_profit_loss' },
    { label: '损益总数（不良品）', value: 'def_profit_loss' },
    { label: '财务盘点损益数', value: 'fin_profit_loss' },
    { label: '财务盘点损益数（良品）', value: 'fin_good_profit_loss' },
    { label: '财务盘点损益数（不良品）', value: 'fin_def_profit_loss' },
    { label: '仓库盘点损益数', value: 'wh_profit_loss' },
    { label: '仓库盘点损益数（良品）', value: 'wh_good_profit_loss' },
    { label: '仓库盘点损益数（不良品）', value: 'wh_def_profit_loss' },
    { label: '调拨损益数', value: 'allot_profit_loss' },
    { label: '调拨损益数（良品）', value: 'allot_good_profit_loss' },
    { label: '调拨损益数（不良品）', value: 'allot_def_profit_loss' },
    { label: '属性转移损益数（良品）', value: 'trans_good_profit_loss' },
    { label: '属性转移损益数（不良品）', value: 'trans_def_profit_loss' }
  ];

  let columnsData
  let fields = getFieldsValue()
  columnsData = {
    ...fields
  }

  //判断列是否显示
  const showOrHidden = (colValue) => {
    for (let index in columnsData) {
      if (columnsData[index].indexOf(colValue) === -1) {
        return 'hiddenCol'
      }
    }
  }

  //动态生成表格列+设置特殊列（render()+排序）
  const columns = options.map(item => {
    if (item.value === 'profit_loss' || item.value === 'pattern') {
      return {
        title: <span id={item.value} onClick={handleOrder}>{item.label}</span>,
        dataIndex: item.value,
        key: item.value,
        sorter: true,
        sortOrder: searchInfo.order_index === item.value ? `${searchInfo.order_sort}end` : '',
        className: showOrHidden(item.value),
        render: (text) => {
          return <span className={item.value === 'profit_loss' ? 'amount' : ''}>{text}</span>
        }
      }
    }
    return {
      title: item.label,
      dataIndex: item.value,
      key: item.value,
      className: showOrHidden(item.value),
      render: (text) => {
        if (!Number(text) && text != 0) return text
        return <span className='amount'>{text}</span>
      }
    }
  })
  // console.log('col', columns)

  const handleExport = () => {

  }

  const handleModalVisible = () => {
    dispatch({
      type: 'warehouse/modalVisible'
    })
  }

  return (
    <div>
      <div className='tool-bar'>
        <div className="title">
          <span>商品损益统计</span>
          <Tooltip placement="top" title=''>
            <Icon type="exclamation-circle-o" />
          </Tooltip>
        </div>
        <Button className='antdIcon-btn' onClick={handleModalVisible}><Icon type="filter" />列配置</Button>
        <Button onClick={handleExport}>导出</Button>
      </div>
      <div id='colConfigDialog'></div> {/*指定弹窗挂载的HTML节点*/}
      <Modal
        title=''
        closable={false}
        footer={null}
        wrapClassName='vertical-center-modal ant-colConfig-modal'
        className={commonStyles.colConfigModal}
        visible={isShowModal}
        onOk={handleModalVisible}
        onCancel={handleModalVisible}
        className={commonStyles.colConfigModal}
        okText='确定'
        cancelText='取消'
        getContainer={() => document.getElementById('colConfigDialog')}
      >
        <FormItem>
          {
            getFieldDecorator('colConfig', {
              initialValue: ['pattern', 'goods_name', 'profit_loss', 'good_profit_loss', 'fin_profit_loss', 'wh_profit_loss', 'allot_profit_loss']
            })(
              <CheckboxGroup options={options} />
              )
          }
        </FormItem>
      </Modal>
      <Table className='ui-table colConfig-table'
        {...tableProps}
        onChange={onChange}
        columns={columns}
        simple
        rowKey={record => record.rowNo}
      />
    </div>
  )
}

List.propTypes = {

}

export default Form.create()(List)
