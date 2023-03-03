<template>
  <!-- 슬라이드 배너 -->
  <Carousel :slides="slides"></Carousel>
  <div class="Home__Writing">배우고, 나누고, 성장하세요</div>
  <div class="Home__Writing">
    <label>
      <input
        type="text"
        class="Home__search-Box"
        placeholder="배우고 싶은 지식을 입력해보세요."
      /><button class="Home__search-Btn">
        <i class="bi-search"></i>
      </button>
    </label>
  </div>
  <lectureList></lectureList>
</template>

<script>
import Carousel from "../components/carousel/Carousel.vue";
import lectureList from "../components/lecture/LectureList.vue";
export default {
  components: { Carousel, lectureList },
  data() {
    return {
      slides: [
        `${this.$store.state.urlConfig}vLHOrD.jpg"`,
        `${this.$store.state.urlConfig}0O7WYH.jpg`,
        `${this.$store.state.urlConfig}7XodWv.jpg`,
        `${this.$store.state.urlConfig}jhaXN6.jpg`,
        `${this.$store.state.urlConfig}4LOBMG.jpg`,
        `${this.$store.state.urlConfig}syN1kv.jpg`,
        `${this.$store.state.urlConfig}8Brotq.jpg`,
        `${this.$store.state.urlConfig}AY4anQ.jpg`,
        `${this.$store.state.urlConfig}lQm66h.jpg`,
        `${this.$store.state.urlConfig}8HAqPj.jpg`,
      ],
    };
  },
};
</script>
<style scoped>
.Home__Writing {
  display: flex;
  justify-content: center;
  font-size: 22px;
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
</style>
