<template>
  <div id="check-out-order">
    <el-container>
      <el-header>
        <Navber />
      </el-header>
      <el-container>
        <el-main>
          <OrderTable />
        </el-main>

        <el-aside>
          <BookAmount />
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "check-out-order",
  components: {
    Navber: () => import("@/components/Navber"),
    OrderTable: () => import("@/components/OrderTable"),
    BookAmount: () => import("@/components/BookAmount")
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  background-color: #f6f6f7;

  .el-header {
    background: #000;
    overflow: hidden;
    min-height: 118px;
    padding: 0;
    position: fixed;
    z-index: 99;
  }

  .el-container {
    display: flex;
    padding-top: 8rem;
    .el-aside {
      flex: 1;
      border: 1px solid rgb(221, 221, 221);
      padding: 2rem;
    }

    .el-main {
      flex: 2;
      height: 100vh;
      padding: 2rem;
    }
  }
}
</style>
