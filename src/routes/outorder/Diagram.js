import React from 'react'
import { Icon, Radio, Tabs } from 'antd'

const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const TabPane = Tabs.TabPane

class Diagram extends React.Component {

    renderTab() {
        return (
            <div>支付金额</div>
        )
    }

    render() {
        return (
            <div>
                <div className='tool-bar'>
                    <div className="title">
                        <span>渠道销售</span>
                        <Icon type="exclamation-circle-o" />
                    </div>
                    <RadioGroup defaultValue={1}>
                        <RadioButton value={1}>全部</RadioButton>
                        <RadioButton value={2}>直营</RadioButton>
                        <RadioButton value={3}>分销</RadioButton>
                    </RadioGroup>
                </div>
                <a>查看明细</a>
                <Tabs type='card'>
                    <TabPane key={1} tab={this.renderTab()}><div>曲线图</div></TabPane>
                    <TabPane key={2} tab={this.renderTab()}><div>曲线图</div></TabPane>
                    <TabPane key={3} tab={this.renderTab()}><div>曲线图</div></TabPane>
                    <TabPane key={4} tab={this.renderTab()}><div>曲线图</div></TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Diagram;
