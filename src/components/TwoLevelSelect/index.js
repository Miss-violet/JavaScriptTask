import React, { Component } from 'react'
import { Select } from 'antd'
import style from './index.less'

const Option = Select.Option

const TwoLevelSelect = () => {
    return (
        <Select>
            <Option value="1">选项一</Option>
            <Option value="2">选项二</Option>
            <Option value="3">选项三</Option>
            <Option value="4">选项四</Option>
        </Select>
    )
}

export default TwoLevelSelect