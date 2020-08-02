<template>
  <div id="book-amount">
    <!-- จำนวนหนังสือที่อยู่ใน Order ทั้งหมด -->
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <div>
          Book Count
        </div>
      </el-col>
      <el-col :span="12"> {{ bookCounts }}</el-col>
    </el-row>

    <!-- จำนวนราคาสินค้าทั้งหมด -->
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <div>
          Book Count
        </div>
      </el-col>
      <el-col :span="12"> {{ amount }}</el-col>
    </el-row>

    <!-- ส่วนลด -->
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <div>
          Discount
        </div>
      </el-col>
      <el-col :span="12"> {{ bookDiscount }}</el-col>
    </el-row>

    <!-- ส่วนลด -->
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <div>
          AMOUNT
        </div>
      </el-col>
      <el-col :span="12"> {{ amount }}</el-col>
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
  background-color: #ffffff;

  .el-col {
    font-size: 1.5rem;
    padding: 1rem;
  }
}
</style>
