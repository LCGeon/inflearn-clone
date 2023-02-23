<template>
  <header>
    <nav>
      <HeaderMenu></HeaderMenu>
      <HeaderBtn></HeaderBtn>
    </nav>
    <LoginModal></LoginModal>
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <MainFooter></MainFooter>
  </footer>
</template>
<script>
import axios from "axios";
import HeaderMenu from "./components/HeaderMenu.vue";
import HeaderBtn from "./components/HeaderBtn.vue";
import LoginModal from "./components/modal/LoginModal.vue";
import MainFooter from "./components/MainFooter.vue";

export default {
  components: { HeaderMenu, HeaderBtn, MainFooter, LoginModal },
  setup() {
    axios.get("/api/account").then((res) => {
      this.$store.state.userState.account = res.data;
    });
  },
};
</script>
<style>
@import "./assets/css/Appvue.css";
</style>
