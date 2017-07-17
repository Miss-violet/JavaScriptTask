import React from 'react'
import PropTypes from 'prop-types'
import commonStyles from '../../assets/styles/index.less'
import { Form, Button, Icon, TreeSelect, DatePicker, Select } from 'antd'
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker'
import moment from 'moment'
import classnames from 'classnames'

const FormItem = Form.Item
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker

const Filter = ({
  brandList,
    dispatch,
    initSearchValue,
    form: {
    getFieldDecorator,
        getFieldsValue,
        getFieldValue,
        setFieldsValue,
  },
}) => {

    const handleChange = (changedValue, id) => {
        const fields = getFieldsValue()

        // 入库年份
        if (id === 1) {
            if (changedValue) {
                fields.batch_year = changedValue.format('YYYY')
            } else {
                fields.batch_year = ''
            }
        } else if (fields.batch_year) {
            fields.batch_year = fields.batch_year.format('YYYY')
        }

        // 时间范围
        if (id === 3) {
            if (changedValue.pickerValue) {
                if (changedValue.select === 'month') {
                    let selectMonth = changedValue.pickerValue.format('YYYYMM')
                    let year = selectMonth.slice(0, 4)
                    let month = selectMonth.slice(4)
                    fields.start_time = selectMonth + '01'
                    fields.end_time = moment(new Date(year, month, 0)).format('YYYYMMDD')
                    delete fields.date
                } else {
                    const time = changedValue.pickerValue
                    fields.start_time = time[0].format('YYYYMMDD')
                    fields.end_time = time[1].format('YYYYMMDD')
                    delete fields.date
                }
            } else {
                return
            }
        } else {
            if (fields.date.select === 'month') {
                let selectMonth = fields.date.pickerValue.format('YYYYMM')
                let year = selectMonth.slice(0, 4)
                let month = selectMonth.slice(4)
                fields.start_time = selectMonth + '01'
                fields.end_time = moment(new Date(year, month, 0)).format('YYYYMMDD')
                delete fields.date
            } else {
                const time = fields.date.pickerValue
                fields.start_time = time[0].format('YYYYMMDD')
                fields.end_time = time[1].format('YYYYMMDD')
                delete fields.date
            }
        }

        // 品牌
        if (id === 2) {
            if (Array.isArray(changedValue)) {
                let ids = ''
                changedValue.forEach((item) => {
                    ids += item + ','
                })
                fields.brand_id = ids.slice(0, ids.length - 1)
            }
        } else {
            if (Array.isArray(fields.brand_id)) {
                let ids = ''
                fields.brand_id.forEach((item) => {
                    ids += item + ','
                })
                fields.brand_id = ids.slice(0, ids.length - 1)
            }
        }

        // fields.page_number = '1'
        // fields.page_size = '20'

        fields.uri = 'pss_stock_age'

        for (let key in fields) {
            if (!fields[key]) {
                if (key === 'brand_id') {
                    fields[key] = '-1'
                } else {
                    fields[key] = ''
                }
            }
        }

        // console.log('fields', fields)
        dispatch({
            type: 'producttype/searchInfo',
            payload: {
                ...fields
            }
        })
        dispatch({
            type: 'producttype/query',
            payload: {
                ...fields
            }
        })
    }

    const dateFormat = 'YYYY/MM/DD',
        now = moment().format(dateFormat),
        recent1 = moment().subtract(1, 'days').format(dateFormat)

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
                                // initialValue: initBatchYear
                            })(
                                <TreeSelect
                                    // onChange={(date) => { handleChange(date, 1) }}
                                    placeholder='渠道组'
                                />
                                )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('brand_id', {
                                // initialValue: initBrandName()
                            })(
                                <TreeSelect
                                    // treeData={brandList}
                                    // multiple={true}
                                    // treeCheckable={true}
                                    placeholder='渠道'
                                // onSearch={() => { console.log('ser') }}
                                // onChange={(value) => { handleChange(value, 2) }}
                                />
                                )
                        }
                    </FormItem>
                </div>
                <div className="dateFilter">
                    <div className='specialItem'>
                        <FormItem className='selectLabel'>
                            {
                                getFieldDecorator('date', {
                                    initialValue: {
                                        select: 'recent1',
                                        pickerValue: [moment(recent1, dateFormat), moment(now, dateFormat)],
                                    }
                                })(
                                    <DateRangePicker onChange={(value) => { handleChange(value, 3) }} />
                                    )
                            }
                        </FormItem>
                    </div>
                </div>
            </Form>
        </div>
    )
}

Filter.propTypes = {
    onAdd: PropTypes.func,
    form: PropTypes.object,
}

export default Form.create()(Filter)
