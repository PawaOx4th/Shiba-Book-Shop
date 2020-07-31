<template>
  <div id="home">
    <el-container>
      <!-- Header Section -->
      <el-header>
        <Navber class="nav" />
      </el-header>
      <!-- END Header Section -->

      <!-- Main Section -->
      <el-main>
        <el-row :gutter="20" type="flex" justify="center" align="middle" class="card">
          <div>
            <el-col :xs="24" :md="8" v-for="(book, index) in Books" :key="index">
              <BockCard
                :cover="`${book.cover}`"
                :price="`${book.price}`"
                :title="`${book.title}`"
                :bookid="`${book.id}`"
            /></el-col>
          </div>
        </el-row>
      </el-main>
      <!-- END Main Section -->

      <!-- Footer Section -->
      <el-footer>Footer</el-footer>
      <!-- END Footer Section -->
    </el-container>
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
.el-container {
  background-color: #f6f6f7;

  .el-header {
    background: #f6f6f7;
    margin-bottom: 10rem;
    width: 100vw;
    z-index: 99;
    position: fixed;
    padding: 0 0 !important;
  }

  .el-main {
    padding: 10rem 2rem 0 2rem;

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
  }

  .el-footer {
    background-color: #ffff;
  }
}
</style>
