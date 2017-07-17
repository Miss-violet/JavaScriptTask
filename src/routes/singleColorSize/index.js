import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import { sizeColumns, colorColumns } from './columns'
import { Icon, Tabs, Tooltip } from 'antd'
import styles from './index.less'

const TabPane = Tabs.TabPane

const SingleColorSize = ({ location, dispatch, singleColorSize, loading }) => {

    const { sizeList, colorList, dropdownPlaceholder, dimensionList, colorParams, season } = singleColorSize

    const filterProps = {
        dropdownPlaceholder,
        dimensionList,
        onDropdownChange(placeholder) {
            dispatch({
                type: 'singleColorSize/dropdownChange',
                payload: {
                    placeholder
                }
            })
        },
        onEnterChange(filter) {
            dispatch({
                type: 'singleColorSize/queryDimensionList',
                payload: filter
            })
        },
        onEnterEmpty() {
            dispatch({
                type: 'singleColorSize/queryDimensionListEmpty'
            })
        },
        onHandleSelected(filter) {
            const sizeParams = {
                ...filter,
                uri: 'dm_csr_goods_size_reorder',
                company_id: 'lsyj-roomy'
            }
            const colorParams = {
                ...filter,
                season,
                uri: 'dm_csr_goods_color_reorder',
                company_id: 'lsyj-roomy'
            }
            dispatch({
                type: 'goodsinf/selectChange',
                payload: {
                    sizeParams,
                    colorParams
                }
            })
        }
    }

    const sizeListProps = {
        columns: sizeColumns,
        dataSource: sizeList
    }

    const colorListProps = {
        columns: colorColumns,
        dataSource: colorList
    }

    const handleSeasonChange = (key) => {
        dispatch({
            type: 'singleColorSize/seasonChange',
            payload: {
                ...colorParams,
                season: key
            }
        })
    }

    return (
        <div className={styles.collocateColorSize}>
            <div className="content-wrap">
                <Filter {...filterProps} />
                <div>
                    <div className='tool-bar'>
                        <div className="title">
                            <span>尺码配比</span>
                            <Tooltip placement="top" title='鼠标移入每列的列头将出现该指标的口径解释'>
                                <Icon type="exclamation-circle-o" />
                            </Tooltip>
                        </div>
                    </div>
                    <div className='chartWrap'>
                        <div className='chartLf'>图</div>
                        <List {...sizeListProps} />
                    </div>
                </div>
                <div>
                    <div className='tool-bar'>
                        <div className="title">
                            <span>颜色配比</span>
                            <Tooltip placement="top" title='鼠标移入每列的列头将出现该指标的口径解释'>
                                <Icon type="exclamation-circle-o" />
                            </Tooltip>
                        </div>
                        <Tabs defaultActiveKey="春" onChange={handleSeasonChange}>
                            <TabPane tab="春" key="春"></TabPane>
                            <TabPane tab="夏" key="夏"></TabPane>
                            <TabPane tab="秋" key="秋"></TabPane>
                            <TabPane tab="冬" key="冬"></TabPane>
                        </Tabs>
                    </div>

                    <div className='chartWrap'>
                        <div className='chartLf'>图</div>
                        <List {...colorListProps} />
                    </div>
                </div>
            </div>
        </div>
    )
}

SingleColorSize.propTypes = {
    singleColorSize: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default connect(({ singleColorSize, loading }) => ({ singleColorSize, loading }))(SingleColorSize)

