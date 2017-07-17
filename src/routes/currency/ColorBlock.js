import React from 'react'
import { Icon, Tabs } from 'antd'

const TabPane = Tabs.TabPane

const ColorBlock = () => {
    return (
        <div>
            <div>
                <p>颜色配比<Icon type="exclamation-circle-o" /></p>
                <Tabs>
                    <TabPane tab="春" key="0">春季</TabPane>
                    <TabPane tab="夏" key="1">夏季</TabPane>
                    <TabPane tab="秋" key="2">秋季</TabPane>
                    <TabPane tab="冬" key="3">冬季</TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default ColorBlock