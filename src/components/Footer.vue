<template>
  <div id="footer">
    <div class="container">
      <div class="content-footer">
        Copyright © 2020 By PawaOx4th
      </div>
      <div class="socail">
        <a href="https://github.com/PawaOx4th"><img src="~@/assets/GithubMark.png" alt=""/></a>
        <a href="https://www.facebook.com/KaenPawanachai">
          <img src="~@/assets/facebook.png" alt="" />
        </a>
        <a href="https://www.instagram.com/k_kaen/"> <img src="~@/assets/instagram.png" alt=""/></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer"
};
</script>

<style lang="scss" scoped>
$--border: 1px solid #000;

.container {
  padding: 1rem;
  width: 90%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .content-footer {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .socail {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    img {
      margin: 0 0.5rem;
    }
  }
}
</style>
