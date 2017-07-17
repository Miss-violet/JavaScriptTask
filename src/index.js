import './index.html'
import 'babel-polyfill'
import dva from 'dva'
import createLoading from 'dva-loading'
import { browserHistory } from 'dva/router'
import { message } from 'antd'
import { createLogger } from 'redux-logger';

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: browserHistory,
  onAction: createLogger({
    predicate: true,
    collapsed: true,
    duration: true,
    diff: true}),
  onError (error) {
    console.error("error => ", error)
    message.error(error.message, 2.0)
  },
})

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
