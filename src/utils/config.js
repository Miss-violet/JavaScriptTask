
const apiPrefix = '/api';
//force skip local mock server

let fileBaseURL = "devops.qa.idea.linesum.com:18080";
if (process.env.NODE_ENV === "production") {
    //fileBaseURL = ENV == 'dev' ? "devops.qa.idea.linesum.com:18080" : BASEURL;
    fileBaseURL = BASEURL
}
fileBaseURL = fileBaseURL.replace("http://", '')
console.info("fileBaseURL = > ", fileBaseURL)
console.info("NODE_ENV => ", process.env.NODE_ENV)

module.exports = {
    name: '大数据',
    prefix: 'datahue',
    footerText: 'DataHue  © 2017 DataHue',
    logo: '/logo.png',
    icons: {
        word: '/word.png',
        excel: '/excel.png',
        PDF: '/PDF.png',
        zip: '/zip.png',
        img: '/img.png'
    },
    iconFontCSS: '/iconfont.css',
    iconFontJS: '/iconfont.js',
    // baseURL: 'http://localhost:8000',
    baseURL: 'http://localhost:8000',

    YQL: ['http://www.zuimeitianqi.com'],
    CORS: ['http://localhost:7000'],
    openPages: ['/login'],
    tokenExpired: 24 * 60 * 60 * 1000, //本地token超时时间, 24小时
    auth: {
        userLogin: '/login/login',
        userLogout: '/login/logout',
    },

    apiPrefix,

    api: {
        dashboard: `${apiPrefix}/dashboard`,

        queryData: {
            noPaging: `/bi/basis/data`,
            paging: `/bi/basis/paging_data`,
        },

        outorder: {
            uri: `${apiPrefix}/redemption/outbound`,
            list: `${apiPrefix}/redemption/outbound/list`,
            id: `${apiPrefix}/redemption/outbound/:id`,
        },

        outbound: {
            uri: `${apiPrefix}/redemption/outbound/goods/list`,
            list: `${apiPrefix}/redemption/outbound/goods/list/:id`,
            id: `${apiPrefix}/redemption/outbound/goods/list/:id`,
        },

        outboundbatch: {
            uri: `${apiPrefix}/redemption/outbound/batch/list`,
            list: `${apiPrefix}/redemption/outbound/batch/list/:id`,
            id: `${apiPrefix}/redemption/outbound/batch/list/:id`,
        },

        redempcheck: {
            uri: `${apiPrefix}/capital/redemption`,
            list: `${apiPrefix}/capital/redemption/list`,
            id: `${apiPrefix}/capital/redemption/:id`
        },

        quotamgr: {
            uri: `${apiPrefix}/credit`,
            list: `${apiPrefix}/credit/list`,
            id: `${apiPrefix}/credit/:id`,
        },

        brandPL: {
            uri: `${apiPrefix}/base/profit_loss_brand`,
            list: `${apiPrefix}/base/profit_loss_brand/list`,
            id: `${apiPrefix}/base/profit_loss_brand/:id`,
        },

        goodsPL: {
            uri: `/bi/basis/data`,
            list: `/bi/basis/paging_data`,
        },
        invoiceAnalysis: {
            uri: `${apiPrefix}/base/invoiceAnalysis`,
            list: `${apiPrefix}/base/invoiceAnalysis/list`,
            id: `${apiPrefix}/base/invoiceAnalysis/:id`,
        },

        currency: {
            uri: `${apiPrefix}/base/currency`,
            list: `${apiPrefix}/base/currency/list`,
            id: `${apiPrefix}/base/currency/:id`,
        },

        goodsinf: '/bi/basis/data',

        sku: {
            list: '/bi/basis/data',
            paging: '/bi/basis/paging_data',
        },

        redempreq: {
            uri: `${apiPrefix}/redemption/apply`,
            list: `${apiPrefix}/redemption/apply/list`,
            id: `${apiPrefix}/redemption/apply/:id`,
            cashPDF: `${fileBaseURL}/redemption/apply/cash/download/`,
            creditPDF: `${fileBaseURL}/redemption/apply/credit/download/`
        },

        reqCashList: { // 商品
            uri: `${apiPrefix}/redemption/apply/goods`,
            list: `${apiPrefix}/redemption/apply/goods/list/:id`,
            id: `${apiPrefix}/redemption/apply/goods/:id`,
        },

        reqCashBatchList: { // 批次
            uri: `${apiPrefix}/redemption/apply/batch`,
            list: `${apiPrefix}/redemption/apply/batch/list/:id`,
            id: `${apiPrefix}/redemption/apply/batch/:id`,
        },

        reqPledgeList: { // 赊销
            uri: `${apiPrefix}/redemption/apply/finance`,
            list: `${apiPrefix}/redemption/apply/finance/list/:id`,
            id: `${apiPrefix}/redemption/apply/finance/:id`,
        },

        warehouse: {
            uri: `${apiPrefix}/base/warehouse`,
            list: `${apiPrefix}/base/warehouse/list`,
            id: `${apiPrefix}/base/warehouse/:id`,
        },

        loansmgr: {
            uri: `${apiPrefix}/finance/loan`,
            list: `${apiPrefix}/finance/loan/list`,
            id: `${apiPrefix}/finance/loan/:id`,
            attach: `${apiPrefix}/finance/loan/attach/:id`,
        },
        stockin: {
            uri: `${apiPrefix}/finance/purchase`,
            list: `${apiPrefix}/finance/purchase/list`,
            id: `${apiPrefix}/finance/purchase/:id`,
        },

        stockingoods: {
            uri: `${apiPrefix}/finance/purchase/goods`,
            list: `${apiPrefix}/finance/purchase/goods/list/:id`,
            id: `${apiPrefix}/finance/purchase/goods/list/:id`
        },

        stockinbatch: {
            uri: `${apiPrefix}/finance/purchase/batch`,
            list: `${apiPrefix}/finance/purchase/batch/list/:id`,
            id: `${apiPrefix}/finance/purchase/batch/list/:id`
        },

        product: {
            uri: `${apiPrefix}/base/product`,
            list: `${apiPrefix}/base/product/list`,
            id: `${apiPrefix}/base/product/:id`,
            status: `${apiPrefix}/base/product/status/:id`,
        },

        producttype: {
            uri: `${apiPrefix}/open/pss_stock_age_line`,
            list: `${apiPrefix}/open/pss_stock_age_line`,
            id: `${apiPrefix}/pss_stock_age_line/:id`,
        },

        userManage: {
            uri: `${apiPrefix}/base/user`,
            list: `${apiPrefix}/base/user/list`,
            id: `${apiPrefix}/base/user/:id`,
            password: `${apiPrefix}/base/user/password/:id`,
        },

        purchasestock: {
            uri: `${apiPrefix}/inventory/purchase`,
            list: `${apiPrefix}/inventory/purchase/list`,
            id: `${apiPrefix}/inventory/purchase/:id`,
        },

        purchasebatch: {
            uri: `${apiPrefix}/inventory/batch`,
            list: `${apiPrefix}/inventory/batch/list`,
            id: `${apiPrefix}/inventory/batch/:id`,
        },

        collateralstock: {
            uri: `${apiPrefix}/inventory/collateral`,
            list: `${apiPrefix}/inventory/collateral/list`,
            id: `${apiPrefix}/inventory/collateral/:id`,
        },

        collateralmgr: {
            uri: `${apiPrefix}/collateral/manage`,
            list: `${apiPrefix}/collateral/manage/list`,
            id: `${apiPrefix}/collateral/manage/:id`,
        },

        collateralout: {
            uri: `${apiPrefix}/collateral/outbound`,
            list: `${apiPrefix}/collateral/outbound/list`,
            id: `${apiPrefix}/collateral/outbound/:id`,
        },

        collateralgoods: {
            uri: `${apiPrefix}/collateral/outbound/goods`,
            list: `${apiPrefix}/collateral/outbound/goods/list/:id`,
            id: `${apiPrefix}/collateral/outbound/goods/:id`,
        },

        collateralbatch: {
            uri: `${apiPrefix}/collateral/outbound/batch`,
            list: `${apiPrefix}/collateral/outbound/batch/list/:id`,
            id: `${apiPrefix}/collateral/outbound/batch/:id`,
        },

        interestquery: {
            uri: `${apiPrefix}/capital/interest`,
            list: `${apiPrefix}/capital/interest/list`,
            id: `${apiPrefix}/capital/interest/:id`,
        },
        exchangemgr: {
            uri: `${apiPrefix}/exchange/browse`,
            list: `${apiPrefix}/exchange/browse/list`,
            id: `${apiPrefix}/exchange/browse/:id`,
        },

        callin: {
            uri: `${apiPrefix}/exchange/browse/call/in`,
            list: `${apiPrefix}/exchange/browse/call/in/list/:id`,
            id: `${apiPrefix}/exchange/browse/call/in/:id`,
        },

        callout: {
            uri: `${apiPrefix}/exchange/browse/call/out`,
            list: `${apiPrefix}/exchange/browse/call/out/list/:id`,
            id: `${apiPrefix}/exchange/browse/call/out/:id`,
        },

        risksum: {
            uri: `${apiPrefix}/capital/riskexposure`,
            list: `${apiPrefix}/capital/riskexposure/list`,
            id: `${apiPrefix}/capital/riskexposure/:id`,
        },

        financeLoan: {
            uri: `${apiPrefix}/capital/financingloan`,
            list: `${apiPrefix}/capital/financingloan/list`,
            id: `${apiPrefix}/capital/financingloan/:id`,

        },

        riskdetail: {
            uri: `${apiPrefix}/capital/riskexposure/detail`,
            list: `${apiPrefix}/capital/riskexposure/detail/list`,
            id: `${apiPrefix}/capital/riskexposure/detail/:id`,
        },

        bond: {
            uri: `${apiPrefix}/capital/guarantee`,
            list: `${apiPrefix}/capital/guarantee/list`,
            id: `${apiPrefix}/capital/guarantee/:id`,
        },

        file: {
            upload: `//${fileBaseURL}/file/upload`,
            download: `${fileBaseURL}/file/download`,
            batchDownload: `${fileBaseURL}/file/batchDownload`
        },

        code: {
            fetchCode: `/captchaImg`
        },

        PDFDownload: {
            cash: `${fileBaseURL}/redemption/apply/cash/download/`,
            credit: `${fileBaseURL}/redemption/apply/credit/download/`,
        },

        select: { // 下拉框公共接口
            brand: '/bi/basis/brand_list',
            platform: '/bi/basis/platforn_list',
            warehouse: '/bi/basis/warehouse_list',
            channelGroup: '/bi/basis/channel_group',
            channel: '/bi/basis/channel_list',
            dimension: '/bi/basis/dimension' // 款号下拉框

            // brand: `${apiPrefix}/open/brand`,
            // platform: `${apiPrefix}/open/platform`,
            // warehouse: `${apiPrefix}/open/warehouse`,
            // pattern: `${apiPrefix}/open/pattern`,
            // sku_code: `${apiPrefix}/open/sku_code`,
            // goods_name: `${apiPrefix}/open/goods_name`,
            // seller_code: `${apiPrefix}/open/seller_code`
        }

        // select: { // 本地开发使用接口
        //     brand: `${apiPrefix}/open/brand`,
        //     platform: `${apiPrefix}/open/platform`,
        //     warehouse: `${apiPrefix}/open/warehouse`,
        //     pattern: `${apiPrefix}/open/pattern`,
        //     sku_code: `${apiPrefix}/open/sku_code`,
        //     goods_name: `${apiPrefix}/open/goods_name`,
        //     seller_code: `${apiPrefix}/open/seller_code`
        // }
    },
}
