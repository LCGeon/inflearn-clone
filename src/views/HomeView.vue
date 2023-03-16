<template>
  <!-- 슬라이드 배너 -->
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
  <div class="Home__mycourses-container">
    <div class="Home__mycourses-title">
      <h2>내 학습</h2>
      <span><i class="bi bi-chevron-right"></i></span>
    </div>
    <div class="courses__box">
      <div v-for="homeCourses in mycourses" :key="homeCourses" class="mc">
        <div>
          <img :src="homeCourses.image_url" alt="" class="courses__img" />
        </div>
        <div>
          {{ homeCourses.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BannerCarousel from "../components/carousel/BannerCarousel/Carousel.vue";
import HashCarousel from "../components/carousel/hashCarousel/HashCarousel.vue";
export default {
  components: { BannerCarousel, HashCarousel },
  computed: {
    ...mapState("addressStore", {
      slides: (state) => state.slides,
    }),
    ...mapState("getDataStore", {
      mycourses: (state) => state.mycourses,
    }),
  },
  mounted() {
    this.$store.commit("getDataStore/getMycourses");
  },
};
</script>
<style scoped>
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
.Home__mycourses-container {
  text-align: center;
  margin: 10px 165px;
}
.courses__box {
  display: flex;
  border: 1px solid;
  padding: 10px;
  overflow: hidden;
}
.courses__img {
  height: 140px;
}
.mc {
  display: flex;
  height: 300px;
}
</style>
