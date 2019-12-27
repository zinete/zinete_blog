<template>
  <div class="lable_page">
    <div class="lable_pre_content">
      <div v-for="item in lable" :key="item.id">
        <div class="lable_pre">
          <img v-bind:src="item.name" alt="item.title" class="lable_img" />
          <p class="lable_des">{{item.des}}</p>
        </div>
      </div>
    </div>
    <div class="upload_body">
      <a-input placeholder="请输入图片描述"></a-input>
      <a-upload
        name="file"
        :multiple="true"
        action="/uploadFile/img"
        :headers="headers"
        @change="handleChange"
      >
        <a-button class="upload_btn">
          <a-icon type="upload" />上传图片
        </a-button>
      </a-upload>
    </div>
  </div>
</template>

<script>
import { Axios } from "../../config/api/http";
export default {
  data() {
    return {
      lable: [],
      headers: {
        authorization: "authorization-text"
      }
    };
  },
  async created() {
    let data = await Axios.get("uploadFile/find/myImg");
    console.log("====================================");
    console.log(data.data.list);
    console.log("====================================");
    this.lable = data.data.list;
  },
  methods: {
    handleChange(info) {
      if (info.file.status !== "uploading") {
        const { code } = info.file.response;
        if (code == 200) {
          this.$message.info("上传成功");
        }
      }
    }
  }
};
</script>

<style lang="css" scoped>
.upload_body {
  align-items: center;
  justify-content: flex-end;
  margin: 40px 0;
  display: flex;
  flex-direction: column;
}
.lable_page {
  margin: 0 200px;
}
.lable_des {
  margin-top: 20px;
  font-weight: normal;
  color: #fff;
}
.lable_pre {
  background: #c54586;
  padding: 20px;
  width: 200px;
  margin: 10px;
  border-radius: 10px;
  display: block;
  text-align: center;
  align-items: center;
}
.lable_pre:hover {
  cursor: pointer;
}
.lable_pre_content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.upload_btn {
  margin-top: 20px;
}

.lable_img {
  height: 100px;
  width: 100px;
}
</style>