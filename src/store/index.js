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
    isPersonModal: false,
    loadingStatus: false,
    lectureContext: null,
  },
  getters,
  mutations,
  actions,
  modules: { loginStore, getDataStore, addressStore },
});
