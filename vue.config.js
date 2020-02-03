const path = require('path')

module.exports = {
    mode: process.env.NODE_ENV,
    chainWebpack: config => {
        const apiClient = process.env.VUE_APP_API_CLIENT
        config.resolve.alias.set(
            'api-client',
            path.resolve(__dirname, apiClient)
        )
    }
}