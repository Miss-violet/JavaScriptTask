import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { Icon, Tooltip } from 'antd'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import styles from './index.less'
import echarts from 'echarts'


import ListCharts from './LineCharts'
import PieCharts from './PieCharts'

const ProductType = ({ location, dispatch, producttype, loading }) => {
  const { list, brandList, lineCharts, pieCharts, searchInfo, initSearchValue } = producttype
  // console.log('initSearchValue', initSearchValue)

  const onSearch = (info) => {
    dispatch({
      type: 'producttype/query',
      payload: {
        ...searchInfo,
        ...info
      }
    })
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['producttype/query'],
    pagination: false,
    location,
    initSearchValue(key, value) {
      if (key === 'batch_year') {
        searchInfo.batch_year = value
      }
      if (key === 'brand_name') {
        searchInfo.batch_year = ''
        let brand = brandList.filter((item) => {
          return item.label === value
        })
        let ids = ''
        brand.forEach((item) => {
          ids += item.key + ','
        })
        ids = ids.slice(0, ids.length - 1)
        searchInfo.brand_id = ids
      }
      dispatch({
        type: 'producttype/initSearchValue',
        payload: {
          key,
          value
        }
      })
      dispatch({
        type: 'producttype/query',
        payload: {
          ...searchInfo
        }
      })
    }
  }


  const filterProps = {
    brandList,
    dispatch,
    initSearchValue,
    onHidden(changedValue) {
      onSearch({
        brand_id: changedValue.join()
      })
    },
    onChange(changedValue) {
      if ('batch_year' in changedValue) {
        let { batch_year } = changedValue
        onSearch({ batch_year: batch_year.join() })
      }
      // if ('brand_id' in changedValue) {
      //   let { brand_id } = changedValue
      //   let parmas = '-1'
      //   if (brand_id.length > 0) parmas = brand_id.join()
      //   onSearch({ brand_id: parmas })
      // }
      if ('date' in changedValue) {
        let { date } = changedValue
        console.log(changedValue)
        onSearch({
          start_time: date[0],
          end_time: date[1]
        })
      }
    }
  }



  return (
    <div className="content-wrap">
      <Filter {...filterProps} />
      <div>
        <div className='tool-bar'>
          <div className="title">
            <span>库龄结构分析</span>
            <Tooltip placement="top" title=''>
              <Icon type="exclamation-circle-o" />
            </Tooltip>
          </div>
        </div>
        <div className={styles.chartWrap}>
          <div className='chartLf'>
            <ListCharts lineCharts={lineCharts} />
          </div>
          <div className='chartRt'>
            <PieCharts pieCharts={pieCharts} />
          </div>
        </div>
      </div>
      <List {...listProps} />
    </div>
  )
}

ProductType.propTypes = {
  producttype: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ producttype, loading }) => ({ producttype, loading }))(ProductType)
