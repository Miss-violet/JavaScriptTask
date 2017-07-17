module.exports = {
    // 企业类型
    ENTERPRISE_TYPE: {
        ALL: '',            // 所有
        DEBTOR: 1,          // 借款方
        SUPPLIER: 2,        // 供应商
        INVESTOR: 3         // 出资方
    },
    // 仓库类型
    WAREHOUSE_TYPE: {
        ALL: '',            // 所有
        OVERSEAS: 1,        // 海外仓
        BONDED: 2,          // 保税仓
        //大数据
        PRIVATE: 0,          //自有仓库
        PROXY_SEND: 1,       //"代发仓库"
        PROXY_PURCHASE: 2,   //"代采仓库"
        PLEDGE: 3,           //"质押仓库"
        PROXY_SALE: 4,       //"代销仓库"
        VIRTUAL: 5,          //"虚拟仓库"
    },
    // 状态 ===> 产品管理
    PRODUCT_STATUS: {
        All: '',            // 所有
        NOT_ENABLED: 0,     // 未启用
        ENABLE: 1,          // 启用
        DISABLE: 2,         // 停用
    },
    // 状态 ===> 产品管理
    PRODUCT_DAYS_COUNT: {
        DAYS_360_CHECK: 0,     // 360 check
        DAYS_365_CHECK: 1,          // 365 check
        BOTH_CHECK: 2,         // all check
    },
    // 赎回方式
    REDEEM_MODE: {
        CASH: 0,            // 现金还款
        CREDIT: 1           // 赊销+浮动质押
    },
    // 额度状态
    QUOTA_STATUS: {
        ALL: '',            // 所有
        EFFECTIVE: 1,       // 生效
        INOPERATIVE: 0,     // 未生效
        INVALID: 2          // 失效
    },
    // 审核状态
    CHECK_STATUS: {
        ALL: '',            // 所有
        NOT_CHECKED: 0,     // 未审核
        CHECKED: 1          // 已审核
    },
    // 订单状态
    ORDER_STATUS: {
        ALL: '',            // 所有
        NORMAL: 0,          // 正常
        CANCEL: 2,          // 取消
        VOID: 1,            // 作废
    },
    // 状态 ===> 代采入库单
    STOCKIN_STATUS: {
        ALL: '',            // 所有
        PENDING: 0,         // 待处理
        CONFIRMED: 1,       // 已确认
        REJECTED: 2         // 已拒绝
    },
    //类型  ===> 利息查询
    INTEREST_TYPE: {
        CHARGING: 1,  //计费
        PAYMENT: 2,  //计费
        INTEREST_CORRECTION: 3,  //利息冲正
    },
    // 状态 ===> 质押出仓请求
    COLLATERALOUT_STATUS: {
        PASS: 0,            // 通过
        REFUSE: 1           // 拒绝
    },
    // 合同状态
    CONTRACT_STATUS: {
        WAIT_REPAYMENT: 6,  // 代还款
        REPAYMENT: 7,       // 还款中
        OVERDUE: 8,          // 已逾期
        PAIDOFF: 9,          // 已还清
    },
    // 状态 ===> 保证金还款
    BOND_STATUS: {
        NOT_ENTERED: 0,     // 未录入
        NOT_CHECKED: 1,     // 未审核
        CHECKED: 2          // 已审核
    },
    // 状态 ===> 融资放款
    FINANCE_STATUS: {
        NOT_ENTERED: 0,     // 未录入
        NOT_CHECKED: 1,     // 未审核
        CHECKED: 2          // 审核通过
    },
    // 状态 ===> 赎回收款审核
    REDEMPCHECK_STATUS: {
        NOT_CHECKED: 0,     // 未审核
        CHECKED_PASS: 1,    // 审核通过
        CHECKED_REFUSE: 2   // 审核拒绝
    },
    // 单据状态 ===> 赎回申请浏览
    REDEMPTION_STATUS: {
        PENDING_APPROVAL: 0, // 待审批
        APPROVAL_REJECT: 2,  // 审批拒绝
        REPAYMENT: 1,        // 待还款
        PENDING_DELIVERY: 3, // 还款审核拒绝
        OUTBOUND: 4          // 已出库
    },
    // 日期基数
    DAYS_COUNT: {
        DAYS_360: 0,   //只显示360选项
        DAYS_365: 1,   //只显示365选项
        DAYS_360_365: 2//同时显示360和365选项
    },
    // 入库状态
    STORAGESTATUS: {
        NOT_STORAGE: 0, //未入库
        STAR_STORAGE: 1,//开始入库
        STORAGE_COMPLETED: 2//入库完成
    },
    //赎回收款单审核状态
    REDEMPTION_CHECK: {
        WAIT: 0,   //已付款待审核
        PASSED: 1,  //付款审核通过
        REFUSE: 2,  //付款审核拒绝
    }
}