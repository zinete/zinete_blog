/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-11-06 11:34:30
 * @ Modified by: ZhengHui
 * @ Modified time: 2019-11-06 13:39:27
 * @ Description: 用户相关
 */

import Router from 'koa-router';
import UserSchema from '../database/user';

const router = new Router({
  prefix: "/user"
})

router.get('/login', async function (ctx) { 
  let data = await UserSchema.create({
    user_name: 'ZhengHui',
    user_tip: '刮风这天我试过握着你手',
    user_sex: '男'
  })
  ctx.body = {
    code: 200,
    data: data,
    msg: "入库成功"
  }
 })

export default router