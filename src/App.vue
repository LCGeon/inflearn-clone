<template>
  <nav>
    <MainHeader></MainHeader>
  </nav>
  <LoginModal></LoginModal>
  <main>
    <router-view />
  </main>
  <footer>
    <MainFooter></MainFooter>
  </footer>
</template>
<script>
import MainHeader from "./components/header/MainHeader.vue";
import LoginModal from "./components/modal/LoginModal.vue";
import MainFooter from "./components/MainFooter.vue";

export default {
  components: { MainHeader, MainFooter, LoginModal },
  mounted() {
    this.$store.commit("getLoginInfo");
  },
};
</script>
<style>
@import "./assets/css/Appvue.css";
</style>
