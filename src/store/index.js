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
      idForm: {
        user_id: null,
        lecture_id: "",
      },
    },
    event: {
      coupon: 0,
      point: 0,
    },
    lectureList: [],
    enrolment: {},
    pwdValue: true,
    pwd: "password",
    ismodal: false,
    isPersonModal: false,
    loadingStatus: false,
    userImg: "https://cdn.inflearn.com/public/main/profile/default_profile.png",
    urlConfig: "https://ifh.cc/g/",
  },
  getters,
  mutations,
  actions,
  modules: {},
});
