/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-12-13 11:57:08
 * @ Modified by: ZhengHui
 * @ Modified time: 2019-12-13 12:00:40
 * @ Description:
 */

let password
let user


// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  console.log('================当前环境====================')
  console.log(process.env.NODE_ENV)
  console.log('====================================')
  password = "Ab123456"
  user = 'root'
} else {
  password = 'Ab123456'
  user = 'zineteblog'
}

module.exports = {
  password,
  user,
}
