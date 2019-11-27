/**
 * @ Author: ZhengHui
 * @ Create Time: 2019-11-06 11:33:56
 * @ Modified by: ZhengHui
 * @ Modified time: 2019-11-06 23:46:29
 * @ Description: 相关配置文件
 */

import mysql from 'mysql';
let config = {
  host: 'localhost',
  user: 'root',
  password: 'Ab123456',
  database: 'zineteblog',
  port: 3306,
  multipleStatements: true//允许多条sql同时执行
};
let pool = mysql.createPool(config);
let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
};
export default {
  query
}
