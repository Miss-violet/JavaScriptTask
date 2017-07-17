import React from 'react'
import PropTypes from 'prop-types'
import commonStyles from '../../assets/styles/index.less'
import { Form, Button, Input, Select, Icon, TreeSelect, DatePicker } from 'antd'        /* 日期控件，页面初始化时选的是月，需要把DatePicker引进来 */
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker'
import moment from 'moment'

import MultiSelect from '../../components/MultiSelect/MultiSelect'

const { MonthPicker } = DatePicker    /* 日期控件，页面初始化时选的是月，需要把MonthPicker引进来 */

const FormItem = Form.Item
const Option = Select.Option
const SHOW_PARENT = TreeSelect.SHOW_PARENT

const Filter = ({
    brand_name,
    lw_name,
    onSearch,
    onAdd,
    form: {
        getFieldDecorator,
        getFieldValue,
        getFieldsValue,
        setFieldsValue,
    },
}) => {
    const handleOnSearch = () => {
        document.body.click()

        let fields = getFieldsValue(),
            brand_id = fields.brand_id,
            logic_warehouse_type_id = fields.logic_warehouse_type_id,
            logical_warehouse_id = fields.logical_warehouse_id

        /* 因为是多选，传值时把数组转换成字符串 */
        fields.brand_id = brand_id ? brand_id.checkedList.join(',') : '-1'
        fields.logical_warehouse_id = logical_warehouse_id ? logical_warehouse_id.checkedList.join(',') : '-1'
        fields.logic_warehouse_type_id = logic_warehouse_type_id ? logic_warehouse_type_id.checkedList.join(',') : '-1'

        /* 对时间进行处理 */
        if (fields.date.select !== 'month') {
            fields.start_time = fields.date.pickerValue[0].format('YYYYMMDD')
            fields.end_time = fields.date.pickerValue[1].format('YYYYMMDD')
        } else {
            fields.query_unit = 'month'
            fields.start_time = fields.date.pickerValue.format('YYYYMMDD')
            fields.end_time = fields.date.pickerValue.format('YYYYMMDD')
        }

        if (brand_id && brand_id.checkedList.length < 1) {
            fields.brand_id = '-1'
        }

        if (!logic_warehouse_type_id && logic_warehouse_type_id !== 0) fields.logic_warehouse_type_id = '-1'
        if (!logical_warehouse_id && logical_warehouse_id !== 0) fields.logical_warehouse_id = '-1'

        onSearch(fields)
    }
    const brandProps = {
        selectData: brand_name,         //selectData是关键字，不能省略
        placeholder: '请选择品牌'
    }
    const lw_nameProps = {
        selectData: lw_name,
        placeholder: '请选择仓库',
    }

    const lw_type = [
        {
            label: '自有',
            value: '自有',
            key: '1'
        }, {
            label: '代发',
            value: '代发',
            key: '2'
        }, {
            label: '代采',
            value: '代采',
            key: '3'
        }, {
            label: '质押',
            value: '质押',
            key: '4'
        },
    ]

    const lw_typeProps = {
        selectData: lw_type,
        placeholder: '请选择仓库类型',
    }

    const dateFormat = 'YYYY/MM/DD',
        now = moment().format(dateFormat),
        recent30 = moment().subtract(30, 'days').format(dateFormat),
        /* 初始化时，时间默认选月，需要加上这两个变量，用来定义pickerValue和pickerFormat */
        month = moment(moment().format(monthFormat), monthFormat),
        monthFormat = 'YYYY/MM'
    return (
        <div>
            <Form className={commonStyles.searchFilterForm}>
                <div className="dateFilter">
                    <div className="filter">筛选条件</div>
                    <div className='specialItem'>
                        <FormItem className='selectLabel'>
                            {
                                getFieldDecorator('date', {
                                    /* 以下是初始化时，时间默认选最近30天 */
                                    initialValue: {
                                        select: 'recent30',
                                        pickerValue: [moment(recent30, dateFormat), moment(now, dateFormat)],
                                    }

                                    /* 以下是初始化时，时间默认选月 */
                                    // initialValue: {
                                    //     select: 'month',
                                    //     pickerValue: month,
                                    //     pickerFormat: monthFormat,
                                    //     pickerType: MonthPicker,
                                    // }
                                })(
                                    <DateRangePicker />
                                    )
                            }
                        </FormItem>
                    </div>
                </div>
                <div className={commonStyles.searchForm}>
                    <FormItem label='品牌'>
                        {
                            getFieldDecorator('brand_id')(
                                <MultiSelect {...brandProps} />
                            )
                        }
                    </FormItem>
                    <FormItem label='仓库'>
                        {
                            getFieldDecorator('logical_warehouse_id')(
                                <MultiSelect {...lw_nameProps} />
                            )
                        }
                    </FormItem>
                    <FormItem label='仓库类型'>
                        {
                            getFieldDecorator('logic_warehouse_type_id')(
                                <MultiSelect {...lw_typeProps} />
                            )
                        }
                    </FormItem>
                    <FormItem className={commonStyles.btnWrap}>
                        <Button className='antdIcon-btn ant-btn-primary' onClick={handleOnSearch}><Icon type='search' />搜索</Button>
                    </FormItem>
                </div>
            </Form>
        </div>
    )
}

Filter.propTypes = {
    onAdd: PropTypes.func,
    onSearch: PropTypes.func,
    form: PropTypes.object,
    filter: PropTypes.object,
}

export default Form.create()(Filter)
