<template>
  <div class="home_page">
    <a-button type="primary" @click="nbClick">牛逼</a-button>
    <img src="https://bo.zinete.com/timg.jpeg" alt="不过夜" class="img_gif">
  </div>
</template>

<script>
  export default {
    methods: {
      nbClick() {
        alert('牛逼格拉斯')
      }
    },
  }
</script>

<style lang="css" scoped>
.home_page {
  flex-direction: row;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  align-items: center;
}
.img_gif {
  height: 250px;
  width: 250px;
}
</style>