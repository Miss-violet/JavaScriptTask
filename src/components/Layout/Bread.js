import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'dva/router'
import styles from './Bread.less'
import pathToRegexp from 'path-to-regexp'
import { queryArray } from '../../utils'

const Bread = ({ menu }) => {
    // 匹配当前路由
    let pathArray = []
    let current
    for (let index in menu) {
        if (menu[index].router && pathToRegexp(menu[index].router).exec(location.pathname)) {
            current = menu[index]
            break
        }
    }
    const getPathArray = (item) => {
        pathArray.unshift(item)
        console.info('item->', item.mpid)
        if (item.mpid !== -1) {
            getPathArray(queryArray(menu, item.mpid, 'id'))
        }
    }

    if (!current) {
        pathArray.push(menu[0])
        pathArray.push({
            id: 404,
            name: 'Not Found'
        })
    } else {
        getPathArray(current)
    }

    // 递归查找父级
    const breads = pathArray.map((item, key) => {
        const content = (
            <span>
            { item.name }
            </span>
        )
        return (
            <Breadcrumb.Item key={key}>
                {
                    ((pathArray.length - 1) !== key)
                    ? <Link to={item.router}>
                        {content}
                    </Link>
                    : content
                }
            </Breadcrumb.Item>
        )
    })

    return (
        <div className={styles.bread}>
            <div className={styles.position}><Icon className={styles.anticon} type='environment-o' /></div>
            <Breadcrumb className={styles.breadItem} separator='>'>
                <Breadcrumb.Item>当前位置：</Breadcrumb.Item>
                {breads}
            </Breadcrumb>
        </div>
    )
}

Bread.propTypes = {
    menu: PropTypes.array
}

export default Bread
