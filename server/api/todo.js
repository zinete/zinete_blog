/**
 * @ Author: ZhengHui
 * @ Create Time: 2020-01-07 17:21:49
 * @ Modified by: ZhengHui
 * @ Modified time: 2020-01-13 11:00:17
 * @ Description: todo list 增删改查
 */



const Router = require("koa-router");
const db = require("../config/mysql");

const router = new Router({
  prefix: "/todolist"
})



// 查询所有已经创建的 todolist
router.get('/all', async (ctx) => {
  try {
    let sql = `SELECT t_id,text, time,status FROM zinete_todo`;
    let data = await db.query(sql)
    ctx.body = {
      data,
      code: 200
    }
  } catch (error) {
    ctx.body = {
      error
    }
  }
})



// 添加一个 todo list
router.post('/add', async (ctx) => {
  const { t_id, text, time, status } = ctx.request.body
  try {
    let sql = `INSERT INTO zineteblog.zinete_todo (t_id, text, time, status) VALUES(?,?,?,?)`,
      value = [t_id, text, time, status];
    await db.query(sql, value)
    ctx.body = {
      data: {
        time,
        text,
        status,
        t_id
      },
      code: 200,
      msg: "创建成功"
    }
  } catch (error) {
    ctx.body = {
      data: error,
      msg: '数据插入失败,输入内容已存在',
      code: -1
    }
  }
})

// 更新 todo list 状态
router.post('/update', async (ctx) => {
  const { status, t_id } = ctx.request.body
  console.log(status, t_id, 'status, id');

  try {
    let sql = `UPDATE zineteblog.zinete_todo set status = ? WHERE t_id = ?;`,
      value = [status, t_id]
    let data = await db.query(sql, value)
    ctx.body = {
      msg: '状态更新成功',
      code: 200,
      data
    }
  } catch (error) {
    ctx.body = {
      error
    }
  }
})

module.exports = router