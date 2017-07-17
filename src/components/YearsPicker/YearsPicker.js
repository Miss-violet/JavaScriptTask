import React from 'react'
import { Icon } from 'antd';
import moment from 'moment'

class YearsPicker extends React.Component {
    constructor(props) {
        super(props)
        const curYear = moment().format('YYYY')
        let { value, placeholder = '' } = this.props
        if (Array.isArray(value)) {
            value = value.map((item) => {
                return String(item)
            })
        } else {
            value = []
        }
        this.state = {
            year: curYear,
            selectedYear: [...value],
            addYear: 0,
            isShowPanel: false,
            placeholder
        }
    }

    componentWillReceiveProps(nextProps) {
        let { value } = nextProps

        if (Array.isArray(value)) {
            value = value.map((item) => {
                return String(item)
            })
            this.setState({
                selectedYear: [...value]
            })
        } else {
            this.setState({
                selectedYear: []
            })
        }
    }

    componentWillUpdate() {
        // 重置面板中已选的按钮
        let cell = document.querySelectorAll('.ant-calendar-month-panel-selected-cell')
        cell.forEach((item) => {
            item.className = 'ant-calendar-month-panel-cell'
        })
    }

    componentDidUpdate() {
        let { selectedYear } = this.state
        let cell = document.querySelectorAll('.ant-calendar-month-panel-cell')
        cell.forEach((item) => {
            selectedYear.forEach((year) => {
                if (item.title === year) {
                    item.className = 'ant-calendar-month-panel-cell ant-calendar-month-panel-selected-cell'
                }
            })
        })
    }

    handleClick(event) {
        const { onChange } = this.props
        const parentNode = event.target.parentNode
        const curSelecteYear = parentNode.title
        let classNames = parentNode.className.split(' ')
        let { selectedYear } = this.state

        // 修改选中的样式
        if (classNames[0] === 'ant-calendar-month-panel-cell') {
            const flag = classNames.some((item) => {
                return item === 'ant-calendar-month-panel-selected-cell'
            })
            if (flag) {
                classNames.pop()
                selectedYear = selectedYear.filter((item) => {
                    return item !== curSelecteYear
                })
            } else {
                classNames.push('ant-calendar-month-panel-selected-cell')
                let esist = selectedYear.some((item) => {
                    return item === curSelecteYear
                })
                if (!esist) {
                    selectedYear.push(curSelecteYear)
                }
            }
            classNames = classNames.join(' ')
            event.target.parentNode.className = classNames
        }

        selectedYear.sort()

        this.setState({
            selectedYear
        })


    }

    // 年份选择面板
    // renderYearPanel(year) {
    //     let yearPanelBody = []
    //     let startYear = Number(moment().format('YYYY'))
    //     for (let i = 0; i < 12; i += 3) {
    //         yearPanelBody.unshift(
    //             <tr role='row' key={i}>
    //                 <td role='gridcell' title={startYear - i - 2 + year} className='ant-calendar-month-panel-cell'>
    //                     <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear - i - 2}</a>
    //                 </td>
    //                 <td role='gridcell' title={startYear - i - 1 + this.state.addYear} className='ant-calendar-month-panel-cell'>
    //                     <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear - i - 1}</a>
    //                 </td>
    //                 <td role='gridcell' title={startYear - i + this.state.addYear} className='ant-calendar-month-panel-cell'>
    //                     <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear - i}</a>
    //                 </td>
    //             </tr>
    //         )
    //     }
    //     return yearPanelBody
    // }

    preYear() {
        let { addYear, year } = this.state
        addYear -= 12
        year -= 12
        this.setState({
            addYear,
            year
        })
    }

    nextYear() {
        let { addYear, year } = this.state
        addYear += 12
        if (addYear > 0) {
            addYear = 0
        } else {
            year += 12
        }
        this.setState({
            addYear,
            year
        })
    }

    handleShow() {
        const { onChange } = this.props
        let { isShowPanel, selectedYear } = this.state
        this.setState({
            isShowPanel: !isShowPanel
        })
        if (isShowPanel) {
            // 将改变后的值传给getFieldDecorator
            if (onChange) onChange(selectedYear)
        }
    }

    render() {
        const { addYear, isShowPanel, selectedYear } = this.state
        const startYear = Number(moment().format('YYYY'))
        // 点击年份选择面板之外的区域隐藏年份面板
        document.onclick = (event) => {
            console.log('dadadf')
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
                this.handleShow()
            }
        }

        return (
            <div>
                <span className='ant-calendar-picker'>
                    <span onClick={this.handleShow.bind(this)} className='ant-calendar-picker-input ant-input'>
                        <input placeholder={this.state.placeholder} disabled value={selectedYear.join(',')} className="ant-calendar-range-picker-input" style={{ cursor: 'pointer', width: '100%' }} />
                    </span>
                </span>
                {isShowPanel &&
                    <div className='ant-calendar-picker-container ant-calendar-picker-container-placement-bottomLeft'>
                        <div className='ant-calendar ant-calendar-month' tabIndex='0'>
                            <div className='ant-calendar-month-panel'>
                                <div>
                                    <div className='ant-calendar-month-panel-header'>
                                        <a className="ant-calendar-month-panel-prev-year-btn" role="button" title="上一年 " onClick={this.preYear.bind(this)}></a>
                                        <a className="ant-calendar-month-panel-year-select" role="button" title="选择年份">
                                            <span className="ant-calendar-month-panel-year-select-content">{`${this.state.year - 11}-${this.state.year}`}</span>
                                            <span className="ant-calendar-month-panel-year-select-arrow">x</span>
                                        </a>
                                        {this.state.addYear !== 0 && <a className="ant-calendar-month-panel-next-year-btn" role="button" title="下一年" onClick={this.nextYear.bind(this)}></a>}
                                    </div>
                                    <div className='ant-calendar-month-panel-body'>
                                        <table className='ant-calendar-month-panel-table' cellSpacing='0' role='grid'>
                                            <tbody className='ant-calendar-month-panel-tbody'>
                                                {/*this.renderYearPanel(this.state.addYear)*/}
                                                <tr role='row'>
                                                    <td role='gridcell' title={startYear + addYear - 11} className='ant-calendar-month-panel-cell'>
                                                        <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear + addYear - 11}</a>
                                                    </td>
                                                    <td role='gridcell' title={startYear + addYear - 10} className='ant-calendar-month-panel-cell'>
                                                        <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear + addYear - 10}</a>
                                                    </td>
                                                    <td role='gridcell' title={startYear + addYear - 9} className='ant-calendar-month-panel-cell'>
                                                        <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear + addYear - 9}</a>
                                                    </td>
                                                </tr>
                                                <tr role='row'>
                                                    <td role='gridcell' title={startYear + addYear - 8} className='ant-calendar-month-panel-cell'>
                                                        <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear + addYear - 8}</a>
                                                    </td>
                                                    <td role='gridcell' title={startYear + addYear - 7} className='ant-calendar-month-panel-cell'>
                                                        <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear + addYear - 7}</a>
                                                    </td>
                                                    <td role='gridcell' title={startYear + addYear - 6} className='ant-calendar-month-panel-cell'>
                                                        <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear + addYear - 6}</a>
                                                    </td>
                                                </tr>
                                                <tr role='row'>
                                                    <td role='gridcell' title={startYear + addYear - 5} className='ant-calendar-month-panel-cell'>
                                                        <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear + addYear - 5}</a>
                                                    </td>
                                                    <td role='gridcell' title={startYear + addYear - 4} className='ant-calendar-month-panel-cell'>
                                                        <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear + addYear - 4}</a>
                                                    </td>
                                                    <td role='gridcell' title={startYear + addYear - 3} className='ant-calendar-month-panel-cell'>
                                                        <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear + addYear - 3}</a>
                                                    </td>
                                                </tr>
                                                <tr role='row'>
                                                    <td role='gridcell' title={startYear + addYear - 2} className='ant-calendar-month-panel-cell'>
                                                        <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear + addYear - 2}</a>
                                                    </td>
                                                    <td role='gridcell' title={startYear + addYear - 1} className='ant-calendar-month-panel-cell'>
                                                        <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear + addYear - 1}</a>
                                                    </td>
                                                    <td role='gridcell' title={startYear + addYear} className='ant-calendar-month-panel-cell'>
                                                        <a onClick={this.handleClick.bind(this)} className="ant-calendar-month-panel-month">{startYear + addYear}</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default YearsPicker;