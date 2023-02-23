import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default createStore({
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
    event: {
      coupon: 0,
      point: 0,
    },
    pwdValue: true,
    pwd: "password",
    ismodal: false,
    isPersonModal: false,
    userImg: "https://cdn.inflearn.com/public/main/profile/default_profile.png",
    urlConfig: "https://ifh.cc/g/",
  },
  getters,
  mutations,
  actions,
  modules: {},
});
