<template>
  <div class="about_page">
    <p class="about_me">关于我</p>
    <p
      class="about_des"
    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa dignissimos iure, id deserunt laborum itaque debitis, expedita delectus vel aspernatur vero aliquid ad officia unde recusandae alias! Aperiam, libero.</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
.about_page {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  z-index: 1;
  box-sizing: border-box;
}
.about_me {
  text-align: center;
  font-size: 30px;
  font-weight: 400;
}
.about_des {
  line-height: 30px;
  letter-spacing: 2px;
  text-indent: 2;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-decoration: line-through orange;
}
</style>