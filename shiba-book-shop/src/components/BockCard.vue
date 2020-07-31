<template>
  <div id="book-card">
    <el-card class="box-card" shadow="hover">
      <el-container>
        <!-- Book Cover -->
        <el-aside width="155px"><img :src="cover" alt=""/></el-aside>

        <!-- Book Detail -->
        <el-main>
          <!-- Book Title -->

          <el-header>
            <h1>{{ title }}</h1>
          </el-header>

          <!-- Book Price -->
          <h5>Price : ฿{{ price }}</h5>

          <!-- Book id -->
          <!-- <el-tag type="info">{{ bookid }}</el-tag> -->

          <el-input-number
            size="small"
            controls-position="right"
            :min="1"
            :max="10"
            v-model="count"
          ></el-input-number>

          <!-- Add to  Basket-->
          <el-footer>
            <el-button
              type="primary"
              icon="el-icon-circle-plus"
              class="add-to-cart"
              @click="addToCart"
              >Add to cart</el-button
            >
          </el-footer>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "book-card",
  data() {
    return {
      count: 1,
      bookOrder: {}
    };
  },
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
  },
  methods: {
    async addToCart() {
      // เรียกใช้ Function กำหนดจำนวนหนังสือที่ต้องการในแต่ละ Order
      await this.addBookCount();

      // ส่งข้อมูลเข้าไปเก็บที่ Store
      this.$store.dispatch("setBasket", this.bookOrder);

      //
      this.count = 1;
    },
    addBookCount() {
      // เพิ่มรายละเอียดหนังสือ, และจำนวนหนังสือ เข้าไปเก็บใน bookOrder
      this.bookOrder = { ...this.$props, count: this.count };
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  padding: 0;
  border-radius: 1rem;
  text-align: left;
  // font-size: 16px;
  // height: auto;

  .el-container {
    img {
      border-radius: 10px;
    }

    .el-main {
      padding: 0 0 0 1rem;
      position: relative;

      .el-header {
        width: auto;
        text-align: left;
        padding: 0 !important;
        font-weight: bold;
        font-size: 0.5rem;

        // margin-bottom: 2%;
      }

      h5 {
        font-weight: 300;
        font-size: 1rem;
      }

      .el-footer {
        padding: 0 0 0 1rem;
        position: absolute;
        bottom: 0;
        left: 0;

        .el-button .add-to-cart {
          border-radius: 0.5rem;
          width: 5vw;
          text-transform: uppercase;
          font-size: 1px;
        }
      }
    }
  }
}
</style>
