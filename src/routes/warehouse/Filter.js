import React from 'react'
import PropTypes from 'prop-types'
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker'
import commonStyles from '../../assets/styles/index.less'
import { Form, Button, Input, Select, Icon, DatePicker, TreeSelect } from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option

const Filter = ({
  brandList,
  warehouseList,
  onSearch,
  searchInfo,
  pagination,
  form: {
    getFieldDecorator,
    getFieldsValue,
    resetFields
  },
}) => {

  let warehouseTypeData = [
    {
      key: 0,
      value: '0',
      label: '自有'
    }, {
      key: 1,
      value: '1',
      label: '代发'
    }, {
      key: 2,
      value: '2',
      label: '代采'
    }, {
      key: 3,
      value: '3',
      label: '质押'
    }
  ]

  const handleSubmit = () => {
    const fields = getFieldsValue()
    console.log('fields', fields)
    // 判断搜索字段类型
    const keys = ['pattern', 'sku_code', 'seller_code', 'goods_name']
    keys.forEach((item) => {
      if (fields.key === item) {
        fields[item] = fields.value
        delete fields.key
        delete fields.value
      } else {
        fields[item] = ''
      }
    })

    // 搜索时间类别
    fields.start_time = fields.date.pickerValue[0].format('YYYYMMDD')
    fields.end_time = fields.date.pickerValue[1].format('YYYYMMDD')
    delete fields.date

    // 品牌
    if (Array.isArray(fields.brand_id) && fields.brand_id.length > 0) {
      let ids = ''
      fields.brand_id.forEach((id) => {
        ids += String(id) + ','
      })
      fields.brand_id = ids.slice(0, ids.length - 1)
    } else {
      fields.brand_id = '-1'
    }

    // 仓库
    if (Array.isArray(fields.logic_warehouse_id) && fields.logic_warehouse_id.length > 0) {
      let ids = ''
      fields.logic_warehouse_id.forEach((id) => {
        ids += String(id) + ','
      })
      fields.logic_warehouse_id = ids.slice(0, ids.length - 1)
    } else {
      fields.logic_warehouse_id = '-1'
    }

    // 仓库类型
    if (Array.isArray(fields.logic_warehouse_type_id) && fields.logic_warehouse_type_id.length > 0) {
      let types = ''
      fields.logic_warehouse_type_id.forEach((type) => {
        types += type + ','
      })
      fields.logic_warehouse_type_id = types.slice(0, types.length - 1)
    } else {
      fields.logic_warehouse_type_id = '-1'
    }

    // 分页信息
    fields.is_paging = 'true'
    fields.page_number = String(pagination.current)
    fields.page_size = String(pagination.pageSize) || '20'
    fields.uri = 'profit_loss_sku'

    for (let key in fields) {
      if (!fields[key]) {
        fields[key] = ''
      }
    }
    // console.log('fields', fields)
    searchInfo(fields)
    onSearch(fields)
  }

  const handleDateChange = (date) => {
    console.log('data', date)
  }

  const handleReset = () => {
    resetFields()
  }

  const dateFormat = 'YYYY/MM/DD',
    now = moment().format(dateFormat),
    recent30 = moment().subtract(30, 'days').format(dateFormat)

  return (
    <div>
      <Form className={commonStyles.searchFilterForm}>
        <div className="dateFilter">
          <div className="filter">日期</div>
          <div className='specialItem'>
            <FormItem className='selectLabel'>
              {
                getFieldDecorator('date', {
                  initialValue: {
                    select: 'recent30',
                    pickerValue: [
                      moment(recent30, dateFormat),
                      moment(now, dateFormat)
                    ]
                  }
                })(
                  <DateRangePicker />
                  )
              }
            </FormItem>
          </div>
        </div>
        <div className={commonStyles.searchForm}>
          <div className='specialItem'>
            <FormItem className='selectLabel'>
              {
                getFieldDecorator('key', {
                  initialValue: 'pattern'
                })(
                  <Select>
                    <Option value="pattern">款号</Option>
                    <Option value="sku_code">SKU码</Option>
                    <Option value="seller_code">商家编码</Option>
                    <Option value="goods_name">商品名称</Option>
                  </Select>
                  )
              }
            </FormItem>
            <FormItem className='dateWrap'>
              {
                getFieldDecorator('value')(
                  <Input />
                )
              }
            </FormItem>
          </div>
          <FormItem label='品牌'>
            {
              getFieldDecorator('brand_id')(
                <TreeSelect
                  placeholder="请选择"
                  treeData={brandList}
                  multiple={true}
                  treeCheckable={true} />
              )
            }
          </FormItem>
          <FormItem label='仓库'>

            {
              getFieldDecorator('logic_warehouse_id')(
                <TreeSelect
                  searchPlaceholder="请选择"
                  treeData={warehouseList}
                  multiple={true}
                  treeCheckable={true}
                />
              )
            }
          </FormItem>
          <FormItem label='仓库类型'>

            {
              getFieldDecorator('logic_warehouse_type_id', {
                // initialValue: ''
              })(
                <TreeSelect
                  placeholder="请选择"
                  treeData={warehouseTypeData}
                  multiple={true}
                  treeCheckable={true}
                />

                )
            }
          </FormItem>
          <FormItem className={commonStyles.btnWrap}>
            <Button className='antdIcon-btn ant-btn-primary' onClick={handleSubmit}><Icon type='search' />搜索</Button>
            <Button onClick={handleReset}>重置</Button>
          </FormItem>
        </div>
      </Form>
    </div>
  )
}

Filter.propTypes = {
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(Filter)
