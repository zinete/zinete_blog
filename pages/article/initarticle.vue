<template>
  <div>
    <main class="view">
      <div class="article-container">
        <div class="content">
          <no-ssr>
            <mavon-editor :toolbars="markdownOption" v-model="handbook" />
          </no-ssr>
          <div class="submit_nav">
            <a-button type="primary" @click="submitAticle">发布</a-button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      handbook: "#### 请发挥你想法"
    };
  },
  methods: {
   async submitAticle() {
      let slef = this
      let data = await this.$API.post('/blog/addBlog', {
        title: "默认标题",
        content: slef.handbook
      })
      if(data.code === 200) {
        this.$message.info(data.msg);
      }
      console.log(data)
      console.log(slef.handbook)
    }
  },
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
.content {
  padding: 60px 200px;
  margin-top: -10vh;
}

.submit_nav {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>