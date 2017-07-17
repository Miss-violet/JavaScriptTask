import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { message } from 'antd'
import { Layout } from '../components'
import { classnames, config, menu } from '../utils'
import { Helmet } from 'react-helmet'
import '../themes/index.less'
import './app.less'
import NProgress from 'nprogress'
const { prefix } = config

const { Header, Footer, Sider, styles } = Layout
let lastHref

const App = ({ children, location, dispatch, app, loading }) => {
    const { user, showModifyPwdModal, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, menuItemKey } = app
    let pathname = location.pathname

    /* 当普通用户直接用路径访问后台管理界面时，页面重定向到企业管理页面 */

    if (user.userType !== '超级管理员' && pathname === '/userManage') {
        window.location.href = '/inventory/profit-loss-brand'
    }

    const selectMenu = (e) => {
        dispatch({
            type: 'app/changeLeftMenu',
            payload: {
                menuItemKey: e.key
            }
        })
    }
    const headerProps = {
        menu,
        user,
        showModifyPwdModal,
        siderFold,
        location,
        isNavbar,
        menuPopoverVisible,
        navOpenKeys,
        switchMenuPopover() {
            dispatch({ type: 'app/switchMenuPopver' })
        },
        logout() {
            dispatch({ type: 'app/logout' })
        },
        switchSider() {
            dispatch({ type: 'app/switchSider' })
        },
        changeOpenKeys(openKeys) {
            dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
        },
        update(data) {
            dispatch({
                type: `app/changeUserPasswd`,
                payload: data,
            })
        },
        openChangePwdModal() {
            dispatch({
                type: 'app/showModifyPwdModal'
            })
        },
        closeChangePwdModal() {
            dispatch({
                type: 'app/closeModifyPwdModal'
            })
        },
        selectMenu
    }

    const siderProps = {
        menu,
        siderFold,
        darkTheme,
        location,
        navOpenKeys,
        changeTheme() {
            dispatch({ type: 'app/switchTheme' })
        },
        changeOpenKeys(openKeys) {
            localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
            dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
        },
        menuItemKey
    }

    // const breadProps = {
    //     menu
    // }

    if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
        return <div>{children}</div>
    }

    const { iconFontJS, iconFontCSS, logo } = config


    return (
        <div>
            <Helmet>
                <title>大数据</title>
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <link rel='icon' href={logo} type='image/x-icon' />
                {iconFontJS && <script src={iconFontJS} />}
                {iconFontCSS && <link rel='stylesheet' href={iconFontCSS} />}
            </Helmet>
            <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
                <div className={styles.main}>
                    {/*<Bread {...breadProps} location={location} /> */}
                    <div className={styles.container}>
                        <div className={styles.content}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    app: PropTypes.object,
    loading: PropTypes.object
}

export default connect(({ app, loading }) => ({ app, loading }))(App)
