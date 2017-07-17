import React from 'react'
import PropTypes from 'prop-types'
import commonStyles from '../../assets/styles/index.less'
import { Form, Select, Icon } from 'antd'
import classnames from 'classnames'
const FormItem = Form.Item
const Option = Select.Option

const Filter = ({
    dropdownPlaceholder,
    dimensionList,
    onDropdownChange,
    onEnterChange,
    onEnterEmpty,
    onHandleSelected,
    form: {
        getFieldDecorator,
        getFieldValue,
        setFieldsValue
    }
}) => {

    const dimensionOption = dimensionList.map(item => {
        return <Option key={item}>{item}</Option>
    })

    const handleDropdownChange = (value) => {
        let dropdownPlaceholder
        switch (value) {
            case 'pattern':
                dropdownPlaceholder = '请输入款号'
                break
            case 'sku_code':
                dropdownPlaceholder = '请输入sku码'
                break
            case 'seller_code':
                dropdownPlaceholder = '请输入商家编码'
                break
            case 'goods_name':
                dropdownPlaceholder = '请输入商品名称'
                break
            default:
                break
        }

        setFieldsValue({ dropdown_value: '' })

        onDropdownChange(dropdownPlaceholder)
    }

    window.onkeyup = () => {
        // const handleEnterChange = (value) => {
        const dimension = getFieldValue('dropdown')
        const value = getFieldValue('dropdown_value')
        if (value.trim()) {
            const filter = { dimension, value }
            onEnterChange(filter)
        } else {
            onEnterEmpty()
        }
    }

    const handleSelected = (value) => {
        const dimension = getFieldValue('dropdown')
        const filter = { [dimension]: value }
        onHandleSelected(filter)
    }

    const clx = classnames({
        [commonStyles.searchFilterForm]: true,
        [commonStyles.searchSPFilterForm]: true
    })

    return (
        <div>
            <Form className={clx}>
                <div className="searchWrap">
                    <div className="specialItem">
                        <FormItem className="selectLabel">
                            {
                                getFieldDecorator('dropdown', {
                                    initialValue: 'pattern'
                                })(
                                    <Select onChange={handleDropdownChange}>
                                        <Option value="pattern">款号</Option>
                                        <Option value="sku_code">sku码</Option>
                                        <Option value="seller_code">商家编码</Option>
                                        <Option value="goods_name">商品名称</Option>
                                    </Select>
                                    )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('dropdown_value')(
                                    <Select
                                        mode="combobox"
                                        placeholder={dropdownPlaceholder}
                                        // onSearch={handleEnterChange}
                                        onSelect={handleSelected}
                                        children={dimensionOption}
                                        filterOption={false}
                                        />
                                )
                            }
                        </FormItem>
                    </div>
                </div>
            </Form>
        </div>
    )
}

Filter.propTypes = {
    form: PropTypes.object,
}

export default Form.create()(Filter)
