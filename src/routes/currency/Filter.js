import React from 'react'
import { Form, TreeSelect, Select } from 'antd'

const FormItem = Form.Item
const TreeNode = TreeSelect.TreeNode
const Option = Select.Option

const Filter = ({
  brandList,
  filterChange,
  form: {
    getFieldDecorator,
    getFieldValue
  }
}) => {

  const treeData = [{
    label: '一级类目--1',
    value: '0',
    key: '0',
    children: [{
      label: '二级类目--1',
      value: '0-1',
      key: '0-1'
    }, {
      label: '二级类目--2',
      value: '0-2',
      key: '0-2'
    }, {
      label: '二级类目--3',
      value: '0-3',
      key: '0-3'
    }]
  }, {
    label: '一级类目--2',
    value: '1',
    key: '1',
    children: [{
      label: '二级类目--1',
      value: '1-1',
      key: '1-1'
    }, {
      label: '二级类目--2',
      value: '1-2',
      key: '1-2'
    }, {
      label: '二级类目--3',
      value: '1-3',
      key: '1-3'
    }]
  }]

  const brandOptions = []
  brandList.forEach(item => {
    brandOptions.push(<Option key={item.key}>{item.label}</Option>)
  })

  const style = {
    width: 300
  }

  const brandChange = (key) => {
    const category_id  = getFieldValue('category_id')
    const gender = getFieldValue('gender')
    const filter = { category_id, gender, brand_id: key }
    filterChange(filter)
  }

  return (
    <div>
      <FormItem>
        {
          getFieldDecorator('category_id')(
            <TreeSelect
              style={style}
              treeData={treeData}
              placeholder="请选择类目"
            />
          )
        }
      </FormItem>
      <FormItem>
        {
          getFieldDecorator('brand_id')(
            <Select
              style={style}
              mode="multiple"
              allowClear
              children={brandOptions}
              onChange={brandChange}
              placeholder="请选择品牌"
            />
          )
        }
      </FormItem>
      <FormItem>
        {
          getFieldDecorator('gender')(
            <Select
              style={style}
              placeholder="请选择性别"
            >
              <Option value="0">男</Option>
              <Option value="1">女</Option>
              <Option value="2">中性</Option>
              <Option value="3">儿童</Option>
            </Select>
          )
        }
      </FormItem>
    </div>
  )
}

export default Form.create()(Filter)
