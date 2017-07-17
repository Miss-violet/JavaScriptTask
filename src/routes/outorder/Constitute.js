import React from 'react'
import { Icon, Radio, Tabs, Table } from 'antd'

const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const TabPane = Tabs.TabPane

const RegionTable = (props) => {
    console.log('props', props)
    const { goodsList, regionList, brandList, type } = props
    const columns = [
        {
            title: '品牌',
            dataIndex: 'brand_name',
            key: 'brand_name',
        }, {
            title: '支付商品数',
            dataIndex: 'pay_goods_num',
            key: 'pay_goods_num'
        }, {
            title: '支付金额',
            dataIndex: 'pay_amount',
            key: 'pay_amount',
            sorter: (a, b) => a.pay_amont - b.pay_amont,
        }, {
            title: '支付毛利',
            dataIndex: 'pay_profit',
            key: 'pay_profit'
        }, {
            title: '支付毛利率',
            dataIndex: 'pay_profit_rate',
            key: 'pay_profit_rate'
        }
    ]

    const regionColumns = [
        {
            title: '地域',
            dataIndex: 'receiver_province',
            key: 'receiver_province'
        }, {
            title: '支付订单数',
            dataIndex: 'pay_order_num',
            key: 'pay_order_num'
        }, {
            title: '支付金额',
            dataIndex: 'pay_amount',
            key: 'pay_amount'
        }, {
            title: '支付买家数',
            dataIndex: 'buy_num',
            key: 'buy_num'
        }
    ]

    let tableProps = {
        dataSource: goodsList,
        columns: columns,
        pagination: false
    }
    if (type === 'regionList') {
        tableProps.dataSource = regionList
        tableProps.columns = regionColumns
    }
    if (type === 'brandList') {
        columns[0].dataIndex = 'brand'
        tableProps.dataSource = brandList
        tableProps.columns = columns
    }

    return (
        <Table
            {...tableProps}
            rowKey={record => record.rowNo}
        />
    )
}

class Constitute extends React.Component {

    render() {
        console.log('props', this.props)
        const { goodsList, regionList, brandList } = this.props

        return (
            <div>
                <Tabs type='line'>
                    <TabPane key={1} tab='商品构成TOP10'>
                        <div>
                            <div>图</div>
                            <RegionTable tyep='goodsList' goodsList={goodsList} />
                        </div>
                    </TabPane>
                    <TabPane key={2} tab='地域构成TOP10'>
                        <div>
                            <div>图</div>
                            <RegionTable type='regionList' regionList={regionList} />
                        </div>
                    </TabPane>
                    <TabPane key={3} tab='品牌构成TOP10'>
                        <div>
                            <div>图</div>
                            <RegionTable type='brandList' brandList={brandList} />
                        </div>
                    </TabPane>
                    <TabPane key={4} tab='渠道构成TOP10'><div>图</div></TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Constitute;
