/**
 * @name: 多选下拉框
 * @description: 
 * · 多选下拉框，2017/7/17完成一级多选
 * · 父组件需用关键字selectData将下拉框数据传入
 * · 父组件可用关键字placeholder传入下拉框的提示文案
 * @author: wangxj
 * @update: 2017/7/17 19:28
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Input, Button } from 'antd'
import multiSelectStyle from './MultiSelect.less'
import classnames from 'classnames'

/* 键盘key值 */
const keys = {
    ESC: 27,
    TAB: 9,
    RETURN: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,
    SHIFT: 16,
    BackSpace: 8
}

const CheckboxGroup = Checkbox.Group;
let hide = false

class MultiSelect extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            list: props.selectData || [],
            visible: false,
            checkedList: [],            /* 用于多选框组的选中 */
            checkedListName: [],        /* 用于文本框的显示 */
            filterInputValue: '',       /* 过滤文本框的值 */
        })
    }
    static defaultProps = {
        selectData: [],
        initialValue: [],
    }
    componentWillReceiveProps(nextProps) {
        let initialValue = this.props.value,        //初始化的值
            checkedListName = [],
            selectData = nextProps.selectData

        if (initialValue && initialValue.length > 0) {
            selectData.map(listItem => {
                initialValue.map(checkedItem => {
                    if (listItem.value === checkedItem) {
                        checkedListName.push(listItem.label)
                    }
                })
            })
            this.setState({
                checkedList: initialValue,
                checkedListName: checkedListName
            })
        }

        // Should be a controlled component.
        if (nextProps.value) {
            const value = nextProps.value;
            this.setState(value)
        }
    }

    componentDidMount() {
        /* 监听页面的click事件，相当于原来的document.onclick */
        window.addEventListener('click', this.handleClick);
    }

    handleClick = (event) => {
        let target = event.target
        while (target.tagName && target.tagName !== 'BODY') {
            console.info(target, '->', target.tagName)
            if (target.className && target.className.indexOf('multiSelect') > -1 || target.className.indexOf('dropDown') > -1) {
                hide = false
                return false
            }
            target = target.parentNode
            hide = true
        }
        if (hide) {
            this.setState({
                visible: false
            }, () => {
                this.triggerChange()
            })
        }
    }

    /* 多选下拉框获得焦点时，出现下拉框，如果下拉框原本就没有数据，则把数据传入 */
    selectFocus = () => {
        if (this.state.list.length < 1) {
            this.setState({
                list: this.props.selectData,
            })
        }

        this.setState({
            visible: true,
        })
    }

    /* 过滤事件 */
    filterInputValue = (event) => {
        this.setState({
            filterInputValue: event.target.value,
        })
    }
    handleKeyUp = (event) => {
        switch (event.which) {
            case keys.ESC:
            case keys.ENTER:
            case keys.UP:
            case keys.DOWN:
            case keys.LEFT:
            case keys.RIGHT:
            case keys.TAB:
            case keys.SHIFT:
                break
            case keys.BackSpace:
                this.handleFilter(event.target.value)
                break

            default:
                this.handleFilter(event.target.value)
                break
        }
    }
    handleFilter = (search) => {
        let list = this.props.selectData.map(item => { return item.label }),
            reEscape = /^'(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g'$/,
            needle,
            filterItem

        needle = search.trim().toLowerCase().replace(reEscape, '\\$1')

        if (needle) {
            /* 过滤 */
            filterItem = this.props.selectData.filter(item => {
                if (item.label.toString().indexOf(needle) !== -1) {
                    return true
                }
                return false
            })
            this.setState({
                list: filterItem,
            })
        }
        else {
            this.setState({
                list: this.props.selectData,
            })
        }
    }

    /* 多选框绑定的onchange事件 */
    onChange = (checkedList) => {
        let checkedListName = []
        /* 因为多选框组取到的是value，但是需要显示label，所以双层遍历 */
        this.props.selectData.map(listItem => {
            checkedList.map(checkedItem => {
                if (listItem.value === checkedItem) {
                    checkedListName.push(listItem.label)
                }
            })
        })
        this.setState({
            checkedList: checkedList,
            checkedListName: checkedListName
        })
    }

    triggerChange = () => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange

        onChange(Object.assign({}, this.state))         // onChange的参数只能是对象
    }

    /* “全选”按钮绑定的点击事件 */
    onCheckAll = (e) => {
        this.setState({
            checkedList: this.props.selectData.map(item => { return item.value }),
            checkedListName: this.props.selectData.map(item => { return item.label }),
        })
    }

    /* “清空”按钮绑定的点击事件 */
    onCleanAll = () => {
        this.setState({
            checkedList: [],
            checkedListName: [],
        })
    }

    /* “过滤清空”按钮绑定的点击事件 */
    onFilterClean = () => {
        this.setState({
            list: this.props.selectData,
            filterInputValue: '',
        })
    }


    render() {
        const dropDown = classnames({
            [multiSelectStyle.dropDown]: true,
            [multiSelectStyle.dropVisible]: this.state.visible,
        })

        return (
            <div
                className={multiSelectStyle.multiSelect}
                onFocus={this.selectFocus.bind(this)}
            >
                <Input value={this.state.checkedListName} placeholder={this.props.placeholder} readOnly={true} />
                <div
                    className={dropDown}
                >
                    <div className={multiSelectStyle.btnWrap}>
                        <Button
                            className={multiSelectStyle.btn}
                            onClick={this.onCheckAll.bind(this)}
                        >
                            全选
                        </Button>
                        <Button
                            className={multiSelectStyle.btn}
                            onClick={this.onCleanAll.bind(this)}
                        >
                            清空
                        </Button>
                    </div>
                    <div className={multiSelectStyle.filter}>
                        <Input
                            className={multiSelectStyle.filterInput}
                            onKeyUp={this.handleKeyUp.bind(this)}
                            value={this.state.filterInputValue}
                            onChange={this.filterInputValue.bind(this)}
                            placeholder='请选择'
                        />
                        <span
                            className={multiSelectStyle.filterClean}
                            onClick={this.onFilterClean.bind(this)}
                        >
                            ×
                        </span>
                    </div>
                    <div className={multiSelectStyle.dataList}>
                        <CheckboxGroup
                            options={this.state.list}
                            value={this.state.checkedList}
                            onChange={this.onChange.bind(this)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default MultiSelect