import React from 'react'
import PropTypes from 'prop-types'
import { Form, Table, Popconfirm, Button, Icon, Checkbox, Modal, Tooltip } from 'antd'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { ENTERPRISE_TYPE } from '../../utils/globaldef'
import commonStyles from '../../assets/styles/index.less'
import styles from './list.less'

/* 该列配置是针对字段太多，需要分类的列配置 */
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
    const searchInfo = listProps.searchInfo
    const handleOrder = listProps.handleOrder
    const options = [
        { label: '款号', value: 'pattern' },
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
    const options1 = [
        { label: '款号', value: 'pattern' },
        { label: '损益总数', value: 'profit_loss' },
        { label: '损益总数（良品）', value: 'good_profit_loss' },
        { label: '损益总数（不良品）', value: 'def_profit_loss' },
        { label: '财务盘点损益数', value: 'fin_profit_loss' },
        { label: '财务盘点损益数（良品）', value: 'fin_good_profit_loss' },
        { label: '财务盘点损益数（不良品）', value: 'fin_def_profit_loss' },
    ];

    const options2 = [
        { label: '仓库盘点损益数', value: 'wh_profit_loss' },
        { label: '仓库盘点损益数（良品）', value: 'wh_good_profit_loss' },
        { label: '仓库盘点损益数（不良品）', value: 'wh_def_profit_loss' },
        { label: '调拨损益数', value: 'allot_profit_loss' },
        { label: '调拨损益数（良品）', value: 'allot_good_profit_loss' },
        { label: '调拨损益数（不良品）', value: 'allot_def_profit_loss' },
        { label: '属性转移损益数（良品）', value: 'trans_good_profit_loss' },
        { label: '属性转移损益数（不良品）', value: 'trans_def_profit_loss' }
    ];

    let columnsData = modalProps.columnsData
    let fields = getFieldsValue()

    if (fields.colConfigObj1 && fields.colConfigObj2) {
        columnsData = [
            ...fields.colConfigObj1,
            ...fields.colConfigObj2
        ]
    }

    //判断列是否显示
    const showOrHidden = (colValue) => {
        if (columnsData.indexOf(colValue) === -1) {
            return 'hiddenCol'
        } else {
            return colValue
        }
    }

    //动态生成表格列+设置特殊列（render()+排序）
    const columns = options.map(item => {
        if (item.value === 'pattern') {
            return {
                title: '商品信息',
                dataIndex: item.value,
                key: item.value,
                className: showOrHidden(item.value),
                render: (text, record) => {
                    return <div className='goodsInfo'>
                        <Tooltip placement="top" title={`${record.goods_name}`} >
                            <div className="imgWrap">
                                <img src="" alt="img" />
                            </div>
                        </Tooltip>
                        <Link>{record.pattern}</Link>
                    </div>
                }
            }
        }
        if (item.value === 'profit_loss') {
            return {
                title: <span id={item.value} onClick={handleOrder}>{item.label}</span>,
                dataIndex: item.value,
                key: item.value,
                sorter: true,
                sortOrder: searchInfo.order_index === item.value ? `${searchInfo.order_sort}end` : '',
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
    /* 点任意地方关闭 */
    document.onclick = (event) => {
        let target = event.target, hidden = true
        while (target.tagName !== 'BODY') {
            if (target.className.indexOf('ant-modal') > -1) {
                hidden = false
                break
            }
            target = target.parentNode
        }
        if (hidden) {
            modalProps.onCancel()
        }
    }

    return (
        <div className='f-relative'>
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
                    <div className="optionsTitle">选项1</div>
                    {
                        getFieldDecorator('colConfigObj1', {
                            initialValue: ['pattern', 'goods_name', 'profit_loss', 'good_profit_loss', 'fin_profit_loss',]
                        })(
                            <CheckboxGroup options={options1} />
                            )
                    }
                </FormItem>
                <FormItem>
                    <div className="optionsTitle">选项2</div>
                    {
                        getFieldDecorator('colConfigObj2', {
                            initialValue: ['wh_profit_loss', 'allot_profit_loss']
                        })(
                            <CheckboxGroup options={options2} />
                            )
                    }
                </FormItem>

            </Modal>
            <Table className='ui-table colConfig-table'
                {...listProps}
                columns={columns}
                rowKey={record => record.id}
                />
        </div>
    )
}

List.propTypes = {
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    form: PropTypes.object,
}

export default Form.create()(List)

