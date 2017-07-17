import React from 'react'
import PropTypes from 'prop-types'
import commonStyles from '../../assets/styles/index.less'
import { Form, Button, Icon, TreeSelect, DatePicker, Select } from 'antd'
import YearsPicker from '../../components/YearsPicker/YearsPicker'
import MonthsPicker from '../../components/MonthsPicker/MonthsPicker'
import MultiSelect from '../../components/MultiSelect/MultiSelect'
import moment from 'moment'
import classnames from 'classnames'
import 'moment/locale/zh-cn'
import styles from './filter.less'

moment.locale('zh-cn')

const FormItem = Form.Item
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker

const Filter = ({
  brandList,
  dispatch,
  initSearchValue,
  onHidden,
  form: {
    getFieldDecorator,
    getFieldsValue,
    getFieldValue,
    setFieldsValue,
  },
}) => {

  // 点击维度时初始化搜索框的值
  const initBatchYear = initSearchValue.key === 'batch_year' ? [initSearchValue.value] : ''
  const initBrandName = () => {
    if (initSearchValue.key === 'brand_name') {
      let brand = brandList.filter((item) => {
        return item.label === initSearchValue.value
      })
      let values = []
      brand.forEach((item) => {
        values.push(item.value)
      })
      return values
    } else {
      return []
    }
  }

  const clx = classnames({
    [commonStyles.searchFilterForm]: true,
    [commonStyles.searchSPFilterForm]: true,
  })

  return (
    <div className={styles.stockAgeFilter}>
      <Form className={clx}>
        <div className='searchWrap'>
          <FormItem>
            {
              getFieldDecorator('batch_year', {
                initialValue: initBatchYear
              })(
                <YearsPicker
                  placeholder='首批入库年份'
                />
                )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('brand_id', {
                initialValue: initBrandName()
              })(
                <MultiSelect
                  selectData={brandList}
                  onHidden={onHidden}
                  placeholder="品牌"
                />
                )
            }
          </FormItem>
        </div>
        <div className="dateFilter">
          <div className='specialItem'>
            <FormItem className='selectLabel' label='月'>
              {
                getFieldDecorator('date', {
                  initialValue: moment().subtract(1, 'month')
                })(
                  <MonthsPicker />
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
  onAdd: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create({
  onValuesChange(props, changedValue) {
    const { onChange } = props
    onChange(changedValue)
  }
})(Filter)
