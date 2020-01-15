<template>
  <div class="aricle_listpage">
    <div v-for="item in news" :key="item.id" class="aricle_listpage_box">
      <div class="aricle_listpage_box_list">
        <h2>{{item.title}}</h2>
        <footer class="footer">
          <div class="author_wrapper">
            <img v-bind:src="item.picUrl" alt="item.title" class="user_img" />
            <span class="author_name">{{item.description}}</span>
          </div>
          <div class="info_wrapper">
            <a-icon type="eye" />
            <span class="info_wrapper">99+</span>
            <a-icon type="heart" />
            <span class="info_wrapper">99+</span>
            <span>{{item.ctime}}</span>
          </div>
        </footer>
      </div>
      <div>
        <a href="/article">
          <img v-bind:src="item.picUrl" alt="item.title" class="aricle_img" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      news: []
    };
  },
  async created() {
    try {
      let slef = this;
      let { data } = await axios.get("/news/index");
      slef.news = data.data.newslist;
      console.log(data.data.newslist, "datadatadatadata");
    } catch (error) {
      console.log(error);
    }
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
  align-items: center;
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
  font-size: 14px;
}
</style>