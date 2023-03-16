<template>
  <div class="black-bg" v-if="ismodal">
    <div class="white-bg">
      <button @click="ismodalFalse" class="login__modal-close-btn">X</button>
      <div class="login__logo">
        <img src="../../assets/inflearn.png" class="login__modal-logo" />
      </div>
      <br />
      <input
        class="login__id-input"
        placeholder="아이디"
        v-model="userState.form.loginId"
        @keyup.enter="submit"
      /><br />
      <input
        class="login__pw-input"
        placeholder="비밀번호"
        :type="pwd"
        v-model="userState.form.loginPw"
        @keyup.enter="submit"
      />
      <div class="pwd__icon">
        <i class="bi-eye" v-if="!pwdValue" @click="pwdShow"></i>
        <i class="bi-eye-slash" v-if="pwdValue" @click="pwdHide"></i>
      </div>
      <br />
      <button class="login__login-btn" @click="submit">로그인</button>
    </div>
    <LoadingSpinner :loading="loadingStatus"></LoadingSpinner>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import LoadingSpinner from "../common/LoadingSpinner.vue";
export default {
  components: { LoadingSpinner },
  computed: {
    ...mapState(["loadingStatus", "logo"]),
    ...mapState("loginStore", {
      userState: (state) => state.userState,
      ismodal: (state) => state.ismodal,
      pwd: (state) => state.pwd,
      pwdValue: (state) => state.pwdValue,
    }),
  },
  methods: {
    ...mapMutations("loginStore", [
      "submit",
      "pwdShow",
      "pwdHide",
      "ismodalFalse",
    ]),
  },
};
</script>
