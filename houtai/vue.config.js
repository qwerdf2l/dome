const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
// 配置代理
// module.exports = {
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://192.168.2.30:8013/',
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     }
//   }
// }