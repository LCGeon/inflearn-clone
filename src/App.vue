<template>
  <header>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
    />
    <nav>
      <HeaderMenu></HeaderMenu>
      <div>
        <input type="text" class="header__search-box" /><button
          class="header__search-Btn"
        >
          <i class="bi-search"></i>
        </button>
      </div>
      <div>
        <button class="header__dash-bord">대시보드</button>
      </div>

      <!-- 로그인 성공시 헤더 아이콘 뜨기 -->
      <div class="header__icon" id="header__icon" v-if="state.account.id">
        <button class="header__icon-play">
          <i class="bi-play"></i>
        </button>
        <button class="header__icon-cart">
          <i class="bi-cart3"></i>
        </button>
        <button class="header__icon-user">
          <i class="bi-person" @mouseover="personModal()"></i>
        </button>
        <div
          v-if="isPersonModal === true"
          class="header__person-modal"
          @mouseleave="personModalOut()"
        >
          <div class="header__person-modal-item">
            <img class="person-modal-img" :src="userImg" />
            <span class="user__id"
              ><i class="bi bi-house-fill"></i>{{ state.account.id }}
              <i class="bi bi-chevron-right"></i
            ></span>
            <br />
            <span v-if="state.account.type === 1" class="user__type">학생</span>
            <span v-if="state.account.type === 2" class="user__type">강사</span>
            <br />
            <div class="user__event">
              <span class="user__coupon"
                >쿠폰
                <span class="user__coupon_value">{{ event.coupon }}</span>
                개</span
              >
              <span class="user__point"
                >포인트
                <span class="user__point_value">{{ event.point }}</span>
                잎</span
              >
            </div>
            <div class="user__btn">
              <ul>
                <li>
                  <button
                    v-if="state.account.type === 1"
                    class="user__registration"
                  >
                    <router-link to="/inflearn"
                      ><i class="bi bi-play-circle"></i>이어서
                      학습하기</router-link
                    >
                  </button>
                  <button v-if="state.account.type === 2" class="user__upload">
                    <router-link to="/upload"
                      ><i class="bi bi-cloud-arrow-up"></i>강의 영상
                      업로드</router-link
                    >
                  </button>
                </li>
                <li><i class="bi bi-pie-chart"></i>대시보드</li>
                <li><i class="bi bi-journals"></i>내 학습</li>
                <li><i class="bi bi-pencil-square"></i>강의 노트</li>
                <li><i class="bi bi-lightbulb"></i>멘토링</li>
                <li><i class="bi bi-chat-left-text"></i>작성한 게시글</li>
                <li><i class="bi bi-patch-question"></i>수강 전 문의</li>
                <li><i class="bi bi-heart"></i>좋아요</li>
              </ul>
            </div>
            <div>
              <button class="user__logout" @click="logout(), refresh()">
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="header__login" v-else>
        <button class="header__login-btn" @click="state.ismodal = true">
          로그인
        </button>
        <router-link to="/signup">
          <button class="header__sign-btn">회원가입</button></router-link
        >
      </div>
    </nav>
    <div class="black-bg" v-if="state.ismodal === true">
      <div class="white-bg">
        <button @click="state.ismodal = false" class="login__modal-close-btn">
          X
        </button>
        <div class="login__logo">
          <img :src="logo" class="login__modal-logo" />
        </div>
        <br />
        <input
          class="login__id-input"
          placeholder="이메일"
          v-model="state.form.loginId"
        /><br />
        <input
          class="login__pw-input"
          placeholder="비밀번호"
          :type="pwd"
          v-model="state.form.loginPw"
          @keyup.enter="submit(), loginAfter()"
        />
        <div class="pwd__icon">
          <i class="bi-eye" v-if="pwdValue === false" @click="pwdShow()"></i>
          <i
            class="bi-eye-slash"
            v-if="pwdValue === true"
            @click="pwdHide()"
          ></i>
        </div>
        <br />
        <button class="login__login-btn" @click="submit(), loginAfter()">
          로그인
        </button>
      </div>
    </div>
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <span>
      (주)인프랩 | 대표자: 이형주 | 사업자번호: 499-81-00612 사업자 정보 확인
      통신판매업: 2018-성남분당B-0062 | 개인정보보호책임자: 이동욱 | 이메일:
      info@inflearn.com 주소: 경기도 성남시 분당구 대왕판교로 660 유스페이스
      1A동 405호 ©INFLAB. ALL RIGHTS RESERVED
    </span>
  </footer>
</template>
<script>
import axios from "axios";
import { reactive } from "@vue/reactivity";
import HeaderMenu from "./components/HeaderMenu.vue";

export default {
  components: { HeaderMenu },
  setup() {
    const state = reactive({
      ismodal: false,
      account: {
        id: null,
        name: "",
        type: "",
      },
      form: {
        loginId: "",
        loginPw: "",
      },
    });
    const submit = () => {
      const args = {
        loginId: state.form.loginId,
        loginPw: state.form.loginPw,
      };
      axios
        .post("/api/account", args)
        .then((res) => {
          state.account = res.data;
          state.ismodal = false;
        })
        .catch(() => {
          alert("올바른 정보가 아닙니다.");
        });
    };

    axios.get("/api/account").then((res) => {
      state.account = res.data;
    });
    return { state, submit };
  },

  props: {},
  data() {
    return {
      logo: require("./assets/inflearn.png"),
      userImg:
        "https://cdn.inflearn.com/public/main/profile/default_profile.png",
      pwd: "password",
      pwdValue: true,
      isPersonModal: false,
      event: {
        coupon: 0,
        point: 0,
      },
    };
  },
  methods: {
    pwdHide() {
      this.pwd = "";
      this.pwdValue = false;
    },
    pwdShow() {
      this.pwd = "password";
      this.pwdValue = true;
    },
    loginSuccess() {
      if (this.state.account) {
        this.loginCloseBtn();
      }
    },
    personModal() {
      this.isPersonModal = true;
    },
    personModalOut() {
      this.isPersonModal = false;
    },
    logout() {
      axios.delete("/api/account").then(() => {
        this.state.account.id = null;
        this.state.account.name = "";
        this.state.account.type = "";
      });
    },
    refresh() {
      this.$router.replace("/");
      alert("로그아웃 되었습니다.");
    },
    loginAfter() {
      this.$router.replace("/");
    },
  },
};
</script>
<style>
@import "./assets/css/Appvue.css";
</style>
