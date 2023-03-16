<template>
  <div
    v-if="this.$store.state.isPersonModal === true"
    class="header__person-modal"
    @mouseleave="personModalOut()"
  >
    <div class="header__person-modal-item">
      <img
        class="person-modal-img"
        :src="this.$store.state.addressStore.userImg"
      />
      <span class="user__id"
        ><i class="bi bi-house-fill"></i>{{ userState.account.id }}
        <i class="bi bi-chevron-right"></i
      ></span>
      <br />
      <span v-if="userState.account.type === 1" class="user__type">학생</span>
      <span v-if="userState.account.type === 2" class="user__type">강사</span>
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
              v-if="userState.account.type === 1"
              class="user__registration"
            >
              <i class="bi bi-play-circle"></i>이어서 학습하기
            </button>
            <button v-if="userState.account.type === 2" class="user__upload">
              <router-link to="/upload"
                ><i class="bi bi-cloud-arrow-up"></i>강의 영상
                업로드</router-link
              >
            </button>
          </li>
          <li><i class="bi bi-pie-chart"></i>대시보드</li>
          <li>
            <i class="bi bi-journals"></i
            ><router-link :to="`/my-courses/${userState.account.id}`"
              >내 학습</router-link
            >
          </li>
          <li><i class="bi bi-pencil-square"></i>강의 노트</li>
          <li><i class="bi bi-lightbulb"></i>멘토링</li>
          <li><i class="bi bi-chat-left-text"></i>작성한 게시글</li>
          <li><i class="bi bi-patch-question"></i>수강 전 문의</li>
          <li><i class="bi bi-heart"></i>좋아요</li>
        </ul>
      </div>
      <div>
        <button class="user__logout" @click="logout()">로그아웃</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["ismodal", "event"]),
    ...mapState("loginStore", {
      userState: (state) => state.userState,
    }),
  },
  methods: {
    ...mapMutations(["personModalOut"]),
    logout() {
      this.$store.commit("loginStore/logout");
      this.$router.replace("/");
      alert("로그아웃 되었습니다.");
    },
  },
};
</script>
