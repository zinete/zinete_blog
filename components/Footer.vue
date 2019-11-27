<template>
  <div class="footer_page">
    <div class="footer-wrapper">
      <a href="/">
        <p>显示一个 logo</p>
        <span>zinete</span>
      </a>
      <div class="menu-wrapper">
        <ul class="nav-list">
          <li>首页</li>
          <li>标签</li>
          <li>关于</li>
          <li>有意思的</li>
        </ul>
      </div>
      <div class="social-links">
        <a href>zinete</a>
      </div>
    </div>
    <div class="footer-copyright">
      <span>鄂ICP备18028818号-1</span>
      zinete.com
    </div>
    <a-back-top />
  </div>
</template>

<script>
export default {
  methods: {
   
  }
};
</script>

<style lang="css" scoped>
.footer_page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 1;
  position: relative;
}
.footer-wrapper {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 170px);
  max-width: 1024px;
  margin-top: 8vh;
  padding: 0 15px 15px;
}
.footer-copyright {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.3;
  max-width: 600px;
  margin: 0 auto;
  padding: 25px 30px;
  text-align: center;
  letter-spacing: 0.7px;
  color: #000;
}
.nav-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 1rem;
}
.nav-list li {
  position: relative;
  font-weight: 700;
  margin: 5px 12px;
}

.social-links {
  display: flex;
  justify-content: flex-end;
  font-size: 1rem;
  width: 100px;
}

</style>