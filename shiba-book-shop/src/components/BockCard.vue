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
          <h5>
            Price : <strong>฿{{ price }}</strong>
          </h5>

          <!-- Count -->
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
    id: {
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

      console.log("addToCart -> this.bookOrder.count", this.bookOrder.count);

      this.$store.state.bookCount = this.$store.getters.getBookCount + this.bookOrder.count;

      // Reset count in <el-input-number/>
      this.count = 1;
    },
    addBookCount() {
      // คำนวนเงิน
      const amount = this.count * this.$props.price;
      // เพิ่มรายละเอียดหนังสือ, และจำนวนหนังสือ เข้าไปเก็บใน bookOrder
      this.bookOrder = {
        ...this.$props,
        count: this.count,
        amount
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  min-height: 280px;
  padding: 0;
  border-radius: 1rem;
  text-align: left;

  .el-container {
    img {
      border-radius: 10px;
    }

    .el-main {
      padding: 0 0 0 1rem;
      max-height: 250px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .el-header {
        max-width: 320;
        word-wrap: break-word;
        text-align: left;
        padding: 0 !important;
        font-weight: bold;
        font-size: 1rem;
      }

      h5 {
        font-weight: 300;
        font-size: 1rem;
      }

      .el-footer {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0;

        .el-button {
          border-radius: 0.5rem;
          width: auto;
          height: 5vh;
          text-transform: uppercase;
          font-size: 1px;
        }
      }
    }
  }
}
</style>
