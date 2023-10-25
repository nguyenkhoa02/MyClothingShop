const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
      port: 3001,
      proxy: {
        '/api': {
          target: 'http://localhost:3000/', // Replace with your API endpoint
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
)
