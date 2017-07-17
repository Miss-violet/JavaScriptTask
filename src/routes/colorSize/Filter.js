import React from 'react'
import PropTypes from 'prop-types'
import commonStyles from '../../assets/styles/index.less'
import { Form, Cascader, Select, Icon, DatePicker } from 'antd'
import classnames from 'classnames'

const RangePicker = DatePicker.RangePicker

const FormItem = Form.Item
const Option = Select.Option

const Filter = ({
    form: {
        getFieldDecorator,
        getFieldValue,
        setFieldsValue
    }
}) => {

    const options = [{
        label: '一级类目--1',
        value: '1',
        children: [{
            label: '二级类目--1-1',
            value: '1-1'
        }, {
            label: '二级类目--1-2',
            value: '1-2'
        }]
    }, {
        label: '一级类目--2',
        value: '2',
        children: [{
            label: '二级类目--2-1',
            value: '2-1'
        }]
    }, {
        label: '一级类目--3',
        value: '3'
    }]

    const clx = classnames({
        [commonStyles.searchFilterForm]: true,
        [commonStyles.searchSPFilterForm]: true
    })

    return (
        <div>
            <Form className={clx}>
                <div className="searchWrap">
                    <FormItem>
                        {
                            getFieldDecorator('category_id')(
                                <Cascader
                                    options={options}
                                    placeholder="类目"
                                />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <RangePicker
                            format="YYYY-MM"
                        />
                    </FormItem>
                </div>
            </Form>
        </div>
    )
}

Filter.propTypes = {
    form: PropTypes.object
}

export default Form.create()(Filter)
