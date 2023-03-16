<template>
  <div class="hc">
    <ul class="hc__container">
      <li
        class="hc__li"
        v-for="(data, index) in hashCarousel.length"
        :key="data"
      >
        <section class="hc__section">
          <a class="hc__a">
            <img :src="hashCarousel[index]" alt="" class="hc__img" />
            <p class="hc__title">#{{ title[index] }}</p>
          </a>
        </section>
      </li>
    </ul>
    <button class="hc__button" @click="nextSlide">Next</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("addressStore", {
      hashCarousel: (state) => state.hashCarousel,
      title: (state) => state.hashCarouselTitle,
    }),
    methods: {
      nextSlide() {},
    },
  },
};
</script>

<style scoped>
.hc {
  position: relative;
  width: 100%;
  /* height: 150px; */
  margin: 0px 0px 0px 120px;
}
.hc__container {
  width: 80%;
  display: flex;
  overflow: hidden;
  transition: transform 0.3s ease-out;
}
.hc__li {
  margin: 20px 5px;
  flex-basis: 0;
}
.hc__section {
  text-align: center;
  width: 100px;
  height: 90px;
  cursor: pointer;
}

.hc__title {
  width: 104px;
  font-size: 13px;
  font-weight: 700;
}
.hc__img {
  width: 36px;
  height: 36px;
}
</style>
