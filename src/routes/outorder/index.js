import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import List from './List'
import Filter from './Filter'
import Diagram from './Diagram'
import Constutute from './Constitute'
// import styles from './index.less'

const outorder = ({ location, dispatch, outorder, loading }) => {
  const { pagination, list, goodsList, regionList, brandList } = outorder

  console.log('regionList', regionList)

  const listProps = {
    dataSource: list,
    loading: loading.effects['outorder/query'],
    pagination,
    location,
    onChange(pageNumber) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          pageNumber: pageNumber.current,
          pageSize: pageNumber.pageSize,
        },
      }))
    },
  }

  const filterProps = {
    onSearch(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
        },
      }))
    },
  }

  const constituteProps = {
    goodsList,
    regionList,
    brandList
  }


  return (
    <div>
      <div className="content-wrap">
        <Filter {...filterProps} />
        <Diagram />
        <Constutute {...constituteProps} />
        {/*<List {...listProps} />*/}
      </div>
    </div>
  )
}

outorder.propTypes = {
  outorder: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ outorder, loading }) => ({ outorder, loading }))(outorder)
