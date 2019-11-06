/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-11-06 11:33:56
 * @ Modified by: ZhengHui
 * @ Modified time: 2019-11-06 13:34:04
 * @ Description: 相关配置文件
 */

export default {
  // 配置数据库连接地址
  dbs: "mongodb://127.0.0.1:27017/zineteblog",
  // 配置redis连接地址
  redis: {
    get host() {
      return "127.0.0.0.1"
    },
    get port() {
      return 6379
    }
  },
  // 配置邮箱服务器
  smtp: {
    get host() {
      return "smtp.qq.com"
    },
    get user() {
      return "zhenghui@zinete.com"
    },
    get pass() {
      return "gdaozotvsofhbehd"
    },
    // 生成验证码
    get code() {
      return Math.random().toString(16).slice(2, 6).toUpperCase()
    },
    // 验证码过期时间
    get expire() {
      return new Date().getTime() + 60 * 60 * 1000
    }
  },
}