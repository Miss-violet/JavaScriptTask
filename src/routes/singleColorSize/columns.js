const sizeColumns = [
    {
        title: '尺码',
        dataIndex: 'size',
        key: 'size',
        className: 'size',
        width: '14%'
    },
    {
        title: '当前库存配比',
        dataIndex: 'inventory_proportion',
        key: 'inventory_proportion',
        className: 'inventory_proportion',
        width: '14%',
        render: text => <span>{text}%</span>
    },
    {
        title: '推荐配比',
        dataIndex: 'recommend_proportion',
        key: 'recommend_proportion',
        className: 'recommend_proportion',
        width: '30%',
        render: text => {
            return <div className='progressCol'>
                <div className="progressWrap">
                    <span className="progress" style={{ width: ' 50%' }}></span>
                </div>
                <div className='percent'>{text}%</div>
            </div>
        }
    },
    {
        title: '历史销量',
        dataIndex: 'sold_num',
        key: 'sold_num',
        className: 'sold_num',
        width: '18%',
    },
    {
        title: '行业销售指数',
        dataIndex: 'finance_inventory_quantity',
        key: 'finance_inventory_quantity',
        className: 'finance_inventory_quantity',
        width: '18%',
    }
]

const colorColumns = [
    {
        title: '颜色',
        dataIndex: 'color',
        key: 'color',
        className: 'color',
        width: '14%'
    },
    {
        title: '当前库存配比',
        dataIndex: 'inventory_proportion',
        key: 'inventory_proportion',
        className: 'inventory_proportion',
        width: '14%',
        render: text => <span>{text}%</span>
    },
    {
        title: '推荐指数',
        dataIndex: 'recommend_proportion',
        key: 'recommend_proportion',
        className: 'recommend_proportion',
        width: '30%',
        render: text => {
            return <div className='progressCol'>
                <div className="progressWrap">
                    <span className="progress" style={{ width: ' 50%' }}></span>
                </div>
                <div className='percent'>{text}%</div>
            </div>
        }
    },
    {
        title: '历史销量',
        dataIndex: 'sold_num',
        key: 'sold_num',
        width: '18%',
    },
    {
        title: '行业销售指数',
        dataIndex: 'finance_inventory_quantity',
        key: 'finance_inventory_quantity',
        width: '18%',
    }
]

export default { sizeColumns, colorColumns }