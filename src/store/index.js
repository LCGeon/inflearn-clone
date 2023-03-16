import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import loginStore from "./modules/loginStore";
import getDataStore from "./modules/getDataStore";
import addressStore from "./modules/addressStore";

export default createStore({
  state: {
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
    isPersonModal: false,
    loadingStatus: false,
    lectureContext: null,
  },
  getters,
  mutations,
  actions,
  modules: { loginStore, getDataStore, addressStore },
});
