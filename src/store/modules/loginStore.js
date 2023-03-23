import axios from "axios";
import router from "@/router";
const loginStore = {
  namespaced: true,
  state: {
    userState: {
      account: {
        id: null,
        name: "",
        type: "",
      },
      form: {
        loginId: "",
        loginPw: "",
      },
    },
    loadingStatus: false,
    ismodal: false,
    pwdValue: true,
    pwd: "password",
  },
  mutations: {
    logout(state) {
      axios.delete("/api/account").then(() => {
        state.userState.account.id = null;
        state.userState.account.name = "";
        state.userState.account.type = "";
        router.push({ name: "home" });
        router.go(0);
      });
    },
    submit(state) {
      state.loadingStatus = true;
      const args = {
        loginId: state.userState.form.loginId,
        loginPw: state.userState.form.loginPw,
      };
      axios
        .post("/api/account", args)
        .then((res) => {
          state.userState.account = res.data;
          state.loadingStatus = false;
          state.ismodal = false;
          router.push({ name: "home" });
          router.go(0);
        })
        .catch(() => {
          alert("올바른 정보가 아닙니다.");
          state.loadingStatus = false;
        });
    },

    loginCheck(state) {
      if (state.userState.account.id === null) {
        alert("로그인이 필요합니다.");
        router.push({ name: "home" });
        state.ismodal = true;
      }
    },
    pwdHide(state) {
      state.pwd = "";
      state.pwdValue = false;
    },
    pwdShow(state) {
      state.pwd = "password";
      state.pwdValue = true;
    },
    ismodalTrue(state) {
      state.ismodal = true;
    },
    ismodalFalse(state) {
      state.ismodal = false;
    },
    getLoginInfo(state) {
      axios.get("/api/account").then((res) => {
        state.userState.account = res.data;
      });
    },
  },
};

export default loginStore;
