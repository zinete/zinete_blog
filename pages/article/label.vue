<template>
  <div class="lable_page">
    <div class="lable_pre_content">
      <div v-for="item in lable" :key="item.id">
        <div class="lable_pre">
          <img v-bind:src="item.name" alt="item.title" class="lable_img" />
          {{item.name}}
        </div>
      </div>
    </div>
    <a-upload
      name="file"
      :multiple="true"
      action="/uploadFile/img"
      :headers="headers"
      @change="handleChange"
    >
      <a-button>
        <a-icon type="upload" />Click to Upload
      </a-button>
    </a-upload>
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
        console.log(info.file, "文件");
      }
    }
  }
};
</script>

<style lang="css" scoped>
.lable_page {
  margin: 0 200px;
}
.lable_pre {
  background: #ddd;
  padding: 20px;
  width: 200px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid red;
  display: block;
  text-align: center;
  align-content: center;
}
.lable_pre:hover {
  border: 1px solid #000;
  cursor: pointer;
}
.lable_pre_content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.lable_img {
  height: 100px;
  width: 100px;
}
</style>