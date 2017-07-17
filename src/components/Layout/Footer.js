import React from 'react'
import styles from './Footer.less'
import { Icon } from 'antd'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerWrap}>
                <div className={styles.logoWrap}>
                    <div className={styles.zhuozhiLogo} />
                    <div>
                        <a href='http://www.chinaicip.com/' className={styles.link}>http://www.chinaicip.com/</a>
                    </div>
                </div>
                <div className={styles.dividingLine} />
                <div className={styles.logoWrap}>
                    <div className={styles.eDaiLogo} />
                    <div>
                        <a href='http://e111.com.cn/' className={styles.link}>http://e111.com.cn/</a>
                    </div>
                </div>
                <div className={styles.InfoWrap}>
                    <div>
                        <a href='#'>关于卓普信</a>|<a href='#'>帮助中心</a>|<a href='#'>联系我们</a>|<a href='#'>免责声明</a>
                    </div>
                    <div>
                        <span>CopyRight © 2017 卓普信（香港）有限公司 XXX.com 版权所有</span>|<a href='#'>备案号：XXXXXX</a>
                    </div>
                </div>
                <div className={styles.contactWrap}>
                    <div className={styles.title}>
                        联系我们
                    </div>
                    <a href='#'><Icon className={styles.anticon} type='customer-service' />在线客服</a>|<a href='#'><Icon className={styles.anticon} type='mail' />客服邮箱</a>
                </div>
            </div>
        </div>
    )
}

export default Footer
