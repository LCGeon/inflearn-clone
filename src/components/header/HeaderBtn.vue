<template>
  <div v-if="userState.account.id">
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
    <button class="header__login-btn" @click="this.$store.state.ismodal = true">
      로그인
    </button>
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
    ...mapState(["userState"]),
  },
  components: { UserModal },
  methods: {
    ...mapMutations(["personModal", "personModalOut"]),
  },
};
</script>
