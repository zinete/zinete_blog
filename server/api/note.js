/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-11-27 13:39:12
 * @ Modified by: ZhengHui
 * @ Modified time: 2019-11-27 17:32:28
 * @ Description: 笔记本api
 */ 

const Router = require("koa-router") ;
const db = require("../config/mysql");
const Utils = require('../config/index');
const Tips = require('../config/tip');
const md5 = require('crypto-js/md5');

const router = new Router({
  prefix: "/note"
})


// 添加笔记本
router.post('/addNote', async (ctx, next) => {
  let data = Utils.filter(ctx.request.body, ['name']);
  let { name } = data, uid = 1;
  console.log(ctx.session, '用户 id')
  let res = Utils.formatData(data, [
    { key: 'name', type: 'string' }
  ]);
  if (!res) return ctx.body = Tips[1007];
  let create_time = Utils.formatCurrentTime();
  let sql = `INSERT INTO zinete_note(name,uid,create_time) VALUES(?,?,?)`,
    value = [name, uid, create_time];
  await db.query(sql, value).then(res => {
    let { insertId: id } = res;
    if (id) {
      ctx.body = {
        data: {
          id
        }
      }
    } else {
      ctx.body = Tips[1002]
    }
  }).catch(e => {
    if (+e.errno === 1062) {//笔记本不能重复
      ctx.body = {
        code: 1010,
        msg: '笔记本已存在！'
      };
    } else {
      ctx.body = Tips[1002]
    }
  })
});

module.exports = router