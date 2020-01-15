/**
 * @ Author: ZhengHui
 * @ Create Time: 2020-01-15 15:56:41
 * @ Modified by: ZhengHui
 * @ Modified time: 2020-01-15 17:56:46
 * @ Description:
 */


const Router = require("koa-router");
const db = require("../config/mysql");
const Utils = require('../config/index');
const Tips = require('../config/tip');
const md5 = require('crypto-js/md5');
const axios = require('axios')
const router = new Router({
  prefix: "/news"
})


const key = '3b4129fba4f10c49dc59082975173024'

router.get('/index', async (ctx) => {
  try {
    let { data } = await axios.get(`http://api.tianapi.com/it/index?key=${key}`)
    ctx.body = {
      data
    }
  } catch (error) {
    ctx.body = {
      error
    }
  }
})

router.get('/game', async (ctx) => {
  try {
    let { data } = await axios.get(`http://api.tianapi.com/apple/index?key=${key}`)
    ctx.body = {
      data
    }
  } catch (error) {
    ctx.body = {
      error
    }
  }
})
module.exports = router