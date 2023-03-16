<template>
  <div class="carousel">
    <div class="carousel-inner">
      <carousel-mark
        :total="slides.length"
        :current-index="currentSlide"
        @switch="switchSlide($event)"
      ></carousel-mark>
      <carousel-item
        v-for="(slide, index) in slides"
        :slide="slide"
        :key="`item-${index}`"
        :current-slide="currentSlide"
        :index="index"
        :direction="direction"
        @mouseEnter="stopSlideTimer()"
        @mouseOut="startTimer()"
      ></carousel-item>
      <carousel-control @prev="prev" @next="next"></carousel-control>
    </div>
  </div>
</template>

<script>
import CarouselItem from "./CarouselItem.vue";
import CarouselControl from "./CarouselControl.vue";
import CarouselMark from "./CarouselMark.vue";

export default {
  props: ["slides"],
  components: { CarouselItem, CarouselMark, CarouselControl },
  data() {
    return {
      currentSlide: 0,
      slideInterval: null,
      direction: "right",
    };
  },
  methods: {
    setCurrentSlide(index) {
      this.currentSlide = index;
    },
    prev(step = -1) {
      // 이전 버튼
      const index =
        this.currentSlide > 0
          ? this.currentSlide + step
          : this.slides.length - 1;
      this.setCurrentSlide(index);
      this.direction = "left";
      this.StartTimer();
    },
    _next(step = 1) {
      // 다음 버튼
      const index =
        this.currentSlide < this.slides.length - 1
          ? this.currentSlide + step
          : 0;
      this.setCurrentSlide(index);
      this.direction = "right";
    },
    next(step = 1) {
      this._next(step);
      this.startTimer();
    },
    startTimer() {
      this.stopSlideTimer();
      this.slideInterval = setInterval(() => {
        this._next();
      }, 5000);
    },
    switchSlide(index) {
      const step = index - this.currentSlide;
      if (step > 0) {
        this.next(step);
      } else {
        this.prev(step);
      }
    },
    stopSlideTimer() {
      clearInterval(this.slideInterval);
    },
  },
  mounted() {
    this.startTimer();
  },

  beforeUnmount() {
    this.stopSlideTimer();
  },
};
</script>

<style scoped>
.carousel {
  display: flex;
  justify-content: center;
  padding-bottom: 75px;
}
.carousel-inner {
  position: relative;
  width: 2000px;
  height: 300px;
  overflow: hidden;
}
</style>
>
