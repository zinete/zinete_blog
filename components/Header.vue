<template>
  <div class="header_page">
    <div class="logo">
      <a href="/">Zinete</a>
    </div>
    <div class="nav_bar">
      <ul>
        <li><a href="/">首页</a></li>
        <li><a href="/article/label">标签</a></li>
        <li><a href="/about/index">关于</a></li>
        <li><a href="">留言板</a></li>
        <li><a href="">有意思的</a></li>
        <li><a href="/article/initarticle">写文章</a></li>
        
        
        <!-- <li><a href="/user/login">登录/注册</a></li> -->
      </ul>
     
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  middleware: 'auth',
  data() {
    return {
      login: ''
    };
  },
  mounted (){
    let slef = this;
    let token = Cookie.get('login');
    slef.login = token
  }
  
}
</script>

<style lang="css" scoped>

.logo {
  font-size: 30px;
  transition: all 0.1s linear;
}
.header_page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1000;
  box-sizing: border-box;
  /* position: sticky; */
  top: 0;
  background: #ffffff
}

.nav_bar ul {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 1rem;
}
.nav_bar ul li {
  position: relative;
  font-weight: 700;
  margin: 5px 12px;
}
.nav_bar ul li a {
  color: #666
}
.nav_bar ul li a:hover {
  color: #ffad00;
}
</style>