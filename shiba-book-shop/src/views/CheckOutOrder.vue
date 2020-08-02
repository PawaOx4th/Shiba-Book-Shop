<template>
  <div id="check-out-order">
    <el-container>
      <!-- Navber -->
      <el-header>
        <Navber />
      </el-header>

      <el-container>
        <el-row>
          <!-- Order Table -->
          <el-col :lg="18" :xl="16">
            <el-main>
              <OrderTable />
            </el-main>
          </el-col>
          <!-- Result Price -->
          <el-col :lg="6" :xl="8">
            <el-aside width="100%">
              <BookAmount />
            </el-aside>
          </el-col>
        </el-row>
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
    background: rgb(255, 255, 255);
    overflow: hidden;
    min-height: 118px;
  }

  .el-row {
    height: 100vh;
    padding-top: 5rem;
    width: 100vw;
    max-width: 100vw;

    .el-header {
      overflow: hidden;
      min-height: 118px;
      padding: 0;
      position: fixed;
      z-index: 99;
    }

    .el-container {
      display: flex;
      padding-top: 8rem;

      .el-main {
        // height: 100vh;
        padding: 0 1rem 1rem 1rem;
        width: 100%;
      }

      .el-aside {
        padding: 1rem 2rem 0 0;
      }
    }
  }
}

/* width */
::-webkit-scrollbar {
  width: 1rem;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ffc86a;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #f58f00;
}
</style>
