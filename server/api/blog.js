/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-11-25 23:51:05
 * @ Modified by: ZhengHui
 * @ Modified time: 2019-11-27 13:40:03
 * @ Description: 文章相关接口
 */


import Router from 'koa-router';
import db from '../config/mysql';
import Utils from '../config/index';
import Tips from '../config/tip';
import md5 from 'crypto-js/md5';

const router = new Router({
  prefix: "/blog"
})

router.get('/banner', async (ctx) => {
  ctx.body = {
    banner: [
      {
        img: 'https://www.shirmy.me/_nuxt/img/b54c756.jpeg',
        title: '第一个标题这是从接口读取的数据'
      },
      {
        img: 'https://resource.shirmy.me/blog/covers/2019-04-27/qili.jpeg',
        title: '第二个标题aaaaa'
      },
      {
        img: 'https://resource.shirmy.me/blog/screenshot/2019-07-23/cover.jpg',
        title: '第三个标题'
      }
    ],
    code: 200,
    msg: '获取banner图成功'
  }
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

export default router