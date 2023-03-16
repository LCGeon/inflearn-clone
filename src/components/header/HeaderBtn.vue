<template>
  <div v-if="id">
    <button class="header__icon-play">
      <i class="bi-play"></i>
    </button>
    <button class="header__icon-cart">
      <i class="bi-cart3"></i>
    </button>
    <button class="header__icon-user">
      <i class="bi-person" @mouseover="personModal"></i>
    </button>
    <UserModal></UserModal>
  </div>
  <div v-else>
    <button class="header__login-btn" @click="ismodalTrue">로그인</button>
    <router-link to="/signup">
      <button class="header__sign-btn">회원가입</button></router-link
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import UserModal from "../modal/UserModal.vue";
export default {
  computed: {
    ...mapState("loginStore", {
      id: (state) => state.userState.account.id,
    }),
  },
  components: { UserModal },
  methods: {
    ...mapMutations("loginStore", ["ismodalTrue"]),
    ...mapMutations(["personModal", "personModalOut"]),
    asd() {
      console.log(this.$store.state.loginStore.ismodal);
      this.$store.state.loginStore.ismodal = true;
      console.log(this.$store.state.loginStore.ismodal);
    },
  },
};
</script>
