import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Button, Input, Select, Icon, Checkbox, Radio, message, InputNumber } from 'antd'
import commonStyles from '../../../assets/styles/index.less'
import styles from './index.less'
import {PRODUCT_STATUS, PRODUCT_DAYS_COUNT} from '../../../utils/globaldef'
import pathToRegexp from 'path-to-regexp'


const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.onHandleReturn = this.onHandleReturn.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    onSubmit() {
        const { location, dispatch, product, loading, form } = this.props
        let allValue = { ...form.getFieldsValue() }
        
        let daysCount = PRODUCT_DAYS_COUNT.DAYS_360_CHECK
        if (allValue.daysCount.length === 2) {
            daysCount = PRODUCT_DAYS_COUNT.BOTH_CHECK
        }
        if (allValue.daysCount[0] === '365') {
            daysCount = PRODUCT_DAYS_COUNT.DAYS_365_CHECK
        }

        allValue.daysCount = daysCount;
        allValue.status = Number(allValue.status)
        allValue.productTypeId = Number(allValue.productTypeId)
        if (!allValue.pledgeRateMin) {
            allValue.pledgeRateMin = 0
        }
        if (!allValue.pledgeRateMax) {
            allValue.pledgeRateMax = 0.1
        }

        if (location.query.type==='update') {
            form.validateFields((err, values) => {
                const match = pathToRegexp('/product/:id').exec(location.pathname)
                if (!err) {
                    dispatch({
                        type: 'product/update',
                        payload: {
                            data: {
                                ...form.getFieldsValue(),
                                ...allValue,
                                id: Number(location.query.id)
                            },
                            pagination: {
                                page: Number(product.pagination.current),
                                pageSize: Number(product.pagination.pageSize)
                            }
                        },

                    })
                }
            })
        } else {
            form.validateFields((err, values) => {
                if (!err) {
                    dispatch({
                        type: 'product/create',
                        payload: {
                            data: {
                                ...form.getFieldsValue(),
                                ...allValue,
                            },
                            pagination: {
                                page: Number(product.pagination.current),
                                pageSize: Number(product.pagination.pageSize)
                            }
                        }
                    })
                }
            })
        }
    }

    onHandleReturn() {
        history.go(-1)
    }

    handleClose() {
        window.close()
    }

    render() {
        const { location, dispatch, product, loading, form } = this.props
        const { getFieldDecorator, getFieldsValue, validateFields, getFieldValue, setFieldsValue } = form;

        let ptypes = [];
        let firstPTypeId
        const ptypesList = product.ptypesList;
        for (let i = 0; i < ptypesList.length; i++) {
            if (i === 0) {
                firstPTypeId = ptypesList[0].id
            }
            ptypes.push(<Option key={ptypesList[i].id} value={ptypesList[i].id}>{ptypesList[i].name}</Option>)
        }

        let ptypeSelect =  ''
        if (ptypesList.length > 1)
        {
            ptypeSelect = Number(ptypesList[0].id)
        }

        let defaultRedemptionTypeVaule = "0"

        let updateitem = {};
        if (product.type !== 'create') {
            updateitem = product.currentItem
            defaultRedemptionTypeVaule = updateitem.redemptionType
        }
        
        if (updateitem.productTypeId) {
            ptypeSelect = Number(updateitem.productTypeId)
        }


        let data = updateitem || {};
        let readOnly = false
        if (data.status > PRODUCT_STATUS.NOT_ENABLED || location.query.type === 'check') { //启用后都不可修改
            readOnly = true
        }

        let daysCount = []
        if(data) {
            if( data.daysCount == PRODUCT_DAYS_COUNT.DAYS_360_CHECK || data.daysCount == PRODUCT_DAYS_COUNT.BOTH_CHECK ) {
                daysCount.push('360')
            }
            if( data.daysCount == PRODUCT_DAYS_COUNT.DAYS_365_CHECK || data.daysCount == PRODUCT_DAYS_COUNT.BOTH_CHECK ) {
                daysCount.push('365')
            }
        }
        const plainOptions = ['360', '365'];

        const showReturnBtn = location.query.from === 'current'

        return (
            <div className={styles.productEdit}>
                <Form className={commonStyles.editInfoForm}>
                    <div className='hdTitle'><Icon type='file-text' />基本信息</div>
                    <div className='item-wrap'>
                        <div className='item'>
                            <FormItem
                                label='产品编号：'
                                >
                                {
                                    getFieldDecorator('code', {
                                        rules: [
                                            { required: true, message: '请输入产品编号！' },
                                            {
                                                validator: (rule, value, callback) => {
                                                    const regex = /^[0-9a-zA-Z]*$/g         /* 正则表达式，只允许数字、英文及两种组合 */
                                                    if (!regex.test(getFieldValue('code'))) {
                                                        callback({ message: '编号仅允许输入数字、英文及两种组合，请检查！' })
                                                    }
                                                    callback()
                                                }
                                            }
                                        ],
                                        initialValue: data.code || (ENV == 'dev' ? 'pcode' : '')
                                    })(<Input disabled={readOnly} />)
                                }
                            </FormItem>
                            <FormItem
                                label='产品名称：'
                                >
                                {
                                    getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入产品名称！' }],
                                        initialValue: data.name || (ENV == 'dev' ? 'pname' : '')
                                    })(<Input disabled={readOnly} />)
                                }
                            </FormItem>
                            <FormItem
                                label='产品类型'
                                >
                                {
                                    getFieldDecorator('productTypeId', {
                                        rules: [{ required: true, message: '请选择产品类型！' }],
                                        initialValue: ptypeSelect || Number(firstPTypeId)
                                    })(
                                        <Select disabled={readOnly}>
                                            { ptypes }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </div>
                        <div className='item'>
                            <FormItem
                                label='状态'
                                >
                                {
                                    getFieldDecorator('status', {
                                        initialValue: data.status ? String(data.status) : '0'
                                    })(
                                        <Select disabled={readOnly}>
                                            <Option value="0">未启用</Option>
                                            <Option value="1">启用</Option>
                                            <Option value="2">停用</Option>
                                        </Select>
                                        )
                                }
                            </FormItem>
                            {
                                data.modifyUser &&
                                <FormItem label='最后修改人'>
                                    {`${data.modifyUser}`}
                                </FormItem>
                            }
                            {
                                data.modifyTime &&
                                <FormItem label='最后修改时间'>
                                    {new Date(Number(data.modifyTime)).format('yyyy-MM-dd HH:mm:ss')}
                                </FormItem>

                            }
                        </div>
                        <div className='item'>
                            {
                                data.enableUser &&
                                <FormItem label='启用人'>
                                    {`${data.enableUser}`}
                                </FormItem>
                            }
                            {
                                data.enableTime &&
                                <FormItem label='启用时间'>
                                    {data.enableTime && new Date(Number(data.enableTime)).format('yyyy-MM-dd HH:mm:ss')}
                                </FormItem>

                            }
                        </div>
                        <div className='item'>
                            <FormItem
                                label='备注' className='remark'
                                >
                                {
                                    getFieldDecorator('remark', {
                                        initialValue: data.remark || (ENV == 'dev' ? 'ramarksssssxxx' : '')
                                    })(<Input disabled={readOnly} type="textarea" className="fm-textarea-longer" />)
                                }
                            </FormItem>
                        </div>
                    </div>
                    <div className='hdTitle'><Icon type='file-text' />金融信息</div>
                    <div className='item-wrap financeWrap'>
                        <div className='item'>
                            <FormItem
                                label='资金占用费率(年化)'
                                >
                                {
                                    getFieldDecorator('capitalOccupyFeeRateMin', {
                                        rules: [
                                            { required: true, message: '请输入最小资金占用费率！' },
                                            {
                                                validator: (rule, value, callback) => {
                                                    if (getFieldValue('capitalOccupyFeeRateMax') && getFieldValue('capitalOccupyFeeRateMax') < getFieldValue('capitalOccupyFeeRateMin')) {
                                                        callback({ message: '输入范围不合理，请检查！' })
                                                    }
                                                    callback()
                                                }
                                            }
                                        ],
                                        initialValue: data.capitalOccupyFeeRateMin || (ENV == 'dev' ? 1 : 0)
                                    })(<InputNumber disabled={readOnly} min={0} />)
                                }
                                <span className="to">~</span>
                            </FormItem>
                            <FormItem
                                >
                                {
                                    getFieldDecorator('capitalOccupyFeeRateMax', {
                                        rules: [
                                            { required: true, message: '请输入最大资金占用费率！' },
                                            {
                                                validator: (rule, value, callback) => {
                                                    if (getFieldValue('capitalOccupyFeeRateMin') > getFieldValue('capitalOccupyFeeRateMax')) {
                                                        callback({ message: '输入范围不合理，请检查！' })
                                                    }
                                                    if (getFieldValue('capitalOccupyFeeRateMin') === getFieldValue('capitalOccupyFeeRateMax')) {
                                                        callback({ message: '输入范围不合理，请检查！' })
                                                    }
                                                    callback()
                                                }
                                            }
                                        ],
                                        initialValue: data.capitalOccupyFeeRateMax || (ENV == 'dev' ? 2 : 0)
                                    })(<InputNumber min={0} disabled={readOnly} />)
                                }
                                <span className="unit">%</span>
                            </FormItem>
                            <FormItem
                                label='代理费率'
                                >
                                {
                                    getFieldDecorator('agentFeeRateMin', {
                                        rules: [
                                            { required: true, message: '请输入最小代理费率！' },
                                            {
                                                validator: (rule, value, callback) => {
                                                    if (getFieldValue('agentFeeRateMax') && getFieldValue('agentFeeRateMin') > getFieldValue('agentFeeRateMax')) {
                                                        callback({ message: '输入范围不合理，请检查！' })
                                                    }
                                                    if (getFieldValue('agentFeeRateMax') && getFieldValue('agentFeeRateMin') === getFieldValue('agentFeeRateMax')) {
                                                        callback({ message: '输入范围不合理，请检查！' })
                                                    }
                                                    callback()
                                                }
                                            }
                                        ],
                                        initialValue: data.agentFeeRateMin || (ENV == 'dev' ? 0.5 : 0)
                                    })(<InputNumber min={0} disabled={readOnly} />)
                                }
                                <span className="to">~</span>
                            </FormItem>
                            <FormItem
                                >
                                {
                                    getFieldDecorator('agentFeeRateMax', {
                                        rules: [
                                            { required: true, message: '请输入最大代理费率！' },
                                            {
                                                validator: (rule, value, callback) => {
                                                    if (getFieldValue('agentFeeRateMin') > getFieldValue('agentFeeRateMax')) {
                                                        callback({ message: '输入范围不合理，请检查！' })
                                                    }
                                                    if (getFieldValue('agentFeeRateMin') === getFieldValue('agentFeeRateMax')) {
                                                        callback({ message: '输入范围不合理，请检查！' })
                                                    }
                                                    callback()
                                                }
                                            }
                                        ],
                                        initialValue: data.agentFeeRateMax || (ENV == 'dev' ? 1.0 : 0)
                                    })(<InputNumber min={0} disabled={readOnly} />)
                                }
                                <span className="unit">%</span>
                            </FormItem>
                            <FormItem label='日期基数：'>
                                <div>
                                    <FormItem>
                                        {
                                            getFieldDecorator('daysCount', {
                                                rules: [
                                                    { required: true, message: '必须选择日期基数' },
                                                ],
                                                initialValue: daysCount
                                            })(
                                                <CheckboxGroup options={plainOptions} disabled={readOnly} />
                                            )
                                        }
                                    </FormItem>
                                </div>
                            </FormItem>
                        </div>
                        <div className='item'>
                            <FormItem
                                label='单笔借款天数：'
                                >
                                {
                                    getFieldDecorator('borrowingDaysMin', {
                                        rules: [{ required: true, type: 'integer', message: '请输入最小单笔借款天数！' }, {
                                            validator: (rule, value, callback) => {
                                                if (getFieldValue('borrowingDaysMax') && getFieldValue('borrowingDaysMin') > getFieldValue('borrowingDaysMax')) {
                                                    callback({ message: '输入范围不合理，请检查！' })
                                                    return
                                                }
                                                if (getFieldValue('borrowingDaysMax') && getFieldValue('borrowingDaysMin') === getFieldValue('borrowingDaysMax')) {
                                                    callback({ message: '输入范围不合理，请检查！' })
                                                    return 
                                                }
                                                callback()
                                            }
                                        }],
                                        initialValue: data.borrowingDaysMin || (ENV == 'dev' ? 1 : 0)
                                    })(<InputNumber min={0} disabled={readOnly} />)
                                }
                                <span className="to">~</span>
                            </FormItem>
                            <FormItem
                                >
                                {
                                    getFieldDecorator('borrowingDaysMax', {
                                        rules: [
                                            { required: true, type: 'integer', message: '请输入最大单笔借款天数！' },
                                            {
                                                validator: (rule, value, callback) => {
                                                    if (getFieldValue('borrowingDaysMin') > getFieldValue('borrowingDaysMax')) {
                                                        callback({ message: '输入范围不合理，请检查！' })
                                                    }
                                                    if (getFieldValue('borrowingDaysMin') === getFieldValue('borrowingDaysMax')) {
                                                        callback({ message: '输入范围不合理，请检查！' })
                                                    }
                                                    callback()
                                                }
                                            }
                                        ],
                                        initialValue: data.borrowingDaysMax || (ENV == 'dev' ? 60 : 0)
                                    })(<InputNumber min={0} disabled={readOnly} />)
                                }
                                <span className="unit">天</span>
                            </FormItem>
                        </div>
                        <div className="item">
                            <FormItem label='还款计息'>
                                <span>从计息日起前</span>
                                {
                                    getFieldDecorator('interestCountFirstDays', {
                                        rules: [
                                            { required: true, type: 'integer', message: '请输入计息日起前N天！' },
                                            {
                                                validator: (rule, value, callback) => {
                                                    /* 没有设置单笔借款天数的最大值 */
                                                    if (getFieldValue('borrowingDaysMax') === undefined) {
                                                        callback({ message: '没有设置单笔借款天数的最大值，请检查！' })
                                                    }
                                                    /* 不能大于等于单笔借款天数的最大值 */
                                                    if (getFieldValue('interestCountFirstDays') >= getFieldValue('borrowingDaysMax')) {
                                                        callback({ message: '不能大于等于单笔借款天数的最大值，请检查！' })
                                                    }

                                                    callback()
                                                }
                                            }
                                        ],
                                        initialValue: data.interestCountFirstDays || (ENV == 'dev' ? 1 : 0)
                                    })(<InputNumber className='marginInput' min={0} disabled={readOnly} />)
                                }
                                <span>天，按</span>
                            </FormItem>
                            <FormItem>
                                <InputNumber className='marginInput' min={0} disabled={true} formatter={value => getFieldValue('interestCountFirstDays')} />
                                <span>天计算。之后每</span>
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('interestActualCountDays', {
                                        rules: [{ required: true, type: 'integer', message: '请输入计息单位天数！' }],
                                        initialValue: data.interestActualCountDays || (ENV == 'dev' ? 30 : 0)
                                    })
                                        (<InputNumber className='marginInput' min={0} disabled={readOnly} />)
                                }
                                <span>天为一单位计息。</span>
                            </FormItem>
                            <div className='pmt'>
                                【注】例如，从计息日起前30天，按30天计息。以后每10天为一单位计息，即31-40天按40天计息，41-50天按50天计息，依此类推。
                        </div>
                        </div>
                        <div className="item">
                            <FormItem label='滞纳金率（日）：'>
                                {
                                    getFieldDecorator('overdueFeeRateMin', {
                                        rules: [
                                            { required: true, message: '请输入滞纳金率' },
                                            {
                                                validator: (rule, value, callback) => {
                                                    if (getFieldValue('overdueFeeRateMax') && getFieldValue('overdueFeeRateMin') > getFieldValue('overdueFeeRateMax')) {
                                                        callback({ message: '输入范围不合理，请检查！' })
                                                    }
                                                    if (getFieldValue('overdueFeeRateMax') && getFieldValue('overdueFeeRateMin') === getFieldValue('overdueFeeRateMax')) {
                                                        if(getFieldValue('overdueFeeRateMin') !== 0) {
                                                            callback({ message: '输入范围不合理，请检查！' })
                                                        }
                                                    }
                                                    callback()
                                                }
                                            }],
                                        initialValue: data.overdueFeeRateMin || (ENV == 'dev' ? 2 : 0)
                                    })(<InputNumber min={0} disabled={readOnly} />)
                                }
                                <span className="to">~</span>
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('overdueFeeRateMax', {
                                        rules: [{
                                            validator: (rule, value, callback) => {
                                                if (getFieldValue('overdueFeeRateMin') > getFieldValue('overdueFeeRateMax')) {
                                                    callback({ message: '输入范围不合理，请检查！' })
                                                }
                                                if (getFieldValue('overdueFeeRateMin') === getFieldValue('overdueFeeRateMax')) {
                                                    if(getFieldValue('overdueFeeRateMax') !== 0) {
                                                            callback({ message: '输入范围不合理，请检查！' })
                                                        }
                                                }
                                                callback()
                                            }
                                        }],
                                        initialValue: data.overdueFeeRateMax || (ENV == 'dev' ? 5 : 0)
                                    })(<InputNumber min={0} disabled={readOnly} />)
                                }
                                <span className="unit">%</span>
                            </FormItem>
                        </div>
                    </div>
                    <div className='hdTitle'><Icon type='file-text' />供应链信息</div>
                    <div className='item supplyChainWrap'>
                        <FormItem className='typeInfo'>
                            代理采购
                        </FormItem>
                        <div className='marginLeftwrap'>
                            <div>保证金：</div>
                            <div className='marginLeft'>
                                <span>
                                    缴纳方式：按合同区分
                            </span>
                                <FormItem label='比率范围：'>
                                    {
                                        getFieldDecorator('marginFeePayRateMin', {
                                            rules: [{
                                                validator: (rule, value, callback) => {
                                                    if (getFieldValue('marginFeePayRateMax') && getFieldValue('marginFeePayRateMin') > getFieldValue('marginFeePayRateMax')) {
                                                        callback({ message: '输入范围不合理，请检查！' })
                                                    }
                                                    if (getFieldValue('marginFeePayRateMax') && getFieldValue('marginFeePayRateMin') === getFieldValue('marginFeePayRateMax')) {
                                                        callback({ message: '输入范围不合理，请检查！' })
                                                    }
                                                    callback()
                                                }
                                            }],
                                            initialValue: data.marginFeePayRateMin || (ENV == 'dev' ? 1 : 0)
                                        })(<InputNumber min={0} disabled={readOnly} />)
                                    }
                                    <span className='to'>~</span>
                                </FormItem>
                                <FormItem>
                                    {
                                        getFieldDecorator('marginFeePayRateMax', {
                                            rules: [{
                                                validator: (rule, value, callback) => {
                                                    if (getFieldValue('marginFeePayRateMin') > getFieldValue('marginFeePayRateMax')) {
                                                        callback({ message: '输入范围不合理，请检查！' })
                                                        return
                                                    }
                                                    if (getFieldValue('marginFeePayRateMin') === getFieldValue('marginFeePayRateMax')) {
                                                        callback({ message: '输入范围不合理，请检查！' })
                                                        return
                                                    }
                                                    callback()
                                                }
                                            }],
                                            initialValue: data.marginFeePayRateMax || (ENV == 'dev' ? 10 : 0)
                                        })(<InputNumber min={0} disabled={readOnly} />)
                                    }
                                    <span className='unit'>%</span>
                                </FormItem>
                            </div>
                            <div className='marginLeft'>释放方式：同缴交比例释放</div>
                        </div>
                        <div className='marginLeftwrap'>
                            <div>赎回方式：</div>
                            <div className='marginLeft'>
                                {getFieldDecorator('redemptionType', {
                                            initialValue: data.redemptionType || 0
                                        })(
                                <RadioGroup disabled={readOnly}>
                                   <Radio value={0}>现金还款赎货</Radio>
                                   <Radio value={1}>赊销赎回+浮动质押</Radio>
                                    {getFieldsValue().redemptionType !== 1 ? null : (
                                        <div>
                                            <div className='marginLeft'>
                                                货物总量控制公式：
                                        <div>
                                                    <p>有效押品总值=∑(有效押品A价值xA权重+有效押品B价值xB权重+有效押品C价值xC权重)</p>
                                                    <p>有效押品总值 x 质押率% >= 风险敞口</p>
                                                </div>
                                            </div>
                                            <div className='marginLeft'>
                                                <FormItem label='质押率比率范围：'>
                                                    {
                                                        getFieldDecorator('pledgeRateMin', {
                                                            rules: [{
                                                                validator: (rule, value, callback) => {
                                                                    if (getFieldValue('pledgeRateMax') && getFieldValue('pledgeRateMin') > getFieldValue('pledgeRateMax')) {
                                                                        callback({ message: '输入范围不合理，请检查！' })
                                                                    }
                                                                    if (getFieldValue('pledgeRateMax') && getFieldValue('pledgeRateMin') === getFieldValue('pledgeRateMax')) {
                                                                        callback({ message: '输入范围不合理，请检查！' })
                                                                    }
                                                                    callback()
                                                                }
                                                            }],
                                                            initialValue: data.pledgeRateMin || (ENV == 'dev' ? 1 : 0)
                                                        })(<InputNumber min={0} disabled={readOnly} />)
                                                    }
                                                    <span className='to'>~</span>
                                                </FormItem>
                                                <FormItem>
                                                    {
                                                        getFieldDecorator('pledgeRateMax', {
                                                            rules: [{
                                                                validator: (rule, value, callback) => {
                                                                    if (getFieldValue('pledgeRateMin') > getFieldValue('pledgeRateMax')) {
                                                                        callback({ message: '输入范围不合理，请检查！' })
                                                                    }
                                                                    if (getFieldValue('pledgeRateMin') === getFieldValue('pledgeRateMax')) {
                                                                        callback({ message: '输入范围不合理，请检查！' })
                                                                    }
                                                                    callback()
                                                                }
                                                            }],
                                                            initialValue: data.pledgeRateMax || (ENV == 'dev' ? 11 : 0)
                                                        })(<InputNumber min={0} disabled={readOnly} />)
                                                    }
                                                    <span className='unit'>%</span>
                                                </FormItem>
                                            </div>
                                        </div>)}
                                </RadioGroup>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className='pageBtn-wrap'>
                        <FormItem>
                            {!readOnly && <Button onClick={this.onSubmit} type='primary'>提交</Button>}
                            {showReturnBtn
                                ? <Button onClick={this.onHandleReturn}>返回</Button>
                                : <Button onClick={this.handleClose}>关闭</Button>}
                        </FormItem>
                    </div>
                </Form>
            </div>
        )
    }
}

Edit.propTypes = {
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func,
    form: PropTypes.object,
    loading: PropTypes.object
}

export default connect(({ product, loading }) => ({ product, loading }))(Form.create()(Edit))
