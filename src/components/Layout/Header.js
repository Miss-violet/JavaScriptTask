import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover, Modal, Form, Input, Tooltip, Button } from 'antd'
import styles from './Header.less'
import commonStyles from '../../assets/styles/index.less'
import Menus from './Menu'
import pathToRegexp from 'path-to-regexp'

const SubMenu = Menu.SubMenu
const FormItem = Form.Item

class Header extends React.Component {
    constructor(props) {
        super(props);
        const {
            user,
            item,
            form,
            openChangePwdModal,
            showModifyPwdModal,
            update,
            selectMenu,
        } = props

        const { 
            getFieldValue,
            setFieldsValue,
        } = form

        let menuItem = []
        menuItem.push({ name: '基础资料', index: 'brandPL' })
        menuItem.push({ name: '额度管理', index: 'quotamgr' })
        menuItem.push({ name: '融资贷款', index: 'loansmgr' })
        menuItem.push({ name: '货物赎回', index: 'redempreq' })
        menuItem.push({ name: '库存管理', index: 'purchasestock' })
        menuItem.push({ name: '押品管理', index: 'collateralmgr' })
        menuItem.push({ name: '换货管理', index: 'exchangemgr' })
        menuItem.push({ name: '资金管理', index: 'interestquery' })
        menuItem.push({
            name: '后台管理', index: 'userManage'
        })

        this.state = {
            visible: false,
            menuItem,
            /* 密码格式 填写提示 */
            pswPmtText: <div><p>· 包含数字、大写字母和小写字母</p><p>· 密码长度至少8个字符</p></div>,
            menuItemKey: -1
        }
    }
    /* 显示 修改密码 弹窗 */
    showModal = () => {
        this.props.openChangePwdModal()
    }
    /* 修改密码 弹窗 确定按钮点击事件 */
    handleOk = (e) => {
        const { form, update } = this.props
        const {validateFields, getFieldsValue, resetFields } = form

        validateFields((errors) => {
            if (errors) {
                return
            }

            const id = this.props.user.id

            let {
                origPassword,
                password,
                confirmPassword,
            } = getFieldsValue()


            const data = {
                id,
                origPassword,
                password,
                confirmPassword,
            }
            update(data)
        })
        resetFields()
    }
    /* 关闭 修改密码 弹窗 */
    handleCancel = (e) => {
        const { form, update } = this.props
        const {resetFields} = form
        resetFields()
        this.props.closeChangePwdModal()
    }

    handleClickMenu = e => e.key === 'logout' && this.props.logout()

    /* 点击一级菜单，二级菜单联动 */
    handleSelect = (e) => {
        this.props.selectMenu(e)
    }

    resetPwd = () => {
        /* 监听旧密码文本框，当为空时，清空新密码与确认密码的文本框 */
        if( this.props.form.getFieldValue('origPassword') === '') {
            this.props.form.setFieldsValue({
                password: '',
                confirmPassword: '',
            })
        }
        /* 监听新密码框，当为空时，清空确认密码的文本框 */
        if( this.props.form.getFieldValue('password') === '') {
            this.props.form.setFieldsValue({
                confirmPassword: '',
            })
        }
    }

    render() {
        const {
            user,
            switchSider,
            siderFold,
            isNavbar,
            menuPopoverVisible,
            location,
            switchMenuPopover,
            navOpenKeys,
            changeOpenKeys,
            menu,
            form,
            item,
            update,
        } = this.props

        const {
            getFieldDecorator,
            getFieldValue,
            resetField
        } = form

        const menuItemKey = this.state.menuItemKey
        
        const menusProps = {
            menu,
            siderFold: true,
            darkTheme: false,
            isNavbar,
            handleClickNavMenu: switchMenuPopover,
            location,
            navOpenKeys,
            changeOpenKeys
        }
        let menuItem = this.state.menuItem
        let pswPmtText = this.state.pswPmtText

        /* 监听路由，修改一级导航选中项 */
        let currentMenu
        let defaultSelectedKeys = ['0']
        for (let item of menu) {
            if (item.router && pathToRegexp(item.router).exec(location.pathname)) {
                currentMenu = item
                break
            }
        }
        const getPathArray = (array, current, pid, id) => {
            let result = [String(current[pid])]         //pid:维护一级与二级的父子关系
            const getPath = (item) => {
                if (item && item[pid]) {
                    result.unshift(String(item[pid]))
                    getPath(queryArray(array, item[pid], id))
                }
            }
            return result
        }
        if (currentMenu) {
            defaultSelectedKeys = getPathArray(menu, currentMenu, 'pid', 'id')
        }

        return (
            <div className={styles.header}>
                {
                    isNavbar
                        ? <Popover placement='bottomLeft' onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger='click' content={<Menus {...menusProps} />}>
                            <div className={styles.button}>
                                <Icon type='bars' />
                            </div>
                        </Popover>
                        : <div className={styles.button} onClick={switchSider}>
                            <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
                        </div>
                }
                <Menu className={styles.nav} mode="horizontal" onClick={(e) => this.handleSelect(e)} defaultSelectedKeys={defaultSelectedKeys}>
                    {
                        menuItem.map((data, i) => {
                            /* 非超级管理员登录不能看到“后台用户管理界面” */
                            if(i == 8 && user.userType !== '超级管理员') {
                                return false
                            }
                            return (
                                <Menu.Item key={i}><Link to={`/${data.index}`}>{data.name}</Link></Menu.Item>
                            )
                        })
                    }
                </Menu>
                <div className={styles.rightWarpper}>
                    <div className={styles.button}>
                        <Icon type='mail' />
                    </div>
                    <Menu mode='horizontal' onClick={this.handleClickMenu}>
                        <SubMenu className={styles.userWrap} style={{
                            float: 'right'
                        }} title={<span>您好！
                            {user.username} </span>}
                            >
                            <Menu.Item key='logout'>
                                退出
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                    <a href="javascript:void(0)" className={styles.modifyPsd} onClick={this.showModal}>
                        修改密码
                    </a>
                </div>

                <Modal
                    className='vertical-center-modal'
                    okText="提交"
                    cancelText="取消"
                    title="用户修改密码"
                    visible={this.props.showModifyPwdModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleOk}>提交</Button>,
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                    ]}
                    >
                    <Form className={commonStyles.modalForm}>
                        <div className='item'>
                            <FormItem label='登录ID'>
                                <span>
                                    {user.code}
                                </span>
                            </FormItem>
                        </div>
                        <div className='item'>
                            <FormItem label='原密码'>
                                <div>
                                    {getFieldDecorator('origPassword', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入原密码'
                                            }, {
                                                validator: (rule, value, callback) => {
                                                    const psdReg = /^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{7,63}$/
                                                    if (!psdReg.test(getFieldValue('origPassword'))) {
                                                        callback({ message: '原密码仅允许输入数字、英文及两种组合，长度至少8个字符，请检查！' })
                                                        return
                                                    }
                                                    callback()
                                                }
                                            }
                                        ]
                                    })(
                                        <Input type="password" onChange={this.resetPwd} />
                                        )}
                                    <Tooltip placement="bottom" title={pswPmtText}>
                                        <Icon type="info-circle-o" className="pmtInfo" />
                                    </Tooltip>
                                </div>
                            </FormItem>
                        </div>

                        <div className='item'>
                            <FormItem label='密码'>
                                <div>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入密码'
                                            }, {
                                                validator: (rule, value, callback) => {
                                                    const psdReg = /^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{7,63}$/
                                                    if (!psdReg.test(getFieldValue('password'))) {
                                                        callback({ message: '密码仅允许输入数字、英文及两种组合，长度至少8个字符，请检查！' })
                                                        return
                                                    }
                                                    if (getFieldValue('origPassword') && getFieldValue('origPassword') === getFieldValue('password')) {
                                                        callback({ message: '新旧密码一致，请检查！' })
                                                        return
                                                    }
                                                    callback()
                                                }
                                            }
                                        ]
                                    })(
                                        <Input type="password" onChange={this.resetPwd} />
                                        )}
                                    <Tooltip placement="bottom" title={pswPmtText}>
                                        <Icon type="info-circle-o" className="pmtInfo" />
                                    </Tooltip>
                                </div>
                            </FormItem>
                        </div>

                        <div className='item'>
                            <FormItem label='确认密码'>
                                {getFieldDecorator('confirmPassword', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入确认密码'
                                        }, {
                                            validator: (rule, value, callback) => {
                                                if (getFieldValue('confirmPassword') !== getFieldValue('password')) {
                                                    callback({ message: '两次输入的密码不一致，请检查！' })
                                                    return
                                                }
                                                callback()
                                            }
                                        }
                                    ]
                                })(
                                    <Input type="password" />
                                    )}
                            </FormItem>
                        </div>
                    </Form>
                </Modal>
            </div>
        )
    }
}

Header.propTypes = {
    menu: PropTypes.array,
    user: PropTypes.object,
    logout: PropTypes.func,
    switchSider: PropTypes.func,
    siderFold: PropTypes.bool,
    isNavbar: PropTypes.bool,
    menuPopoverVisible: PropTypes.bool,
    location: PropTypes.object,
    switchMenuPopover: PropTypes.func,
    navOpenKeys: PropTypes.array,
    changeOpenKeys: PropTypes.func,
    form: PropTypes.object.isRequired,
    update: PropTypes.func,
}

export default Form.create()(Header)
