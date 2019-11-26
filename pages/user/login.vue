<template>
  <div class="home_page">
    <div class="input_box">
      <div>
        <p class="tip">醉后不知天在水, 满船清梦压新河。</p>
      </div>
      <a-input placeholder="请输入用户名" class="input_user" v-model="username"></a-input>
      <a-input-password placeholder="请输入密码" class="input_pass" v-model="password"></a-input-password>
      <a-button type="primary" @click="loginClick" class="userBtn">立即登录</a-button>
      <br />
      <a-button type="dashed" @click="registerClick" class="userBtn">立即注册</a-button>
      <a href="/article">文章详情</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "crypto-js/md5";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      username: "",
      password: "",
      redirectURL: "/"
    };
  },
  methods: {
    //登录按钮事件
    async loginClick() {
      let slef = this;
      if (!slef.username && !slef.password) {
        this.$message.info("用户名密码不能为空");
        return false;
      } else {
        let data = await this.$API.post("/user/login/", {
          name: slef.username,
          password: md5(slef.password).toString()
        });
        if (data.token) {
          console.log(data, "data");
          Cookie.set("login", data.token);
          slef.$router.push(slef.redirectURL);
          this.$message.info(data.msg);
        }
      }
    },
    //注册按钮事件
    async registerClick() {
      let slef = this;
      if (!slef.username && !slef.password) {
        this.$message.info("用户名密码不能为空");
        return false;
      } else {
        //效验所有参数都没有问题才发起请求，注册入库
        let data = await this.$API.post("/user/register", {
          name: slef.username,
          password: md5(slef.password).toString()
        });
        this.$message.info(data.msg);
      }
    }
  }
};
</script>

<style lang="css" scoped>
.home_page {
  flex-direction: row;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  align-items: center;
}
.input_box {
  margin: 20px;
  width: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.input_user {
  margin-bottom: 20px;
  flex: 1;
}
.input_pass {
  margin-bottom: 20px;
}
.tip {
  line-height: 40px;
  font-weight: bold;
  text-align: center;
}
</style>