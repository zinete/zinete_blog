/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-11-06 11:34:30
 * @ Modified by: ZhengHui
 * @ Modified time: 2019-11-14 13:16:24
 * @ Description: 用户相关
 */

import Router from 'koa-router';
import db from '../config/mysql';
import Utils from '../config/index';
import Tips from '../config/tip';
import md5 from 'crypto-js/md5';
const router = new Router({
  prefix: "/user"
})

/**
 * 注册
 */
router.post('/register', async (ctx) => {
  let data = Utils.filter(ctx.request.body, ['name', 'password']);
  let res = Utils.formatData(data, [
    { key: 'name', type: 'string' },
    { key: 'password', type: 'string' }
  ]);
  if (!res) return ctx.body = Tips[1007];
  let { name, password } = data;
  let sql = `INSERT INTO zinete_user(name, password, create_time, update_time, is_delete) VALUES(?,?,?,?,?)` ,
  value = [name, md5(password).toString(), Utils.formatCurrentTime(), Utils.formatCurrentTime(), 0]
  await db.query(sql, value).then(res => {
    console.log(res, '注册ok')
    if (res && res.insertId != null) {
      ctx.body = {
        msg: '注册成功',
        code: 200
      }
    } else {
      ctx.body = Tips[1002];
    }
  }).catch(e => {
    ctx.body = {
      msg: e,
      code: Tips[1011],
    }
  })
})


/**
 * 登录
 */
router.post('/login', async (ctx) => {
  let data = Utils.filter(ctx.request.body, ['name', 'password']);
  let res = Utils.formatData(data, [
    { key: 'name', type: 'string' },
    { key: 'password', type: 'string' }
  ]); 
  /**
   * 首先拿到前端传递过来的值 使用 ctx.request.body 获取
   * 然后校验格式，将密码进行 md5 加密
   * 使用sql查询数据库中是否存在这个用户，返回对应的状态码
   */
  if (!res) return ctx.body = Tips[1007];
  let { name, password } = data;
  let sql = `SELECT uid FROM zinete_user WHERE name="${name}" and password="${md5(password).toString()}" and is_delete=0;`
  await db.query(sql).then(res => {
    if (res && res.length > 0) {
      let val = res[0];
      let uid = val['uid'];
      let token = Utils.generateToken({ uid });
      ctx.body = {
        token: token,
        data: Tips[0]
      }
    } else {
      ctx.body = Tips[1006];
    }
  }).catch(e => {
    ctx.body = Tips[1002];
    console.log(e)
  });
});

export default router