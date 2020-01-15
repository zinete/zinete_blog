/**
 * @ Author: ZhengHui
 * @ Create Time: 2020-01-14 10:40:07
 * @ Modified by: ZhengHui
 * @ Modified time: 2020-01-14 11:43:10
 * @ Description: 网易云音乐热评
 */



const Router = require("koa-router");
const db = require("../config/mysql");
const Axios = require("axios");
const Utils = require('../config/index');
const router = new Router({
  prefix: '/hotreview'
})


const key = "3b4129fba4f10c49dc59082975173024"
router.get('/index', async (ctx) => {
  try {
    const { data } = await Axios.get(`http://api.tianapi.com/txapi/hotreview/index?key=${key}`)
    try {
      if (data.code === 200) {
        let dd = data.newslist[0]
        let content = dd.content
        let source = dd.source
        let create_time = Utils.formatCurrentTime();
        const sql = `INSERT INTO zineteblog.zinete_hotreview (content, source, create_time) VALUES(?,?,?)`,
          value = [content, source, create_time];
        await db.query(sql, value)
        ctx.body = {
          data
        }
      }
    } catch (error) {
      console.log(error, 'error')
      ctx.body = {
        error,
        msg: "数据插入失败",
        code: -1
      }
    }
  } catch (error) {
    ctx.body = {
      error,
      msg: "请求异常",
      code: -1
    }
  }
})


module.exports = router