import React from 'react'
import PropTypes from 'prop-types'
import styles from './Layout.less'
import { config } from '../../utils'
import Menus from './Menu'

const Sider = ({ siderFold, darkTheme, location, changeTheme, navOpenKeys, changeOpenKeys, menu, menuItemKey }) => {
    const menusProps = {
        menu,
        siderFold,
        darkTheme,
        location,
        navOpenKeys,
        changeOpenKeys,
        menuItemKey
    }

    return (
        <div>
            <div className={styles.logo}>
                <img alt={'logo'} src={config.logo} />
                {siderFold ? '' : <span>{config.name}</span>}
            </div>
            <Menus {...menusProps} />
        </div>
    )
}

Sider.propTypes = {
    menu: PropTypes.array,
    siderFold: PropTypes.bool,
    darkTheme: PropTypes.bool,
    location: PropTypes.object,
    changeTheme: PropTypes.func,
    navOpenKeys: PropTypes.array,
    changeOpenKeys: PropTypes.func
}

export default Sider