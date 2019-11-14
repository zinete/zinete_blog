<template>
  <div class="home_page">
    <div class="input_box">
      <a-input placeholder="请输入用户名" class="input_user" v-model="username"></a-input>
      <a-input placeholder="请输入密码" class="input_pass" v-model="password"></a-input>
      <a-button type="primary" @click="loginClick">立即登录</a-button>
      <br />
      <a-button type="dashed" @click="registerClick">立即注册</a-button>
      <a href="article">文章详情</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "crypto-js/md5";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    //登录按钮事件
    async loginClick() {
      let slef = this;
      var pattern = /0?(13|14|15|18|17)[0-9]{9}/;
      if (pattern.test(slef.username)) {
        alert("只能输入手机号");
      } else {
        let res = await axios.post("/user/login/", {
          name: slef.username,
          password: md5(slef.password).toString()
        });
        console.log(res.data);
        if (res.data.code === 0) {
          this.$message.warning(res.data.msg);
        }
      }
    },
    //注册按钮事件
    async registerClick() {
      let slef = this;
      let res = await axios.post("/user/register", {
        name: slef.username,
        password: md5(slef.password).toString()
      });
      console.log(res);
      if (res.data.code === 200) {
        this.$message.info(res.data.msg);
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
</style>