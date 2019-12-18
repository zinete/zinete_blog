<template>
  <div>
    <main class="view">
      <header
        class="article-header"
        style="background-image: url(https://resource.shirmy.me/blog/covers/2019-11-8/webpack-plugin-cover.png);"
      >
        <div class="header-wrapper">
          <div class="content">
            <section class="section-tag">
              <ul class="tag-list">
                <li class="tag-item">Webpack</li>
              </ul>
            </section>
            <h1 class="title">测试测试测试</h1>
            <div class="author-wrapper">
              by&nbsp;
              <span class="author-name">zhenghui</span>
              &nbsp;
              <time datetime="2019-11-08 11:02:46">&nbsp;2019-11-08 11:02:46</time>
            </div>
          </div>
        </div>
      </header>
      <div class="article-container">
        <div class="content">
          <vue-markdown>{{handbook}}</vue-markdown>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import { Axios } from "../../config/api/http";
export default {
  data() {
    return {
      handbook: ""
    };
  },
  async asyncData(ctx) {
    let slef = this;
    let data = await Axios.get("/blog/6");
    console.log(data, "222content");
    if (data.code === 200) {
      return {
        handbook: data.detail.content
      };
    }
  },
  components: {
    VueMarkdown
  }
};
</script>

<style lang="css" scoped>
.view {
  flex: 1;
}

.article-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 170px);
  height: calc(100vh - 245px);
  margin: 0 auto;
  color: #fff;
  border-radius: 5px;
  background: no-repeat 50%;
  background-size: cover;
  box-sizing: border-box;
  overflow: hidden;
}
.title {
  margin: 0.7em 0;
  line-height: 1;
  font-size: 46px;
  font-weight: 700;
  color: #fff;
}
.article-header::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  content: "";
  opacity: 0.35;
  background-color: #394245;
  background-image: linear-gradient(234deg, #394245, #000);
}
.header-wrapper {
  width: 100%;
  max-width: 1200px;
  z-index: 1;
  box-sizing: border-box;
  position: relative;
  margin: 0 auto;
}

.header-wrapper .content {
  padding: 60px 200px;
  margin-top: -10vh;
}

.section-tag {
  font-weight: 700;
}

.tag-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 -45px;
}
.tag-list .tag-item {
  display: inline-block;
  padding: 5px 12px;
  margin: 5px;
  color: #000;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  border-radius: 20px;
  background: #ffffff;
  cursor: pointer;
}

.author-wrapper {
  font-size: 13px;
}
.author-name {
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}

.article-container {
  width: 100%;
  max-width: 1200px;
  z-index: 1;
  box-sizing: border-box;
  position: relative;
  margin: -10vh auto 0;
  border-radius: 5px 5px 0 0;
}
.article-container .content {
  padding: 60px 200px 5px;
  border-radius: 5px 5px 0 0;
  background-color: #ffffff;
  transition: all 0.1s linear;
}
</style>