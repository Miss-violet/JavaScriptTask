import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select, DatePicker } from 'antd'
import moment from 'moment'
import datePicker from './DateRangePicker.less'


const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const dateFormat = 'YYYY/MM/DD',
    monthFormat = 'YYYY/MM'

const now = moment().format(dateFormat),                            //今天
    recent1 = moment().subtract(1, 'days').format(dateFormat),    //1天之前
    recent7 = moment().subtract(7, 'days').format(dateFormat),    //7天之前
    recent30 = moment().subtract(30, 'days').format(dateFormat),  //30天之前
    month = moment(moment().format(monthFormat), monthFormat)     //本月

class DateRangePicker extends Component {

    constructor(props) {
        super(props)

        const value = this.props.value || {}

        this.state = {
            select: '',                             // 下拉框的值
            pickerFormat: dateFormat,               // 日期组件的日期格式（天-YYYY/MM/DD，月-YYYY/MM）
            pickerType: RangePicker,                // 日期组件的类型（选天-RangePicker，选月-MonthPicker）
            pickerValue: '',                        // 日期控件里的值
        }
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }
    }

    /* 下拉框的change事件 */
    changePickerType = (e) => {         // e是下拉框选中时的value
        const select = e

        this.triggerChange({ select })
    }

    /* 日期组件的选中事件 */
    pickerChange = (datas, dataStrings) => {
        const pickerValue = datas

        this.triggerChange({ pickerValue })
    }

    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange

        /* 根据下拉框的选项值，修改对应的state */
        if (changedValue.select === 'recent1') {
            this.setState({
                select: 'recent1',
                pickerFormat: dateFormat,
                pickerType: RangePicker,
                pickerValue: [moment(recent1, dateFormat), moment(now, dateFormat)],
            },
                () => {
                    onChange(Object.assign({}, this.state, changedValue))
                })
        }
        if (changedValue.select === 'recent7') {
            this.setState({
                select: 'recent7',
                pickerFormat: dateFormat,
                pickerType: RangePicker,
                pickerValue: [moment(recent7, dateFormat), moment(now, dateFormat)],
            },
                () => {
                    onChange(Object.assign({}, this.state, changedValue))
                })
        }
        if (changedValue.select === 'recent30') {
            this.setState({
                select: 'recent30',
                pickerFormat: dateFormat,
                pickerType: RangePicker,
                pickerValue: [moment(recent30, dateFormat), moment(now, dateFormat)],
            },
                () => {
                    onChange(Object.assign({}, this.state, changedValue))
                })
        }
        if (changedValue.select === 'day') {
            this.setState({
                select: 'day',
                pickerFormat: dateFormat,
                pickerType: RangePicker,
                pickerValue: ''
            },
                () => {
                    onChange(Object.assign({}, this.state, changedValue))
                })
        }
        if (changedValue.select === 'month') {
            this.setState({
                select: 'month',
                pickerFormat: monthFormat,
                pickerType: MonthPicker,
                pickerValue: month,
            },
                () => {
                    onChange(Object.assign({}, this.state, changedValue))
                })
        }

        /* 日期组件的选中事件 */
        if (changedValue.pickerValue && this.state.pickerType === RangePicker) {
            this.setState({
                select: 'day',
                value: changedValue.pickerValue,
            },
                () => {
                    onChange(Object.assign({}, this.state, changedValue))
                })
        }
        if (changedValue.pickerValue && this.state.pickerType === MonthPicker) {
            this.setState({
                select: 'month',
                value: changedValue.pickerValue,
            },
                () => {
                    onChange(Object.assign({}, this.state, changedValue))
                })
        }

    }

    render() {
        return (
            <div>
                <Select value={this.state.select} className={datePicker.rangeSelect} onChange={this.changePickerType}>
                    <Option value="recent1">最近1天</Option>
                    <Option value="recent7">最近7天</Option>
                    <Option value="recent30">最近30天</Option>
                    <Option value="day">自定义</Option>
                    <Option value="month">月</Option>
                </Select>
                <this.state.pickerType value={this.state.pickerValue} format={this.state.pickerFormat} onChange={this.pickerChange} />
            </div>
        )
    }
}

export default DateRangePicker