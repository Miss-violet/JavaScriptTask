import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import { sizeColumns, colorColumns } from './columns'
import { Icon, Tabs, Tooltip } from 'antd'
import styles from './index.less'
import echarts from 'echarts'
import YearsPicker from '../../components/YearsPicker/YearsPicker'

const TabPane = Tabs.TabsPane

class ColorSize extends Component {
    constructor(props) {
        super()
    }

    componentWillUpdate() {
        const { echartsData } = this.props.colorSize

        const data = echartsData.data
        const script = echartsData.script

        if (data && script) {

            eval(script)
            
            var chart = document.querySelector('#chart')
            
            var myChart = echarts.init(chart)

            myChart.setOption(window.option)
        }

    }

    render() {

        return (
            <div>
                <div className="content-wrap">
                    <Filter />
                    <div id="chart" style={{ width: 1000, height: 500 }}></div>
                    <YearsPicker />
                </div>
            </div>
        )
    }
}

ColorSize.propTypes = {
    colorSize: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object
}

export default connect(({ colorSize, loading }) => ({ colorSize, loading }))(ColorSize)
