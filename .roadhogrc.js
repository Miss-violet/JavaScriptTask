const path = require('path')

const svgSpriteDirs = [
    path.resolve(__dirname, 'src/svg/'),
    require.resolve('antd').replace(/index\.js$/, ''),
]
console.info("get Process.env.REACT_DIST: ", process.env.REACT_BASEURL)
export default {
    entry: 'src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    // "disableCSSModules": false,
    svgSpriteLoaderDirs: svgSpriteDirs,
    "theme": "./theme.config.js",

    "env": {
        "development": {
            "extraBabelPlugins": [
                "dva-hmr",
                "transform-runtime",
                ["import", { "libraryName": "antd", "style": true }]
            ],
            "define": {
                // "BASEURL": "http://localhost:8000",
                "BASEURL": "http://erp-qa.linesum.com",
                "ENV": "dev"
            }
        },
        "production": {
            "extraBabelPlugins": [
                "transform-runtime",
                ["import", { "libraryName": "antd", "style": true }]
            ],
            "define": {
                // "BASEURL": "http://devops.qa.idea.linesum.com:18080",
                "BASEURL": process.env.REACT_BASEURL || "http://erp-qa.linesum.com",
                "ENV": "prd"
            },
        }
    },
}
