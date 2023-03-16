<template>
  <body>
    <LectureTitle></LectureTitle>
    <div class="enrolment-info-menu">
      <button class="info-menu-context">강의 소개</button>
      <button class="info-menu-curriculum">커리큘럼</button>
      <button class="info-menu-review">수강평</button>
    </div>
    <div class="enrolment">
      <div class="info-container">
        <h3 v-for="i in 30" :key="i">{{ enrolment.context }}</h3>
      </div>
      <div
        class="floating-container"
        ref="floating"
        v-scroll="onScroll"
        :style="accountInfoStyle"
      >
        <div class="lecture-price">
          <h2>{{ enrolment.price }}원</h2>
          <br />
        </div>
        <div class="floating-btn">
          <button
            class="enrolment-btn"
            @click="addEnrolment"
            :disabled="
              enrolment.isEnrolled || userState.account.id === enrolment.user
            "
            :class="{
              registered:
                enrolment.isEnrolled || userState.account.id === enrolment.user,
            }"
          >
            <p
              v-if="
                !enrolment.isEnrolled && userState.account.id != enrolment.user
              "
            >
              수강신청 하기
            </p>

            <p
              v-if="
                enrolment.isEnrolled && userState.account.id != enrolment.user
              "
            >
              이미 등록된 강의입니다.
            </p>
            <p v-if="userState.account.id === enrolment.user">
              본인 강의입니다.
            </p>
          </button>

          <br />
          <button class="cart-btn">바구니에 담기</button>
        </div>
        <div class="floating-info">
          <ul>
            <li>
              지식 공유자 : <a>{{ enrolment.user }}</a>
            </li>
            <li>총 0개 수업 (0시간 0분)</li>
            <li>수강기한: 무제한</li>
            <li>수료증: 발급</li>
          </ul>
        </div>
      </div>
    </div>
    <div></div>
  </body>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import LectureTitle from "../components/lecture/LectureTitle.vue";
export default {
  data() {
    return {
      topPos: 0,
      accountInfoStyle: {
        top: 0,
        position: "relative",
      },
    };
  },
  components: { LectureTitle },
  computed: {
    ...mapState("loginStore", {
      userState: (state) => state.userState,
    }),
    ...mapState("getDataStore", {
      enrolment: (state) => state.enrolment,
    }),
  },
  mounted() {
    this.$store.commit("getDataStore/getEnrolment", this.$route.params.id);
    this.topPos = this.$refs.floating.getBoundingClientRect().top;
  },
  created() {
    window.scrollTo(0, 0);
  },
  methods: {
    onScroll() {
      let currentPos = window.pageYOffset;
      if (currentPos > this.topPos) {
        this.accountInfoStyle.opacity = 1;
        this.$nextTick(() => {
          this.accountInfoStyle.top = currentPos - this.topPos + 30 + "px";
        });
      }
    },

    addEnrolment() {
      const args = {
        lectureId: this.$route.params.id,
      };
      axios
        .post("/api/lecture/enrolment", args)
        .then(() => {
          alert("수강 신청이 완료되었습니다.");
          this.$router.push({ name: "lecture" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.enrolment {
  display: flex;
  justify-content: center;
  /* display: inline-block; */
}
.enrolment-info-menu {
  display: flex;
  justify-content: space-around;
  margin: 13px 40px 50px;
  padding-bottom: 16px;
  font-size: 14px;
  border-bottom: 1px solid #dfdfdf;
}
.info-container {
  width: 700px;
  white-space: normal;
}
.floating-container {
  text-align: center;
  margin-left: 30px;
  padding: 50px;
  border: 1px solid #dfdfdf;
  height: 380px;
  width: 400px;
}

.enrolment-btn,
.cart-btn {
  border-radius: 4px;
  width: 300px;
  height: 50px;
  font-weight: 800;
}
.enrolment-btn {
  background-color: #00c471;
  color: white;
  margin-bottom: 10px;
}
.cart-btn {
  border: 1px solid #909090;
}
.menu_focus {
  font-size: 20px;
}

.floating-info {
  margin-top: 2.5rem;
  font-size: 16px;
}
ul {
  list-style: circle;
  display: inline-block;
  text-align: left;
}
.lecture-price {
  text-align: left;
}
.registered {
  background-color: #909090;
}
</style>
