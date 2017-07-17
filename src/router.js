import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/brandPL'))
          cb(null, { component: require('./routes/brandPL/') })
        }, 'brandPL')
      },
      childRoutes: [
        {
          path: 'currency',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/currency'))
              cb(null, require('./routes/currency/'))
            }, 'currency')
          },
        },
        {
          path: 'inventory/profit-loss-brand',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/brandPL'))
              cb(null, require('./routes/brandPL/'))
            }, 'brandPL')
          },
        },
        {
          path: 'inventory/profit-loss-goods',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/goodsPL'))
              cb(null, require('./routes/goodsPL/'))
            }, 'goodsPL')
          },
        },
        {
          path: 'channelSaleAnalysis',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/channelSaleAnalysis'))
              cb(null, require('./routes/channelSaleAnalysis/'))
            }, 'channelSaleAnalysis')
          },
        },
        {
          path: 'inventory/profit-loss-sku',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/warehouse'))
              cb(null, require('./routes/warehouse/'))
            }, 'warehouse')
          },
        }, {
          path: 'colorSize',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/colorSize'))
              cb(null, require('./routes/colorSize/'))
            }, 'colorSize')
          }
        }, {
          path: 'singleColorSize',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/singleColorSize'))
              cb(null, require('./routes/singleColorSize/'))
            }, 'singleColorSize')
          },
        },
        {
          path: 'product',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/product'))
              cb(null, require('./routes/product/'))
            }, 'product')
          },
        },
        {
          path: 'inventory/stock-age',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/producttype'))
              cb(null, require('./routes/producttype/'))
            }, 'product')
          },
        },
        {
          path: 'outorder',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/outorder'))
              cb(null, require('./routes/outorder/'))
            }, 'outorder')
          },
        },
        {
          path: '*',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        }
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
