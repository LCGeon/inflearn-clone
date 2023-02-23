<template>
  <div class="black-bg" v-if="ismodal === true">
    <div class="white-bg">
      <button
        @click="this.$store.state.ismodal = false"
        class="login__modal-close-btn"
      >
        X
      </button>
      <div class="login__logo">
        <img src="../../assets/inflearn.png" class="login__modal-logo" />
      </div>
      <br />
      <input
        class="login__id-input"
        placeholder="이메일"
        v-model="userState.form.loginId"
      /><br />
      <input
        class="login__pw-input"
        placeholder="비밀번호"
        :type="pwd"
        v-model="userState.form.loginPw"
        @keyup.enter="submit()"
      />
      <div class="pwd__icon">
        <i class="bi-eye" v-if="pwdValue === false" @click="pwdShow()"></i>
        <i class="bi-eye-slash" v-if="pwdValue === true" @click="pwdHide()"></i>
      </div>
      <br />
      <button class="login__login-btn" @click="submit()">로그인</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["ismodal", "userState", "pwdValue", "pwd", "logo"]),
  },
  methods: {
    ...mapMutations(["submit", "loginAfter", "pwdShow", "pwdHide"]),
  },
};
</script>
