import axios from "axios";

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
};
