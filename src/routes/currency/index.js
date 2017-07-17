import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import Filter from './Filter'
import SizeBlock from './SizeBlock'
import ColorBlock  from './ColorBlock'
import { TwoLevelSelect } from '../../components/index'

const SizeColor = ({ location, dispatch, currency, loading }) => {

  const { brandList } = currency

  const filterProps = {
    brandList,
    filterChange(filter) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...filter
        },
      }))
    }
  }

  return (
    <div className="content-wrap">
      <Filter {...filterProps} />
      <SizeBlock />
      <ColorBlock />
      <TwoLevelSelect />
    </div>
  )
}

SizeColor.propTypes = {
  currency: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ currency, loading }) => ({ currency, loading }))(SizeColor)
