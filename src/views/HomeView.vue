<template>
  <!-- 슬라이드 배너 -->
  <div class="Home">
    <BannerCarousel :slides="slides"></BannerCarousel>
    <div class="Home__Writing"><h1>배우고, 나누고, 성장하세요</h1></div>
    <div class="Home__Writing">
      <label>
        <input
          type="text"
          class="Home__search-Box"
          placeholder="배우고 싶은 지식을 입력해보세요."
          style="font-size: 15px"
        /><button class="Home__search-Btn">
          <i class="bi-search"></i>
        </button>
      </label>
    </div>
    <HashCarousel></HashCarousel>
    <div class="Home__mycourses-container" v-if="login">
      <div class="Home__mycourses-title">
        <h2>내 학습</h2>
        <span><i class="bi bi-chevron-right"></i></span>
      </div>
      <div class="courses__box">
        <div v-for="courses in mycourses" :key="courses" class="mc">
          <div>
            <img :src="courses.image_url" alt="" class="courses__img" />
          </div>
          <div class="mc__card">
            <div class="mc__title">{{ courses.title }}</div>
            <div class="mc__bottom">
              <span class="mc__rate">
                <br />
                <span>기한 : 무제한 | 진도율 : 30%</span>
                <progress max="100" value="30" class="mc__progress"></progress>
              </span>
              <span class="mc__edu"
                ><button class="mc__button">바로 학습</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="Home__mycourses-container">
      <div class="Home__mycourses-title">
        <h2>왕초보 할 수 있어요 !</h2>
        <i class="bi bi-lightning-fill"></i>
        <span> <i class="bi bi-chevron-right"></i></span>
      </div>
      <div class="Home__lecture-list">
        <div>
          <LectureList></LectureList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BannerCarousel from "../components/carousel/BannerCarousel/Carousel.vue";
import HashCarousel from "../components/carousel/hashCarousel/HashCarousel.vue";
import LectureList from "../components/lecture/LectureList.vue";
export default {
  components: { BannerCarousel, HashCarousel, LectureList },
  computed: {
    ...mapState("addressStore", {
      slides: (state) => state.slides,
    }),
    ...mapState("getDataStore", {
      mycourses: (state) => state.mycourses,
    }),
    ...mapState("loginStore", {
      login: (state) => state.userState.account.id,
    }),
  },
  mounted() {
    this.$store.commit("getDataStore/getMycourses");
    this.$store.commit("getDataStore/getLectureList");
  },
};
</script>
<style scoped>
progress {
  -webkit-appearance: none;
  appearance: none;
}
progress::-webkit-progress-bar {
  background-color: #dedede;
  border: 1px solid #dedede;
}
progress::-webkit-progress-value {
  background-color: rgb(2, 200, 88);
}

.Home__Writing {
  display: flex;
  justify-content: center;
  font-size: 17px;
  padding-bottom: 25px;
}
.Home__search-Box {
  width: 500px;
  height: 35px;
  border-style: solid;
  border-radius: 50px;
  border-color: rgb(205, 255, 192);
  background-color: rgb(230, 255, 230);
  padding: 5px;
  padding-left: 15px;
}
.Home__search-Box:focus {
  background-color: white;
}
::placeholder {
  color: rgb(123, 205, 103);
}
.Home__search-Btn {
  position: relative;
  margin-left: -60px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
label {
  position: relative;
}
.Home__mycourses-title {
  display: flex;
  justify-content: left;
}
.bi {
  font-size: 24px;
  margin: 0px 0px 0px 10px;
}
.bi-lightning-fill {
  font-size: 26px;
  color: rgb(232, 232, 23);
}
.Home__mycourses-container {
  text-align: center;
  margin: 10px 165px;
}
.courses__box {
  display: flex;
  width: 100%;
  height: 250px;
  padding: 10px;
  overflow: hidden;
}
.Home__lecture-list {
  display: flex;
  width: 100%;
  overflow: hidden;
  height: 360px;
}
.courses__img {
  width: 174px;
  height: 110px;
}
.mc {
  display: flex;
  position: relative;
  width: 595px;
  height: 112px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #dedede;
  margin: 10px;
  cursor: pointer;
}
.mc__title {
  color: #333;
  font-weight: 700;
  overflow: hidden;
  text-align: left;
  height: 45px;
}
.mc__card {
  text-align: left;
  margin: 10px;
  width: 379px;
}
.mc__rate {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: #6a6a6a;
}
.mc__bottom {
  display: flex;
  justify-content: space-between;
}
.mc__button {
  display: flex;
  width: 95px;
  height: 32px;
  font-size: 14px;
  font-weight: 600;
  background-color: #1dc078;
  color: #fff;
  z-index: 2;
  border: none;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
}
.mc__edu {
  display: flex;
  align-items: end;
}
.mc__progress {
  width: 275px;
  height: 4px;
  margin: 5px 0px 0px 0px;
}
</style>
