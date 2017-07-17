const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { api } = config

let usersListData = Mock.mock({
    'brand|20': [
        {
            label: '@cword(2)品牌',
            'value|+1': 1,
            'key|+1': 1
        },
    ],
    'platform|+1': [
        {
            label: '平台@cword(3)',
            'value|+1': 1,
            'key|+1': 1
        }
    ],
    'warehouse|20': [
        {
            label: '@cword(2)仓库',
            'value|+1': 1,
            'key|+1': 1
        }
    ],
    'warehouse_type|20': [
        {
            label: '@cword(2)类型仓库',
            'value|+1': 1,
            'key|+1': 1
        }
    ],
    'pattern|+1': [
        {
            label: '款号@integer(10, 99)',
            'value|+1': 1,
            'key|+1': 1
        }
    ],
    'sku_code|+1': [
        {
            label: 'sku_code@integer(1000, 9999)',
            'value|+1': 1,
            'key|+1': 1
        }
    ],
    'goods_name|+1': [
        {
            label: '商品@cword(3)',
            'value|+1': 1,
            'key|+1': 1
        }
    ],
    'seller_code|+1': [
        {
            label: '商家@word(5)',
            'value|+1': 1,
            'key|+1': 1
        }
    ]
})


const { brand, platform, warehouse, warehouse_type, pattern, sku_code, goods_name, seller_code } = usersListData

const NOTFOUND = {
    message: 'Not Found',
    documentation_url: 'http://localhost:8000/request',
}

module.exports = {

    [`POST ${api.select.brand}`](req, res) {
        res.status(200).json({ data: brand })
    },

    [`POST ${api.select.platform}`](req, res) {
        res.status(200).json({ data: platform })
    },

    [`POST ${api.select.warehouse}`](req, res) {
        res.status(200).json({ data: warehouse })
    },

    [`POST ${api.select.warehouse_type}`](req, res) {
        res.status(200).json({ data: warehouse_type })
    },

    [`POST ${api.select.pattern}`](req, res) {
        res.status(200).json({ data: pattern })
    },

    [`POST ${api.select.sku_code}`](req, res) {
        res.status(200).json({ data: sku_code })
    },

    [`POST ${api.select.goods_name}`](req, res) {
        res.status(200).json({ data: goods_name })
    },

    [`POST ${api.select.seller_code}`](req, res) {
        res.status(200).json({ data: seller_code })
    }

}
