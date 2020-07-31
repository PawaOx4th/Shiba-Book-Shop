<template>
  <div id="home">
    <Navber class="nav" />

    <el-row :gutter="20" type="flex" justify="center" align="middle" class="card">
      <div>
        <el-col :span="8" :xs="24" v-for="(book, index) in Books" :key="index">
          <BockCard
            :cover="`${book.cover}`"
            :price="`${book.price}`"
            :title="`${book.title}`"
            :bookid="`${book.id}`"
        /></el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    Navber: () => import("@/components/Navber"),
    BockCard: () => import("@/components/BockCard")
  },
  data() {
    return {
      books: ""
    };
  },
  computed: {
    Books() {
      const data = this.$store.state.bookShelf;
      return data;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-row {
  padding: 5rem;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }

  .el-col {
    margin-bottom: 20px;
    .book-card {
      background-color: #0707bd;
    }
  }
}
</style>
