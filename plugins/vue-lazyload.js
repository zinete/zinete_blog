import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3, //预加载的宽高比
  error: 'https://pic4.zhimg.com/v2-bd8a8429f78dc3372b9de24907f99cab_b.webp', //图片加载失败时使用的图片源
  loading: 'https://pic4.zhimg.com/v2-bd8a8429f78dc3372b9de24907f99cab_b.webp', //图片加载的路径
  attempt: 1 //尝试加载次数
})