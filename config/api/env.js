/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl
let routerMode
const imgBaseUrl = ''

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000/'
  routerMode = 'hash'
} else {
  baseUrl = 'http://dev.zinete.com/'
  routerMode = 'hash'
}

module.exports = {
  baseUrl,
  routerMode,
  imgBaseUrl
}
