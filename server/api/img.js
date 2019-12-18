/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-12-13 14:25:09
 * @ Modified by: ZhengHui
 * @ Modified time: 2019-12-18 17:11:25
 * @ Description: 图片相关接口
 */

const Router = require("koa-router");
const db = require("../config/mysql");
const Utils = require('../config/index');
const Tips = require('../config/tip');
const fs = require('fs');
const asyncBusboy = require('async-busboy');
const { baseUrl } = require("../../config/api/env");
const path = require("path")
const router = new Router({
  prefix: "/uploadFile"
})


// 图片上传
router.post('/img', async (ctx) => {
  try {
    let data = await asyncBusboy(ctx.req);
    let uid = 1
    let { files = [] } = data;
    if (files.length === 0) return ctx.body = Tips[1002];
    let file = files[0];
    let { mimeType = '', filename, path: filepath } = file;
    if (mimeType.indexOf('image') === -1) return ctx.body = Tips[1002];
    let name = Date.now() + '.' + filename.split('.').pop();
    console.log(name, '文件路径')
    let savePath = path.join(__dirname, `../../static/newimgs/${name}`);


    try {
      let create_time = Utils.formatCurrentTime();
      let sql = 'INSERT INTO zinete_img(name,uid,create_time) VALUES (?,?,?)', value = [baseUrl + name, uid, create_time];
      await db.query(sql, value).then(res => {
        let img = fs.readFileSync(filepath);
        fs.writeFileSync(savePath, img);
        fs.unlinkSync(filepath);//清除缓存文件
        ctx.body = {
          ...Tips[0], data: { name }
        };
      }).catch((err) => {
        ctx.body = [
          err, Tips[1002]
        ];
      })

    } catch (e) {
      ctx.body = [
        Tips[1005],
        e
      ];
    }
  } catch (e) {
    ctx.body = [
      e,
      Tips[1002]
    ];
  }
})

// 分页查询图片
router.get('/find/myImg', async (ctx, next) => {
  let data = Utils.filter(ctx.request.query, ['pageSize', 'pageNum'])
  let uid = 1
  let { pageNum = 1, pageSize = 10 } = data;
  pageNum = Number(pageNum);
  pageSize = Number(pageSize);
  let offset = (pageNum - 1) * pageSize;
  let sql = `SELECT name,create_time,id FROM zinete_img  WHERE uid=${uid} AND is_delete=0 ORDER BY create_time DESC limit ${offset},${pageSize};`,
    sql1 = `SELECT count(1) FROM  zinete_img WHERE uid=${uid} AND is_delete=0;`;
  await db.query(sql1 + sql).then(async result => {
    let res1 = result[0], res2 = result[1], total = 0, list = [];
    if (res1 && res1.length > 0 && res2 && res2.length > 0) {
      total = res1[0]['count(1)'];
      list = res2;
    }
    ctx.body = {
      ...Tips[0],
      data: {
        list,
        pageSize,
        total
      }
    };
  }).catch(e => {
    ctx.body = Tips[1002];
  })
});

module.exports = router;