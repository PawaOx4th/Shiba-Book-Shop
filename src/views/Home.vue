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
        <BookShelf />
      </el-main>
      <!-- END Main Section -->

      <!-- Footer Section -->
      <el-footer>
        <Footer />
      </el-footer>
      <!-- END Footer Section -->
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    Navber: () => import("@/components/Navber"),
    BookShelf: () => import("@/views/BookShelf"),
    Footer: () => import("@/components/Footer")
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
    min-height: 100vh;
  }

  .el-footer {
    background-color: #ffff;
  }
}
</style>
