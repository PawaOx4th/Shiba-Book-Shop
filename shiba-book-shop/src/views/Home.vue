<template>
  <div class="home">
    <Navber />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    Navber: () => import("../components/Navber")
  },

  mounted() {
    console.log(this.$store.getters.getBookshelf);
  }
};
</script>
