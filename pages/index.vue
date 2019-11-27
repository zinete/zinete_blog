<template>
  <div class="home_page">
    <a-carousel effect="scrollx" autoplay arrows>
      <div v-for="item in banner" :key="item.id" class="banner_box">
        <div><h3 class="banner_title">{{item.title}}</h3></div>
        <div><img v-lazy="item.img" class="banner_img"></div>
      </div>
    </a-carousel>
     <aricle-list/>
  </div>
</template>

<script>
import { Axios } from '../config/api/http';
import AricleList from '../components/AricleList';
export default {
  data() {
    return {
      banner: []
    }
  },
  created() {
   
  },
  components: {
    AricleList,
  },
  async asyncData(ctx) {
    let slef = this
    let data = await Axios.get("/blog/banner")
    console.log(data, 'banner')
    if(data.code === 200 ){
      return {
        banner: data.banner
      }
    }
    
  }
};
</script>

<style lang="css" scoped>
.home_page {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  z-index: 1;
  box-sizing: border-box;
  min-height: 480px;
}

.ant_carousel >>> .slick_slide {
  flex-direction: row;
  height: 470px;
  overflow: hidden;
}

.ant_carousel >>> .custom_slick_arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant_carousel >>> .custom_slick_arrow:before {
  display: none;
}
.ant_carousel >>> .custom_slick_arrow:hover {
  opacity: 0.5;
}

.ant_carousel >>> .slick_slide h3 {
  color: #fff;
}
.banner_img {
  flex: 1;
  width: 100%;
  height: 470px;
  border-radius: 10px;
}
.banner_box {
  position: relative;
  overflow: hidden;
}
.banner_title {
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  background-color: rgba(0, 0, 0, .50);
  color: #FFFFFF;
  font-size: 26px;
  position: absolute;
  left: 0px;
  bottom: 0px;
}
</style>