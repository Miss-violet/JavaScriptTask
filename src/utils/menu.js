/**
 * id   -- 值唯一，取值规则，一级菜单为key+1，二级菜单为(key+1)0x，二级菜单内页为(key+1)0x0x （x为本菜单项在总菜单项里的位置）
 * mpid -- 值为-1时，在左侧菜单中显示，其他值为二级菜单的id，用于建立内页与二级菜单的关系
 * pid  -- 同一个一级菜单下的菜单pid值一致，从0开始，对应一级菜单menu自带的key值，用于建立二级菜单与一级菜单的关系
 */

module.exports = [
  {
    id: 101,      //101
    mpid: -1,
    pid: 0,
    name: '品牌损益统计',
    router: '/inventory/profit-loss-brand',
  }, {
    id: 102,
    mpid: -1,
    pid: 0,
    name: '商品损益统计',
    router: '/inventory/profit-loss-goods',
  }, {
    id: 103,
    mpid: -1,
    pid: 0,
    name: 'SKU损益统计',
    router: '/warehouse',
  }, {
    id: 10301,
    mpid: 103,
    pid: 0,
    name: '仓库信息维护',
    router: '/warehouse/edit',
  }, {
    id: 10302,
    mpid: 103,
    pid: 0,
    name: '仓库信息查看',
    router: '/warehouse/:id',
  }, {
    id: 104,
    mpid: -1,
    pid: 0,
    name: '货币管理',
    router: '/currency',
  }, {
    id: 105,
    mpid: -1,
    pid: 0,
    name: '单品配色配码推荐',
    router: '/goodsinf',
  }, {
    id: 10501,
    mpid: 105,
    pid: 0,
    name: '商品信息查看',
    router: '/goodsinf/:id',
  }, {
    id: 106,
    mpid: -1,
    pid: 0,
    name: '库龄结构分析',
    router: '/producttype',
  },
  {
    id: 108,
    mpid: -1,
    pid: 0,
    name: '渠道销售分析',
    router: '/channelSaleAnalysis',
  }, {
    id: 107,
    mpid: -1,
    pid: 0,
    name: '产品管理',
    router: '/product',
  }, {
    id: 10701,
    mpid: 107,
    pid: 0,
    name: '产品信息维护',
    router: '/product/edit',
  }, {
    id: 10702,
    mpid: 107,
    pid: 0,
    name: '产品信息查看',
    router: '/product/:id',
  }, {
    id: 201,      //201
    mpid: -1,
    pid: 1,
    name: '额度管理',
    router: '/quotamgr',
  }, {
    id: 20101,
    mpid: 201,
    pid: 1,
    name: '额度信息维护',
    router: '/quotamgr/edit',
  },
  {
    id: 20102,
    mpid: 201,
    pid: 1,
    name: '额度信息查看',
    router: '/quotamgr/detail',
  }, {
    id: 301,      //301
    mpid: -1,
    pid: 2,
    name: '贷款管理',
    router: '/loansmgr',
  }, {
    id: 30101,
    mpid: 301,
    pid: 2,
    name: '贷款业务审批',
    router: '/loansmgr/:id',
  }, {
    id: 302,
    mpid: -1,
    pid: 2,
    name: '代采入库单',
    router: '/stockin',
  }, {
    id: 30201,
    mpid: 302,
    pid: 2,
    name: '代采入库单详情',
    router: '/stockin/:id',
  }, {
    id: 401,      //401
    mpid: -1,
    pid: 3,
    name: '赎回申请浏览',
    router: '/redempreq',
  }, {
    id: 40101,
    mpid: 401,
    pid: 3,
    name: '赎回申请详情',
    router: '/redempreq/:id',
  }, {
    id: 402,
    mpid: -1,
    pid: 3,
    name: '赎回出库单',
    router: '/outorder',
  }, {
    id: 40201,
    mpid: 402,
    pid: 3,
    name: '赎回出库详情',
    router: '/outorder/:id',
  }, {
    id: 501,        //501
    mpid: -1,
    pid: 4,
    name: '代采库存查询',
    router: '/purchasestock',
  }, {
    id: 502,
    mpid: -1,
    pid: 4,
    name: '代采批次库存',
    router: '/purchasebatch',
  },
  // {
  //   id: 503,
  //   mpid: -1,
  //   pid: 4,
  //   name: '押品库存查询',
  //   router: '/collateralstock',
  // }, 
  {
    id: 601,        //601
    mpid: -1,
    pid: 5,
    name: '质押品管理',
    router: '/collateralmgr',
  }, {
    id: 602,
    mpid: -1,
    pid: 5,
    name: '质押出仓请求',
    router: '/collateralout',
  }, {
    id: 60201,
    mpid: 602,
    pid: 5,
    name: '出库详情',
    router: '/collateralout/:id',
  },
  {
    id: 701,        //701
    mpid: -1,
    pid: 6,
    name: '换货浏览',
    router: '/exchangemgr',
  }, {
    id: 70101,
    mpid: 701,
    pid: 6,
    name: '换货单详情',
    router: '/exchangemgr/:id',
  },
  {
    id: 801,        //801
    mpid: -1,
    pid: 7,
    name: '利息查询',
    router: '/interestquery',
  },
  {
    id: 802,
    mpid: -1,
    pid: 7,
    name: '风险敞口汇总',
    router: '/risksum',
  }, {
    id: 803,
    mpid: -1,
    pid: 7,
    name: '风险敞口详情',
    router: '/riskdetail',
  }, {
    id: 804,
    mpid: -1,
    pid: 7,
    name: '保证金收款',
    router: '/bond',
  }
  , {
    id: 80401,
    mpid: 804,
    pid: 7,
    name: '保证金收款单',
    router: '/bond/:id',
  },
  {
    id: 805,
    mpid: -1,
    pid: 7,
    name: '融资放款',
    router: '/financeLoan',
  }
  , {
    id: 80501,
    mpid: 805,
    pid: 7,
    name: '融资放款单',
    router: '/financeLoan/:id',
  }, {
    id: 806,
    mpid: -1,
    pid: 7,
    name: '赎回收款审核',
    router: '/redempcheck',
  }, {
    id: 80601,
    mpid: 806,
    pid: 7,
    name: '赎回收款单',
    router: '/redempcheck/:id',
  },
  {
    id: 901,      //901
    mpid: -1,
    pid: 8,
    name: '后台用户管理',
    router: '/userManage',
  },
]

