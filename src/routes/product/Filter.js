import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Button, Row, Col, DatePicker, Input, Select, Cascader, Switch, Icon } from 'antd'
import commonStyles from '../../assets/styles/index.less'
import styles from './List.less'

const FormItem = Form.Item
const Option = Select.Option
const Search = Input.Search
const { RangePicker } = DatePicker

const Filter = ({
    onAdd,
    onFilterChange,
    isMore,
    showMore,
    filter,
    form: {
        getFieldDecorator,
        getFieldsValue,
        setFieldsValue,
        resetFields
    },
}) => {
    const handleFields = (fields) => {
        const { enableTime } = fields
        if (enableTime.length) {
            fields.enableTime = [enableTime[0].format('YYYY-MM-DD HH:mm:ss'), enableTime[1].format('YYYY-MM-DD HH:mm:ss')]
        }
        return fields
    }


    const handleReset = () => {
        // const fields = getFieldsValue()
        // fields.productTypeId = ""
        // fields.status = ""
        // fields.redemptionType =""
        // fields.productName = ""
        // fields.enableTime = ""
        // setFieldsValue(fields)
        // onFilterChange({})
        resetFields()
    }

    // const handleRedemptionTypeChange = (value) => {
    //     //  console.info("fileter Redemption=> ", value)
    //     let toFilter = getAllCurFields()
    //     toFilter.redemptionType = Number(value)
    //     onFilterChange(toFilter)
    // }

    // const handleStatusChange = (value) => {
    //     // console.info("fileter status=> ", value)
    //     let toFilter = getAllCurFields()
    //     toFilter.status = Number(value)
    //     onFilterChange(toFilter)
    // }

    // const handleProductTypeId = (value) => {
    //     // console.info("fileter producttypeid=> ", value)
    //     let toFilter = getAllCurFields()
    //     toFilter.productTypeId = Number(value)
    //     onFilterChange(toFilter)
    // }

    const handleSubmit = (value) => {
        console.info("handle submit")
        let toFilter = getAllCurFields()
        onFilterChange(toFilter)
    }

    // const onDateChange = (value, dateString) => {
    //     let toFilter = getAllCurFields()
    //     toFilter.enableTimeBegin = new Date(dateString[0]).getTime()
    //     toFilter.enableTimeEnd = new Date(dateString[1]).getTime()
    //     // console.info("handle DateChange")
    //     onFilterChange(toFilter)
    // }

    const getAllCurFields = () => {
        let fields = getFieldsValue()
        // fields[key] = values
        let toFilter = {}

        if (fields.productName) {
            toFilter.name = fields.productName
        }
        if (fields.enableTime) {
            toFilter.enableTimeBegin = new Date(fields.enableTime[0]).getTime()
            toFilter.enableTimeEnd = new Date(fields.enableTime[1]).getTime()
        }

        if (fields.productTypeId !== "") {
            toFilter.productTypeId = fields.productTypeId
        }
        if (fields.status !== "") {
            toFilter.status = Number(fields.status)
        }
        if (fields.redemptionType != "") {
            toFilter.redemptionType = Number(fields.redemptionType)
        }
        return toFilter
    }
    const { name, address } = filter

    let initialenableTime = []
    if (filter.enableTime && filter.enableTime[0]) {
        initialenableTime[0] = moment(filter.enableTime[0])
    }
    if (filter.enableTime && filter.enableTime[1]) {
        initialenableTime[1] = moment(filter.enableTime[1])
    }

    let ptypes = []
    const ptypesList = filter.product.ptypesList;
    for (let i = 0; i < ptypesList.length; i++) {
        ptypes.push(<Option key={ptypesList[i].id}>{ptypesList[i].name}</Option>)
    }

    /* 回车搜索 */
    const searchKeyup = (e) => {
        switch(e.keyCode){
            //回车 keycode: 13
            case 13:
                handleSubmit()
                break
            default:
                break
        }
    }

    return (
        <div>
            <Form className={commonStyles.searchForm} onKeyUp={searchKeyup}>
                <FormItem label="产品名称">
                    {getFieldDecorator('productName')(
                        <Input className={styles.fmInput} />
                    )}
                </FormItem>
                <FormItem label="产品类型">
                    {getFieldDecorator('productTypeId', { initialValue: '' })(
                        <Select>
                            <Option value="">所有</Option>
                            {ptypes}
                        </Select>
                    )}
                </FormItem>
                <FormItem label="状态">
                    {getFieldDecorator('status', { initialValue: '' })(
                        <Select>
                            <Option value="">所有</Option>
                            <Option value="0">未启用</Option>
                            <Option value="1">启用</Option>
                            <Option value="2">停用</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="赎回方式">
                    {getFieldDecorator('redemptionType', { initialValue: '' })(
                        <Select>
                            <Option value=''>所有</Option>
                            <Option value="0">现金还款</Option>
                            <Option value="1">赊销+浮动质押</Option>
                        </Select>
                    )}
                </FormItem>
                {isMore &&
                    <FormItem label="启用日期" className='dateWrap'>
                        {getFieldDecorator('enableTime')(
                            <RangePicker size="large" format="YYYY/MM/DD" />
                        )}
                    </FormItem>
                }
                <FormItem className={commonStyles.btnWrap}>
                    <a href='javaScript:void(0);' className='blueBtn' onClick={showMore}>更多<Icon type='down' /></a>
                    <Button className='antdIcon-btn ant-btn-primary' onClick={handleSubmit}><Icon type='search' />搜索</Button>
                    <Button onClick={handleReset}>重置</Button>
                </FormItem>
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
