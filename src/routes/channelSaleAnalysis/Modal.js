import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Select, Button } from 'antd'
import commonStyles from '../../assets/styles/index.less'

const FormItem = Form.Item
const Option = Select.Option


class EntModal extends React.Component {
    constructor(props) {
        super(props);
        const {
            item,
            onOk,
            onCancel,
            form,
            enterList = {},
            ...modalProps
        } = props;


        let itemAliasOptions = []
        let initEntid;

        let initItemType = '1'
        if (item.type) {
            initItemType = String(item.type)
        }

        if (!item.id) {
            enterList.forEach(enter => {
                if (initItemType === String(enter.type)) {
                    itemAliasOptions.push(<Option key={enter.id}>{enter.alias}</Option>)
                    if (!initEntid) {
                        initEntid = String(enter.id)
                    }
                }
            })
        }
        else {
            itemAliasOptions.push(<Option key={item.id}>{item.alias}</Option>)
            initEntid = String(item.id)
        }

        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.onTypeChange = this.onTypeChange.bind(this)
        this.state = {
            modalOpts: {
                ...modalProps,
                onOk: this.handleOk
            },
            itemAliasOptions,
            initEntid,
            initItemType
        }
    }

    handleOk() {
        const { onOk, item, form } = this.props
        const {validateFields, getFieldsValue } = form
        validateFields((errors) => {
            if (errors) {
                return
            }
            let { type, entId, accountName, bankName, payAccount } = getFieldsValue()

            const data = {
                accountName,
                bankName,
                payAccount,
            }
            if (item.id) { //update
                data.id = item.id
            } else {
                data.entId = Number(entId)
                data.type = Number(type)
            }
            // data.address = data.address.join(' ')
            onOk(data)
        })
    }

    handleCancel() {
        const { onCancel } = this.props
        onCancel()
    }
    onTypeChange(value) {
        const {form} = this.props
        const {setFieldsValue} = form
        let itemAliasOptions = []
        let entId;
        if (value === '1' || value === '2') {
            this.props.enterList.forEach(enter => {
                if (value === String(enter.type)) {
                    itemAliasOptions.push(<Option key={enter.id}>{enter.alias}</Option>)
                    if (!entId) {
                        entId = String(enter.id)
                    }
                }
            })
        }
        if (value === '3') {
            itemAliasOptions.push(<Option key="1">卓普信</Option>) // 卓普信的id???
            if (!entId) {
                entId = '1'
            }
        }
        this.setState({ itemAliasOptions })
        setFieldsValue({ entId })
    }

    render() {
        // const modalOpts = {
        //     ...modalProps,
        //     onOk: handleOk,
        // }
        const {modalOpts, itemAliasOptions, initEntid, initItemType} = this.state
        const {item, form} = this.props
        const {getFieldDecorator} = form
        // const initEntId = item.id || 


        return (
            <Modal {...modalOpts}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>提交</Button>,
                    <Button key="back" onClick={this.handleCancel}>
                        取消
                    </Button>,
                ]}
                >
                <Form className={commonStyles.modalForm}>
                    <div className='item'>
                        <FormItem label='企业类型'>
                            {
                                getFieldDecorator('type', {
                                    rules: [{ required: true, message: '请选择企业类型' }],
                                    initialValue: initItemType || '1'
                                })(
                                    <Select disabled={item.id != null} onChange={this.onTypeChange}>
                                        <Option value='1'>借款方</Option>
                                        <Option value='2'>供应商</Option>
                                        <Option value='3'>出资方</Option>
                                    </Select>
                                    )
                            }
                        </FormItem>
                    </div>
                    <div className='item'>
                        <FormItem label='企业简称'>
                            {
                                getFieldDecorator('entId', {
                                    rules: [{ required: true, message: '请选择企业简称' }],
                                    initialValue: initEntid
                                })(
                                    <Select disabled={item.id != null}>
                                        {itemAliasOptions}
                                    </Select>
                                    )
                            }
                        </FormItem>
                    </div>
                    <div className='item'>
                        <FormItem label='银行名称'>
                            {
                                getFieldDecorator('bankName', {
                                    rules: [{ required: true, message: '请输入银行名称，长度不多于32位', max: 32 }],
                                    initialValue: item.bankName
                                })(<Input />)
                            }
                        </FormItem>
                    </div>
                    <div className='item'>
                        <FormItem label='户名'>
                            {
                                getFieldDecorator('accountName', {
                                    rules: [{ required: true, message: '请输入户名，长度不多于32位', max: 32 }],
                                    initialValue: item.accountName
                                })(<Input />)
                            }
                        </FormItem>
                    </div>
                    <div className='item'>
                        <FormItem label='账号'>
                            {
                                getFieldDecorator('payAccount', {
                                    rules: [{ required: true, message: '请输入户名，长度不多于32位', max: 32 }],
                                    initialValue: item.payAccount
                                })(<Input />)
                            }
                        </FormItem>
                    </div>
                    {
                        item.id &&
                        <div className='modifyInfo'>
                            <FormItem label='最后修改人'>
                                {item.modifyUser}
                            </FormItem>
                            <FormItem label='最后修改时间'>
                                {item.modifyTime && new Date(Number(item.modifyTime)).format('yyyy-MM-dd HH:mm:ss')}
                            </FormItem>
                        </div>
                    }
                </Form>
            </Modal>
        )
    }
}


EntModal.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    item: PropTypes.object,
    onOk: PropTypes.func,
}

export default Form.create()(EntModal)
