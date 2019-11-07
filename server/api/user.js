/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-11-06 11:34:30
 * @ Modified by: ZhengHui
 * @ Modified time: 2019-11-06 23:59:34
 * @ Description: 用户相关
 */

import Router from 'koa-router';
import db from '../config/mysql';
const router = new Router({
  prefix: "/user"
})

//读取数据库数据返回到 api
router.get('/login', async function (ctx) { 
  let sql = `select * from pre_plugin_mini_joke_1 ppmj limit 0, 100` //查询数据库前面一百条数据
  let data = await db.query(sql);
  ctx.body = {
    code: 200,
    data: data
  }
})

export default router