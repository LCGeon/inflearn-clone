import axios from "axios";
import router from "@/router/index.js";
export default {
  logout() {
    axios.delete("/api/account").then(() => {
      this.state.userState.account.id = null;
      this.state.userState.account.name = "";
      this.state.userState.account.type = "";
    });
  },
  submit() {
    const args = {
      loginId: this.state.userState.form.loginId,
      loginPw: this.state.userState.form.loginPw,
    };
    axios
      .post("/api/account", args)
      .then((res) => {
        this.state.userState.account = res.data;
        this.state.ismodal = false;
        router.push({ name: "home" });
      })
      .catch(() => {
        alert("올바른 정보가 아닙니다.");
      });
  },
  pwdHide() {
    this.state.pwd = "";
    this.state.pwdValue = false;
  },
  pwdShow() {
    this.state.pwd = "password";
    this.state.pwdValue = true;
  },
  personModal() {
    this.state.isPersonModal = true;
  },
  personModalOut() {
    this.state.isPersonModal = false;
  },
  loginCheck() {
    if (this.state.userState.account.id === null) {
      alert("로그인이 필요합니다.");
      router.push({ name: "home" });
      this.state.ismodal = true;
    }
  },
  getLectureList(state) {
    axios.get("/api/lecture/list").then((res) => {
      state.lectureList = res.data.lectureList;
    });
  },

  getEnrolment(state, id) {
    axios.get(`/api/lecture?lectureId=${id}`).then((res) => {
      state.enrolment = res.data;
    });
  },

  getLoginInfo(state) {
    axios.get("/api/account").then((res) => {
      state.userState.account = res.data;
    });
  },

  getMycourses(state) {
    axios.get("/api/member/lecture/list").then((res) => {
      state.mycourses = res.data;
    });
  },

  setHoveredBox(state, lectureItem) {
    state.lectureContext = lectureItem;
  },
};
