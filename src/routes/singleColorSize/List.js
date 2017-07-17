import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { Link } from 'dva/router'

const List = ({ location, ...tableProps }) => {
  return (
    <div className={styles.colorSizeList}>
      <Table className='ui-table'
        {...tableProps}
        pagination={false}
        simple
        rowKey={record => record.id}
        />
    </div>
  )
}

List.propTypes = {
  location: PropTypes.object,
}

export default List
