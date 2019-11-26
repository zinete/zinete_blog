/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-11-25 23:51:05
 * @ Modified by: ZhengHui
 * @ Modified time: 2019-11-26 14:27:34
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


router.get('/banner', async(ctx) => {
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


export default router