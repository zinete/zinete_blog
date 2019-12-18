/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-11-25 23:51:05
 * @ Modified by: ZhengHui
 * @ Modified time: 2019-12-18 16:53:54
 * @ Description: 文章相关接口
 */


const Router = require("koa-router");
const db = require("../config/mysql");
const Utils = require('../config/index');
const Tips = require('../config/tip');
const md5 = require('crypto-js/md5');
const fs = require('fs')

const router = new Router({
  prefix: "/blog"
})

router.get('/banner', async (ctx) => {
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
      banner: list,
      code: 200,
      msg: '获取banner图成功'
    }
  }).catch(e => {
    ctx.body = Tips[1002];
  })
})


router.post('/addBlog', async (ctx, next) => {
  let data = Utils.filter(ctx.request.body, ['title', 'content', 'tag_id', 'note_id', 'brief', 'publish', 'create_time']),
    uid = ctx.session.uid;
  let res = Utils.formatData(data, [
    { key: 'note_id', type: 'number' },
    { key: 'title', type: 'string' },
    { key: 'brief', type: 'string' },
    { key: 'content', type: 'string' },
    { key: 'publish', type: 'number' }
  ]);
  if (!res) return ctx.body = Tips[1007];
  let { title = '无标题', content = '', note_id = '', brief = '', publish = 0, create_time = '' } = data;
  create_time = Utils.formatCurrentTime(create_time);
  let sql = `INSERT INTO zinete_blog(title,content,note_id,create_time,uid,brief,publish) VALUES (?,?,?,?,?,?,?)`,
    value = [title, content, note_id, create_time, uid, brief, publish];
  await db.query(sql, value).then(async res => {
    let { insertId: id } = res;
    ctx.body = {
      code: 200,
      data: { id },
      msg: '创建成功'
    }

  }).catch(e => {
    ctx.body = Tips[1002];
  });

});


// 查询我的笔记本
router.get('/myNote', async (ctx, next) => {
  let data = Utils.filter(ctx.request.query, ['pageSize', 'pageNum', 'type']), uid = 1;
  let res = Utils.formatData(data, [
    { key: 'type', type: 'number' },
  ]);
  if (!res) return ctx.body = Tips[1007];
  let { pageSize = 15, pageNum = 1, type = 0 } = data;
  pageSize = Number(pageSize);
  pageNum = Number(pageNum);
  let offset = (pageNum - 1) * pageSize;
  let sql1 = `SELECT count(1) FROM  zinete_note WHERE uid=${uid} AND is_delete=0;`,
    sql = `SELECT name,id,create_time,update_time  FROM  zinete_note WHERE uid=${uid} AND is_delete=0 ORDER BY create_time DESC`;
  if (+type === 1) {
    sql += ` limit ${offset},${pageSize};`
  }

  await db.query(sql1 + sql).then(async result => {
    let res1 = result[0], res2 = result[1], total = 0, list = []
    if (res1 && res1.length > 0 && res2 && res2.length > 0) {
      total = res1[0]['count(1)']
      list = res2
    }
    ctx.body = {
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


//查看博客详情
router.get('/:id', async (ctx, next) => {
  let data = ctx.params;
  let res = Utils.formatData(data, [
    { key: 'id', type: 'number' }
  ]);
  if (!res) return ctx.body = Tips[1007];
  let { id } = data;
  id = parseInt(id);
  console.log(id, '文章 id')
  let sql = `SELECT content,id,title,note_id,brief,create_time,publish  FROM zinete_blog WHERE id=${id} AND is_delete=0;`;
  await db.query(sql).then(res => {
    let detail = res[0] || [];
    console.log(detail, '文章详情')
    if (detail) {
      ctx.body = {
        code: 200,
        detail
      }

    } else {
      ctx.body = Tips[1003]
    }
  }).catch(e => {
    ctx.body = Tips[1002];
  })
});

module.exports = router