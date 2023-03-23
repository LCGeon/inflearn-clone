<template>
  <div class="hc">
    <ul class="hc__container">
      <li
        class="hc__li"
        v-for="(data, index) in hashCarousel.length"
        :key="data"
      >
        <section class="hc__section">
          <a :href="link[index]">
            <img :src="hashCarousel[index]" alt="" class="hc__img" />
            <p class="hc__title">#{{ title[index] }}</p>
          </a>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("addressStore", {
      hashCarousel: (state) => state.hashCarousel,
      title: (state) => state.hashCarouselTitle,
      link: (state) => state.hashCarouselLink,
    }),
  },
};
</script>

<style scoped>
.hc {
  position: relative;
  width: 100%;
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
}
.hc__li:hover .hc__title {
  color: rgb(61, 170, 7);
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
a {
  cursor: pointer;
}
</style>
