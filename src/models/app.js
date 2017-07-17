import { query, logout } from '../services/app'
import { routerRedux } from 'dva/router'
import { message, Alert } from 'antd'
import { parse } from 'qs'
import { config, injectResponse_Error } from '../utils'
import { authRequest } from '../utils/request'
const { prefix, tokenExpired } = config

export default {
  namespace: 'app',
  state: {
    user: {},
    showModifyPwdModal: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    menuItemKey: -1
  },
  subscriptions: {

    setup({ dispatch }) {

      injectResponse_Error((data) => {

        if (data.status === 401) {
          dispatch({ type: 'authFailed' }, data)
          message.error("认证失败, 重新登录", 2.0, () => {
            dispatch({ type: 'logout', data })
          })
        }


      })

      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {

    *query({
      payload,
    }, { call, put, select }) {
      //  yield put(routerRedux.push('/goodsinf'))
      // const user = JSON.parse(localStorage.getItem(`${prefix}currentUser`)) || {}
      // const now = new Date().getTime();
      // let tExpired = false;

      // if (user.createTime && now - user.createTime > tokenExpired) {
      //   tExpired = true;
      //   yield put({
      //     type: 'tokenIsExpired',
      //     payload: user,
      //   })
      // }

      // if (user.token && !tExpired) {
      //   yield put({
      //     type: 'loginSuccess',
      //     payload: user,
      //   })
      if (location.pathname === '/' || location.pathname === '/login') {
        yield put(routerRedux.push('/inventory/profit-loss-brand'))
      }
      // } else {
      //   if (location.pathname !== '/login') {
      //     let from = location.pathname
      //     if (location.pathname === '/brandPL') {
      //       from = '/brandPL'
      //     }
      // window.location = `${location.origin}/login?from=${from}`
      // yield put(routerRedux.push(`/login?from=${from}`))
      // }
      // }
    },
    *logout({
      payload,
    }, { call, put }) {
      yield put({ type: 'logOutSuccess', payload })
      yield put({ type: 'query' })
      // const data = yield call(logout, parse(payload))
      // if (data.success) {
      //   yield put({ type: 'query' })
      // } else {
      //   throw (data)
      // }
    },

    *changeNavbar({
      payload,
    }, { put, select }) {
      const { app } = yield (select(_ => _))

      const isNavbar = document.body.clientWidth < 769
      // console.info("isNavBar => ", isNavbar)
      // console.info("app.isNavBar => ", app.isNavbar)
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    tokenIsExpired(state, { payload: user }) {
      return state
    },

    authFailed(state) {
      return {
        ...state,
      }
    },

    loginSuccess(state, { payload: user }) {
      // authRequest(user.token)
      // if (!user.createTime) {
      //   user.createTime = new Date().getTime()
      // }
      // localStorage.setItem(`${prefix}currentUser`, JSON.stringify(user))

      return {
        ...state,
        // user,
      }
    },

    logOutSuccess(state, { payload: info }) {
      authRequest("")
      let u = {}
      localStorage.setItem(`${prefix}currentUser`, JSON.stringify(u))
      return {
        ...state,
        user: u,
      }
    },

    showModifyPwdModal(state) {
      return {
        ...state,
        showModifyPwdModal: true,
      }
    },

    closeModifyPwdModal(state) {
      return {
        ...state,
        showModifyPwdModal: false
      }
    },


    switchSider(state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme(state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar(state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys(state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },

    changeLeftMenu(state, { payload }) {
      return {
        ...state,
        menuItemKey: payload.menuItemKey
      }
    }
  },
}
