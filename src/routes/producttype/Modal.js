import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Select } from 'antd'
import commonStyles from '../../assets/styles/index.less'

const FormItem = Form.Item

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts} okText="提交"
      cancelText="取消">
      <Form className={commonStyles.modalForm}>
        <div className='item'>
          <FormItem label="产品类型编号">
            {getFieldDecorator('code', {
              initialValue: item.code,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
        </div>
        <div className='item'>
          <FormItem label="产品类型名称">
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
        </div>
        <div className='modifyInfo'>
          {item.modifyUser && <FormItem label='最后修改人' >
            {`${item.modifyUser}`}
          </FormItem>}
          {item.modifyTime && <FormItem label='最后修改时间' >
            {`${item.modifyTime}`}
          </FormItem>}
        </div>

      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
