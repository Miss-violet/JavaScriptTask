import React from 'react'
import { Icon } from 'antd';
import moment from 'moment'

class MonthsPicker extends React.Component {
    constructor(props) {
        super(props)
        const curYear = moment().format('YYYY')
        const curMonth = moment().format('MM')
        const iniSeletedYear = moment().subtract(1, 'month').format('YYYYMM')
        let { value } = this.props
        let startDate = iniSeletedYear
        let endData = iniSeletedYear
        if (Array.isArray(value)) {
            startDate = value[0]
            endData = value[1]
        }

        this.state = {
            curYear: curYear,
            curMonth: curMonth,
            selectedYear: curYear,
            selectedDate: [startDate, endData],
            isShowPanel: false
        }
    }

    componentWillUpdate() {
        // 将已选的月份置为未选状态
        let cell = document.querySelectorAll('.ant-calendar-month-panel-selected-cell')
        cell.forEach((item) => {
            item.className = 'ant-calendar-month-panel-cell'
        })
    }

    componentDidUpdate() {
        const { selectedYear, curYear, curMonth, isShowPanel, selectedDate } = this.state

        this.addDisabled(selectedYear, curYear, curMonth)
        if (isShowPanel) this.setSelected(selectedDate)
    }

    // 月份选择面板
    renderMonthPanel() {
        let monthPanelBody = []
        for (let i = 0; i < 12; i += 3) {
            monthPanelBody.push(
                <tr role='row' key={i}>
                    <td role='gridcell' title={`${i + 1}月`} id={i + 1} className='ant-calendar-month-panel-cell'>
                        <a onClick={this.handleSelect.bind(this)} className="ant-calendar-month-panel-month">{`${i + 1}月`}</a>
                    </td>
                    <td role='gridcell' title={`${i + 2}月`} id={i + 2} className='ant-calendar-month-panel-cell'>
                        <a onClick={this.handleSelect.bind(this)} className="ant-calendar-month-panel-month">{`${i + 2}月`}</a>
                    </td>
                    <td role='gridcell' title={`${i + 3}月`} id={i + 3} className='ant-calendar-month-panel-cell'>
                        <a onClick={this.handleSelect.bind(this)} className="ant-calendar-month-panel-month">{`${i + 3}月`}</a>
                    </td>
                </tr>
            )
        }
        return monthPanelBody
    }

    // 年份选择面板
    renderYearPanel() {
        let yearPanelBody = []
        let startYear = Number(moment().format('YYYY').slice(0, 3) + '0')
        for (let i = 0; i < 12; i += 3) {
            yearPanelBody.push(
                <tr role='row' key={i}>
                    <td role='gridcell' title={startYear + i} className='ant-calendar-month-panel-cell'>
                        <a className="ant-calendar-month-panel-month">{startYear + i}</a>
                    </td>
                    <td role='gridcell' title={startYear + i + 1} className='ant-calendar-month-panel-cell'>
                        <a className="ant-calendar-month-panel-month">{startYear + i + 1}</a>
                    </td>
                    <td role='gridcell' title={startYear + i + 2} className='ant-calendar-month-panel-cell'>
                        <a className="ant-calendar-month-panel-month">{startYear + i + 2}</a>
                    </td>
                </tr>
            )
        }
        return yearPanelBody
    }

    // 上一年
    preYear() {
        let { selectedYear, curYear, curMonth } = this.state
        selectedYear--

        this.setState({
            selectedYear
        })

        this.removeDisabled(selectedYear, curYear)
    }

    // 下一年
    nextYear() {
        let { selectedYear, curYear, curMonth } = this.state
        selectedYear++
        if (selectedYear > curYear) selectedYear = curYear
        this.setState({
            selectedYear
        })

        this.addDisabled(selectedYear, curYear, curMonth)
    }

    // 点击选择月份
    handleSelect(event) {
        let parentNode = event.target.parentNode
        let parentClassName = event.target.parentNode.className
        let selectedMonth = this.formatMonth(parentNode.id)
        let { selectedDate, selectedYear } = this.state
        parentNode.className = 'ant-calendar-month-panel-cell ant-calendar-month-panel-selected-cell'

        // 选择两日期后关闭选择面板
        if (selectedDate.length >= 2) selectedDate = []
        selectedDate.push(selectedYear + selectedMonth)
        selectedDate.sort()

        if (selectedDate.length >= 2) {
            const { onChange } = this.props
            if (onChange) {
                onChange(selectedDate)
            }
            this.setState({
                selectedDate,
                isShowPanel: false
            })
        } else {
            this.setState({
                selectedDate
            })
        }
    }

    // 将月份按钮置为不可以选状态
    addDisabled(selectedYear, curYear, curMonth) {
        if (Number(selectedYear) === Number(curYear)) {
            const cell = document.querySelectorAll('.ant-calendar-month-panel-cell')
            cell.forEach((item) => {
                if (Number(item.id) > Number(curMonth)) {
                    item.childNodes[0].setAttribute('disabled', true)
                }
            })
        }
    }

    // 将按钮置为可选状态
    removeDisabled(selectedYear, curYear) {
        const cell = document.querySelectorAll('.ant-calendar-month-panel-month')
        cell.forEach((item) => {
            if (Number(selectedYear) !== Number(curYear)) {
                item.removeAttribute("disabled")
            }
        })
    }

    // 将已选的日期设成已选状态
    setSelected(dateArr) {
        let [startDate = '', endData = ''] = dateArr

        let startYear = 0
        if (startDate) startYear = Number(startDate.slice(0, 4))

        let endYear = 0
        if (endData) endYear = Number(endData.slice(0, 4))

        let { selectedYear } = this.state
        if (Number(selectedYear) === startYear) {
            let startMonth = Number(startDate.slice(4))
            let node = document.getElementById(`${startMonth}`)
            node.className = 'ant-calendar-month-panel-cell ant-calendar-month-panel-selected-cell'
        }
        if (Number(selectedYear) === endYear) {
            let endMonth = Number(endData.slice(4))
            let node = document.getElementById(`${endMonth}`)
            node.className = 'ant-calendar-month-panel-cell ant-calendar-month-panel-selected-cell'
        }
    }

    formatMonth(num) {
        let month = String(num).slice(0, 2)
        if (month.length < 2) month = '0' + month
        return month
    }

    formatData(date) {
        if (date) return date.slice(0, 4) + '/' + date.slice(4)
        return
    }

    handlePanel() {
        let { isShowPanel } = this.state

        this.addDisabled()
        this.setState({
            isShowPanel: !isShowPanel
        })
    }

    render() {
        const { selectedDate, selectedYear, curYear, isShowPanel } = this.state
        // 点击年份选择面板之外的区域隐藏年份面板
        document.onclick = (event) => {
            const { isShowPanel } = this.state
            if (!isShowPanel) return
            let target = event.target
            let hide = false
            while (target.tagName !== 'BODY') {
                if (target.className === 'ant-calendar-month-panel') {
                    hide = false
                    return false
                }
                target = target.parentNode
                hide = true
            }
            if (hide) {
                this.handlePanel()
            }
        }

        return (
            <div>
                <span className='ant-calendar-picker' onClick={this.handlePanel.bind(this)}>
                    <span className='ant-calendar-picker-input ant-input'>
                        <input disabled value={selectedDate.length === 2 ? this.formatData(selectedDate[0]) : ''} placeholder="开始日期" className="ant-calendar-range-picker-input" style={{ cursor: 'pointer' }} />
                        <span className="ant-calendar-range-picker-separator"> ~ </span>
                        <input disabled value={selectedDate.length === 2 ? this.formatData(selectedDate[1]) : ''} placeholder="结束日期" className="ant-calendar-range-picker-input" style={{ cursor: 'pointer' }} />
                    </span>
                </span>
                {isShowPanel &&
                    <div className='ant-calendar-picker-container ant-calendar-picker-container-placement-bottomLeft'>
                        <div className='ant-calendar ant-calendar-month' tabIndex='0'>
                            <div className='ant-calendar-month-panel'>
                                <div>
                                    <div className='ant-calendar-month-panel-header'>
                                        <a className="ant-calendar-month-panel-prev-year-btn" role="button" title="上一年" onClick={this.preYear.bind(this)}></a>
                                        <a className="ant-calendar-month-panel-year-select" role="button" title="选择年份">
                                            <span className="ant-calendar-month-panel-year-select-content">{selectedYear}</span>
                                            <span className="ant-calendar-month-panel-year-select-arrow">x</span>
                                        </a>
                                        {Number(selectedYear) !== Number(curYear) && <a className="ant-calendar-month-panel-next-year-btn" role="button" title="下一年" onClick={this.nextYear.bind(this)}></a>}
                                    </div>
                                    <div className='ant-calendar-month-panel-body'>
                                        <table className='ant-calendar-month-panel-table' cellSpacing='0' role='grid'>
                                            <tbody className='ant-calendar-month-panel-tbody'>
                                                {this.renderMonthPanel()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
}

export default MonthsPicker;