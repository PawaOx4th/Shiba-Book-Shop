<template>
  <div id="book-amount">
    <el-row type="flex" justify="start">
      <el-col :span="12"
        ><div class="header">
          Book Count
        </div></el-col
      >
      <el-col :span="12">
        <h5>{{ bookCounts }}</h5></el-col
      >
    </el-row>

    <!-- จำนวนราคาสินค้าทั้งหมด -->
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <div class="header">
          Price
        </div>
      </el-col>
      <el-col :span="12">
        <h5>{{ price }}</h5></el-col
      >
    </el-row>

    <!-- ส่วนลด -->
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <div class="header">
          Discount
        </div>
      </el-col>
      <el-col :span="12">
        <h5>{{ bookDiscount }}</h5></el-col
      >
    </el-row>

    <!-- ส่วนลด -->
    <el-row type="flex" justify="center" class="row-amount">
      <el-col :span="12">
        <div class="header amount">
          AMOUNT
        </div>
      </el-col>
      <el-col :span="12">
        <h5 class="amount">{{ amount }}</h5></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  name: "book-amount",
  data() {
    return {
      tableData: ""
    };
  },
  computed: {
    amount() {
      const amounts = this.handleAmount();
      return amounts;
    },
    price() {
      const price = this.$store.getters.getBasket;
      const sumPrice = price.reduce((sum, amount) => sum + amount.amount, 0);
      const result = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB"
      }).format(sumPrice);
      return result;
    },
    bookCounts() {
      return this.$store.getters.getBookCount;
    },
    bookDiscount() {
      const discount = this.$store.getters.getDiscountResult;
      const discounted = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB"
      }).format(discount);
      return discounted;
    }
  },
  methods: {
    handleAmount() {
      const result = this.$store.getters.getAmountPrice;
      // const result = amounts.reduce((sum, amount) => sum + amount.amount, 0);
      const results = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB"
      }).format(result);
      return results;
    },
    handleResult() {
      this.$store.dispatch("calculeateBookDiscount");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  .el-col {
    background-color: white;
    padding: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .header {
      font-size: 1.5rem;
      color: #b1bcc7;
    }

    h5 {
      font-size: 2rem;
    }
  }
}

.row-amount {
  padding: 1rem;
  background: white;
}

.header.amount {
  font-weight: 500;
  font-size: 2rem;
}

.amount {
  color: #6299cb;
  font-size: 3rem !important;
}
</style>
