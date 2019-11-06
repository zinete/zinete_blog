/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-11-06 13:26:35
 * @ Modified by: ZhengHui
 * @ Modified time: 2019-11-06 13:43:37
 * @ Description: 定义用户信息数据结构
 */

import mongoose from 'mongoose'
const Schema = mongoose.Schema
const UserSchema = new Schema({
  user_name: {
    type: String,
    require: true
  },
  user_tip: {
    type: String,
    require: true
  },
  user_sex: {
    type: String,
    require: true
  },
  user_photo: {
    type: String,
  },
  create_time: {
    type: String,
    default: new Date().toLocaleString()
  },
})

export default mongoose.model('UserSchema', UserSchema)