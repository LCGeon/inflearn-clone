<template>
  <ul class="header__Ul">
    <li>
      <img :src="logo" class="mainLogo" @click="toMain()" />
    </li>
    <li class="header__Li">
      <router-link to="/lecture"><a>강의</a></router-link>
      <ul class="header__lecture-Ul">
        <li><a>개발 프로그래밍</a></li>
        <li><a>보안 네트워크</a></li>
        <li><a>데이터 사이언스</a></li>
        <li><a>게임 개발</a></li>
        <li><a>크리에이티브</a></li>
        <li><a>직무 마케팅</a></li>
        <li><a>학문 외국어</a></li>
        <li><a>커리어</a></li>
        <li><a>교양</a></li>
      </ul>
    </li>

    <li><router-link to="/lodmap">로드맵</router-link></li>
    <li><router-link to="/mentoring">멘토링</router-link></li>
    <li class="header__community">
      <router-link to="/community">커뮤니티</router-link>
      <ul class="header__community-ul">
        <li><a>질문 & 답변</a></li>
        <li><a>자유 주제</a></li>
        <li><a>스터디</a></li>
        <li><a>블로그</a></li>
      </ul>
    </li>
    <li class="header__inf">
      <router-link to="/inflearn">인프런</router-link>
      <ul class="header__inf-ul">
        <li><a>수강평</a></li>
        <li><a>멘토링 후기</a></li>
        <li><a>인프런 피드</a></li>
        <li><a>강의 기능 요청</a></li>
      </ul>
    </li>
  </ul>
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
</template>

<script>
export default {
  data() {
    return {
      logo: require("../assets/inflearn.png"),
    };
  },
  methods: {
    toMain() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style></style>
