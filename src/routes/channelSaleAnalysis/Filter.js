import React from 'react'
import PropTypes from 'prop-types'
import commonStyles from '../../assets/styles/index.less'
import { Form, Button, Input, Select, TreeSelect, Icon } from 'antd'
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker'
import moment from 'moment'
import classnames from 'classnames'


const FormItem = Form.Item
const Option = Select.Option

const Filter = ({
    brandList,
    warehouseList,
    onFilterChange,
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
        console.log('fields =>', fields)
        fields[fields.labelType] = fields.goodsInfo
        fields.brand_id = fields.brand_id ? fields.brand_id.join(',') : fields.brand_id
        fields.logic_warehouse_id = fields.logic_warehouse_id ? fields.logic_warehouse_id.join(',') : fields.logic_warehouse_id
        fields.logic_warehouse_type_id = fields.logic_warehouse_type_id ? fields.logic_warehouse_type_id.join(',') : fields.logic_warehouse_type_id

        delete fields.labelType
        delete fields.goodsInfo

        onFilterChange(fields)
    }
    const handleReset = () => {
        resetFields()
    }
    const handleChange = (key, values) => {
        let fields = getFieldsValue()
        fields[key] = values
        onFilterChange(fields)
    }

    const brandProps = {
        treeData: brandList,
        multiple: true,
        treeCheckable: true,
        searchPlaceholder: '请选择'
    };
    const warehouseProps = {
        treeData: warehouseList,
        multiple: true,
        treeCheckable: true,
        searchPlaceholder: '请选择'
    };
    const warehouseTypeList = [
        {
            label: '自有仓库',
            value: '1',
            key: '1',
        },
        {
            label: '代发仓库',
            value: '2',
            key: '2',
        },
        {
            label: '代采仓库',
            value: '3',
            key: '3',
        },
        {
            label: '质押仓库',
            value: '4',
            key: '4',
        }
    ]
    const warehouseTypeProps = {
        treeData: warehouseTypeList,
        multiple: true,
        treeCheckable: true,
        searchPlaceholder: '请选择'
    }

    const dateFormat = 'YYYY/MM/DD',
        now = moment().format(dateFormat),
        recent30 = moment().subtract(30, 'days').format(dateFormat)

    const clx = classnames({
        [commonStyles.searchFilterForm]: true,
        [commonStyles.searchSPFilterForm]: true,
    })
    return (
        <div>
            <Form className={clx}>
                <div className='searchWrap'>
                    <FormItem>
                        {
                            getFieldDecorator('batch_year', {
                                initialValue: initBatchYear
                            })(
                                <MonthPicker
                                    format='YYYY'
                                    onChange={(date) => { handleChange(date, 1) } }
                                    placeholder='首批入库年份'
                                    />
                                )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('brand_id', {
                                initialValue: initBrandName()
                            })(
                                <TreeSelect
                                    treeData={brandList}
                                    multiple={true}
                                    treeCheckable={true}
                                    placeholder='品牌'
                                    onSearch={() => { console.log('ser') } }
                                    onChange={(value) => { handleChange(value, 2) } }
                                    />
                                )
                        }
                    </FormItem>
                </div>
                <div className="dateFilter">
                    <div className="filter">筛选条件</div>
                    <div className='specialItem'>
                        <FormItem className='selectLabel'>
                            {
                                getFieldDecorator('date', {
                                    /* 以下是初始化时，时间默认选月 */
                                    initialValue: {
                                        select: 'month',
                                        pickerValue: month,
                                        pickerFormat: monthFormat,
                                        pickerType: MonthPicker,
                                    }
                                })(
                                    <DateRangePicker />
                                    )
                            }
                        </FormItem>
                    </div>
                </div>
                <div className={commonStyles.searchForm}>
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
                    <FormItem label='季节'>
                        {
                            getFieldDecorator('to_market_season')(
                                <TreeSelect {...seasonProps} />
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
                    <FormItem label='上市年份'>
                        {
                            getFieldDecorator('to_market_year')(
                                <TreeSelect {...yearProps} />
                            )
                        }
                    </FormItem>
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
