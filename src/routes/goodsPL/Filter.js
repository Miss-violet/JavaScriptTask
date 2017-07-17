import React from 'react'
import PropTypes from 'prop-types'
import commonStyles from '../../assets/styles/index.less'
import { Form, Button, Input, Select, TreeSelect, Icon } from 'antd'
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker'
import moment from 'moment'


const FormItem = Form.Item
const Option = Select.Option

const Filter = ({
    brandList,
    warehouseList,
    onSearch,
    filter,
    form: {
        getFieldDecorator,
        getFieldsValue,
        setFieldsValue,
        resetFields,
    },
}) => {
    const handleSearch = () => {
        let fields = getFieldsValue()
        fields[fields.labelType] = fields.goodsInfo
        fields.brand_id = fields.brand_id ? fields.brand_id.join(',') : '-1'
        fields.logic_warehouse_id = fields.logic_warehouse_id ? fields.logic_warehouse_id.join(',') : '-1'
        fields.logic_warehouse_type_id = fields.logic_warehouse_type_id ? fields.logic_warehouse_type_id.join(',') : '-1'

        //判断是否为空值
        if (!fields.brand_id) {
            fields.brand_id = '-1'
        }
        if (!fields.logic_warehouse_id) {
            fields.logic_warehouse_id = '-1'
        }
        if (!fields.logic_warehouse_type_id) {
            fields.logic_warehouse_type_id = '-1'
        }

        if (fields.date.select !== 'month') {
            fields.start_time = fields.date.pickerValue[0] ? fields.date.pickerValue[0].format('YYYYMMDD') : ''
            fields.end_time = fields.date.pickerValue[1] ? fields.date.pickerValue[1].format('YYYYMMDD') : ''
        } else {
            fields.query_unit = 'month'
            fields.start_time = fields.date.pickerValue.format('YYYYMMDD')
            fields.end_time = fields.date.pickerValue.format('YYYYMMDD')
        }

        delete fields.labelType
        delete fields.goodsInfo
        delete fields.date

        onSearch(fields)
    }
    const handleReset = () => {
        resetFields()
    }

    const brandProps = {
        treeData: brandList,
        treeCheckable: true,
        allowClear: true,
        searchPlaceholder: '请选择'
    };
    const warehouseProps = {
        treeData: warehouseList,
        treeCheckable: true,
        allowClear: true,
        searchPlaceholder: '请选择'
    };
    const warehouseTypeList = [
        {
            label: '自有仓库',
            value: '0',
            key: '0',
        },
        {
            label: '代发仓库',
            value: '1',
            key: '1',
        },
        {
            label: '代采仓库',
            value: '2',
            key: '2',
        },
        {
            label: '质押仓库',
            value: '3',
            key: '3',
        },
        {
            label: '代销仓库',
            value: '4',
            key: '4',
        },
        {
            label: '虚拟仓库',
            value: '5',
            key: '5',
        }
    ]
    const warehouseTypeProps = {
        treeData: warehouseTypeList,
        treeCheckable: true,
        allowClear: true,
        searchPlaceholder: '请选择'
    }

    const dateFormat = 'YYYY/MM/DD',
        now = moment().format(dateFormat),
        recent30 = moment().subtract(30, 'days').format(dateFormat)

    return (
        <div>
            <Form className={commonStyles.searchFilterForm}>
                <div className="dateFilter">
                    <div className="filter">筛选条件</div>
                    <div className='specialItem'>
                        <FormItem className='selectLabel'>
                            {
                                getFieldDecorator('date', {
                                    initialValue: {
                                        select: 'recent30',
                                        pickerValue: [
                                            moment(recent30, dateFormat),
                                            moment(now, dateFormat)
                                        ]
                                    }
                                })(
                                    <DateRangePicker />
                                    )
                            }
                        </FormItem>
                    </div>
                </div>
                <div className={commonStyles.searchForm}>
                    <div className={commonStyles.filter}>
                        <div className='specialItem'>
                            <FormItem className='selectLabel'>
                                {
                                    getFieldDecorator('labelType', {
                                        initialValue: 'pattern'
                                    })(
                                        <Select>
                                            <Option value="pattern">款号</Option>
                                            <Option value="goods_name">商家名称</Option>
                                        </Select>
                                        )
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('goodsInfo', {
                                        initialValue: ''
                                    })(
                                        <Input />
                                        )
                                }
                            </FormItem>
                        </div>
                        <FormItem label='品牌'>
                            {
                                getFieldDecorator('brand_id')(
                                    <TreeSelect {...brandProps} />
                                )
                            }
                        </FormItem>
                        <FormItem label='仓库'>
                            {
                                getFieldDecorator('logic_warehouse_id')(
                                    <TreeSelect {...warehouseProps} />
                                )
                            }
                        </FormItem>
                        <FormItem label='仓库类型'>
                            {
                                getFieldDecorator('logic_warehouse_type_id')(
                                    <TreeSelect {...warehouseTypeProps} />
                                )
                            }
                        </FormItem>
                    </div>
                    <FormItem className={commonStyles.btnWrap}>
                        <Button className='antdIcon-btn ant-btn-primary' onClick={handleSearch}><Icon type='search' />搜索</Button>
                        <Button onClick={handleReset}>重置</Button>
                    </FormItem>
                </div>
            </Form>
        </div>
    )
}

Filter.propTypes = {
    onAdd: PropTypes.func,
    form: PropTypes.object,
    filter: PropTypes.object,
    onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
