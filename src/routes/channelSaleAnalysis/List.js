import React from 'react'
import PropTypes from 'prop-types'
import { Form, Table, Popconfirm, Button, Icon, Checkbox, Modal, Tooltip } from 'antd'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { ENTERPRISE_TYPE } from '../../utils/globaldef'
import commonStyles from '../../assets/styles/index.less'
import styles from './list.less'


const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group;

const List = ({
    form: {
        getFieldDecorator,
        getFieldsValue,
        setFieldsValue,
        resetFields,
    },
    ...tableProps
}) => {
    const { listProps, modalProps } = tableProps
    const orderInfo = listProps.orderInfo
    const handleOrder = listProps.handleOrder
    const options = [
        { label: '款号', value: 'pattern' },
        { label: '商品名称', value: 'goods_name' },
        { label: '逻辑仓库', value: 'profit_loss' },
        { label: '期初库存', value: 'good_profit_loss' },
        { label: '期初库存（良品）', value: 'def_profit_loss' },
        { label: '期初库存（不良品）', value: 'fin_profit_loss' },
        { label: '期末库存', value: 'fin_good_profit_loss' },
        { label: '期末库存（良品）', value: 'fin_def_profit_loss' },
        { label: '期末库存（不良品）', value: 'wh_profit_loss' },
        { label: '期初吊牌金额', value: 'wh_good_profit_loss' },
        { label: '期初成本金额', value: 'wh_def_profit_loss' },
        { label: '期末吊牌金额', value: 'allot_profit_loss' },
        { label: '期末成本金额', value: 'allot_good_profit_loss' },
        { label: '入库总数', value: 'allot_def_profit_loss' },
        { label: '入库总成本金额', value: 'trans_good_profit_loss' },
        { label: '出库总数', value: 'trans_def_profit_loss' },
        { label: '期末库存', value: 'fin_good_profit_loss' },
        { label: '期末库存（良品）', value: 'fin_def_profit_loss' },
        { label: '期末库存（不良品）', value: 'wh_profit_loss' },
        { label: '期初吊牌金额', value: 'wh_good_profit_loss' },
        { label: '期初成本金额', value: 'wh_def_profit_loss' },
        { label: '期末吊牌金额', value: 'allot_profit_loss' },
        { label: '期末成本金额', value: 'allot_good_profit_loss' },
        { label: '入库总数', value: 'allot_def_profit_loss' },
        { label: '入库总成本金额', value: 'trans_good_profit_loss' },
        { label: '出库总数', value: 'trans_def_profit_loss' }
    ];
    let columnsData = modalProps.columnsData
    let fields = getFieldsValue()
    columnsData = {
        ...fields
    }
    console.log('col', columnsData)

    //判断列是否显示
    const showOrHidden = (colValue) => {
        for (let index in columnsData) {
            if (columnsData[index].indexOf(colValue) === -1) {
                return 'hiddenCol'
            }
        }
    }

    console.log('orderInfo =>', orderInfo)
    //动态生成表格列+设置特殊列（render()+排序）
    const columns = options.map(item => {
        if (item.value === 'profit_loss') {
            return {
                title: <span onClick={handleOrder}>{item.label}</span>,
                dataIndex: item.value,
                key: item.value,
                sorter: (a, b) => a.profit_loss - b.profit_loss,
                sortOrder: orderInfo.columnkey === 'profit_loss' && orderInfo.order,
                className: showOrHidden(item.value),
                render: (text) => {
                    return <span className='amount'>{text}</span>
                }
            }
        }
        return {
            title: item.label,
            dataIndex: item.value,
            key: item.value,
            className: showOrHidden(item.value),
            render: (text) => {
                if (typeof (text) != "number") return text
                return <span className='amount'>{text}</span>
            }
        }
    })

    return (
        <div>
            <div className='tool-bar'>
                <div className="title">
                    <span>商品损益统计</span>
                    <Tooltip placement="top" title='鼠标移入每列的列头将出现该指标的口径解释'>
                        <Icon type="exclamation-circle-o" />
                    </Tooltip>
                </div>
                <Button className='antdIcon-btn' onClick={modalProps.onShow}><Icon type="filter" />列配置</Button>
                <Button onClick={listProps.onAdd}>导出</Button>
            </div>
            <div id='colConfigDialog'></div> {/*指定弹窗挂载的HTML节点*/}
            <Modal
                {...modalProps}
                className={commonStyles.colConfigModal}
                getContainer={() => document.getElementById('colConfigDialog')}
                onCancel={modalProps.onCancel}
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
                {...listProps}
                columns={columns}
                rowKey={record => record.id}
                />
        </div >
    )
}

List.propTypes = {
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    form: PropTypes.object,
}

export default Form.create()(List)
