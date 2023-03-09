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
        userId: null,
        lectureId: "",
      },
    },
    event: {
      coupon: 0,
      point: 0,
    },
    lectureType: [
      "개발 · 프로그래밍",
      "보안 · 네트워크",
      "데이터 사이언스",
      "게임 개발",
      "크리에이티브",
      "비즈니스 · 마케팅",
      "학문 · 외국어",
      "커리어",
      "자기 계발",
    ],
    userLecture: [],
    lectureList: [],
    enrolment: {},
    pwdValue: true,
    pwd: "password",
    ismodal: false,
    isPersonModal: false,
    loadingStatus: false,
    lectureContext: null,
    userImg: "https://cdn.inflearn.com/public/main/profile/default_profile.png",
    urlConfig: "https://ifh.cc/g/",
  },
  getters,
  mutations,
  actions,
  modules: {},
});
