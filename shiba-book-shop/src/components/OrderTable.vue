<template>
  <el-table :data="BookOrder" style="width: 100vw">
    <!-- Picture -->
    <el-table-column label="Picture" width="150vw">
      <template slot-scope="scope">
        <!-- <span style="margin-left: 10px">{{ scope.row.cover }}</span> -->
        <img :src="scope.row.cover" :alt="scope.row.title" />
      </template>
    </el-table-column>

    <!-- Book Name -->
    <el-table-column label="Book Name" width="200vw" align="left">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <p class="book-name">{{ scope.row.title }}</p>
        </div>
      </template>
    </el-table-column>

    <!-- Price -->
    <el-table-column label="Price" width="120vw" align="center">
      <template slot-scope="scope">
        <p class="book-price">฿{{ scope.row.price }}</p>
      </template>
    </el-table-column>

    <!-- Book Count -->
    <el-table-column label="Count" width="150vw" align="center">
      <template slot-scope="scope">
        <p class="book-count">{{ scope.row.count }}</p>
      </template>
    </el-table-column>

    <!-- Book Amount-->
    <el-table-column label="Amount" width="120vw" align="center">
      <!-- <el-button size="mini" @click="handleEdit">Edit</el-button>
      <el-button size="mini" type="danger" @click="handleDelete">Delete</el-button> -->
      <template slot-scope="scope">
        <p class="book-count">{{ scope.row.amount }}</p>
      </template>
    </el-table-column>

    <!-- Button Delete -->
    <el-table-column label="Amount" width="100vw" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleDelete(scope.$index, scope.row)"
          type="danger"
          icon="el-icon-remove"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "order-table",
  data() {
    return {
      search: ""
    };
  },
  computed: {
    BookOrder() {
      return this.$store.getters.getBasket;
    }
  },
  methods: {
    handleDelete(index, data) {
      this.$store.dispatch("removeOrderInBasket", data);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-table {
  .el-table-column {
    text-align: center;
  }
}

p.book-name {
  font-size: 1rem;
  text-align: left;
}

p.book-price {
  font-size: 1.5rem !important;
  font-weight: 500;
  line-height: 4rem;
}

p.book-count {
  font-size: 2.2rem !important;
  font-weight: 600;
  line-height: 4rem;
}

.el-table th {
  text-align: center !important;
}
</style>
