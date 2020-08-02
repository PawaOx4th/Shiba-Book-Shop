<template>
  <div id="bookShelf-page" v-loading="loading">
    <el-row :gutter="20" type="flex" justify="center" align="middle" class="card">
      <div>
        <el-col :xs="24" :md="8" v-for="(book, index) in Books" :key="index">
          <BockCard
            :cover="`${book.cover}`"
            :price="`${book.price}`"
            :title="`${book.title}`"
            :id="`${book.id}`"
        /></el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "bookShelf-page",
  components: {
    BockCard: () => import("@/components/BockCard")
  },
  data() {
    return {
      books: "",
      loading: true
    };
  },
  watch: {},
  computed: {
    Books() {
      const data = this.$store.state.bookShelf;
      this.checkBooks();
      return data;
    }
  },

  methods: {
    checkBooks() {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  padding: 5rem;
  margin-bottom: 20px;
  background-color: #f6f6f7;

  max-height: 100vh;
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
