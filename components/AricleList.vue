<template>
  <div class="aricle_listpage">
    <div v-for="item in banner" :key="item.id" class="aricle_listpage_box">
      <div class="aricle_listpage_box_list">
        <h2>{{item.title}}</h2>
        <p>{{item.title}}</p>
        <footer class="footer">
          <div class="author_wrapper">
            <img v-bind:src="item.img" alt="item.title" class="user_img" />
            <span class="author_name">用户名</span>
          </div>
          <div class="info_wrapper">
            <a-icon type="eye" />
            <span class="info_wrapper">99+</span>
            <a-icon type="heart"  />
            <span class="info_wrapper">99+</span>
            <span>2019-11-08</span>
          </div>
        </footer>
      </div>
      <div>
        <a href="/article">
          <img v-bind:src="item.img" alt="item.title" class="aricle_img" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: [
        {
          img: "https://www.shirmy.me/_nuxt/img/b54c756.jpeg",
          title: "测试数据4测试数据4测试数据4测试数据4测试数据4测试数据4测试数据4测试数据4测试数据4测试数据4测试数据4测试数据4"
        },
        {
          img: "https://resource.shirmy.me/blog/covers/2019-04-27/qili.jpeg",
          title: "测试数据2"
        },
        {
          img:
            "https://resource.shirmy.me/blog/screenshot/2019-07-23/cover.jpg",
          title: "测试数据1"
        },
        {
          img: "https://www.shirmy.me/_nuxt/img/b54c756.jpeg",
          title: "测试数据4测试数据4测试数据4测试数据4测试数据4测试数据4测试数据4测试数据4测试数据4测试数据4测试数据4测试数据4"
        },
        {
          img: "https://resource.shirmy.me/blog/covers/2019-04-27/qili.jpeg",
          title: "测试数据2"
        },
      ]
    };
  }
};
</script>

<style lang="css" scoped>
.aricle_listpage {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  z-index: 1;
  box-sizing: border-box;
}
.aricle_listpage_box {
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  align-items: center;
}
.aricle_listpage_box_list {
  flex: 1;
  margin-right: 20px;
}
.aricle_img {
  width: 340px;
  min-width: 340px;
  border-radius: 4px;
  background-size: cover;
  cursor: pointer;
}
.footer {
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center
}
.user_img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-size: cover;
  cursor: pointer;
}
.info_wrapper {
  align-items: center;
  justify-content: center;
}

.info_wrapper {
  margin-right: 10px;
}
.author_name {
  font-weight: 400;
  margin-left: 5px;
  font-size: 14px
}
</style>