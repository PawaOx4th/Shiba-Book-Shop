<template>
  <div id="book-card">
    <el-card class="box-card">
      <el-container>
        <img :src="cover" />
        <h5>{{ title }}</h5>
      </el-container>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "book-card",
  props: {
    cover: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    bookid: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  padding: 0;
  // height: auto;

  img {
    border-radius: 10px;
    // width: 35%;
    height: auto;
  }
}
</style>
