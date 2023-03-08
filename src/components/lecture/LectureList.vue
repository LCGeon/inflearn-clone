<template>
  <div
    id="box"
    v-for="(lectureItem, index) in lectureList"
    :key="lectureItem"
    @mouseover="hoverContext(index)"
    @mouseleave="hoverOut(index)"
  >
    <router-link :to="`/enrolment/${lectureItem.id}`">
      <div v-if="lectureContext === index" class="hover__context">
        {{ lectureItem.context }}
      </div>
      <div class="lecture__item" v-else>
        <div>
          <img class="lecture__box-img" :src="lectureItem.image_url" />
        </div>
        <div>
          <h3 class="lecture__title">{{ lectureItem.title }}</h3>
        </div>
        <div class="lecture__user">{{ lectureItem.user }}</div>
        <div>
          <StarRatings></StarRatings>
          <span class="star-ratings-number">(5.0)</span>
        </div>
        <div class="lecture__price">
          <span>₩{{ lectureItem.price }} </span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
import StarRatings from "../common/StarRatings.vue";

export default {
  components: { StarRatings },
  computed: {
    ...mapState(["lectureList", "lectureContext"]),
  },
  mounted() {
    this.$store.commit("getLectureList");
  },
  methods: {
    hoverContext(index) {
      this.$store.commit("setHoveredBox", index);
    },
    hoverOut(index) {
      if (this.lectureContext === index) {
        this.$store.commit("setHoveredBox", null);
      }
    },
  },
};
</script>

<style scoped>
#box {
  display: inline-block;
  width: 234px;
  height: 331px;
  border-radius: 8px;
  overflow: hidden;
  /* border: 1px solid; */
  cursor: pointer;
  margin: 30px;
}

#box:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  transform: translateY(-10px);
}
.lecture__box-img {
  width: 232px;
  height: 162px;
}
.lecture__title {
  display: block;
  font-size: 1.2rem;
  height: 62px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
}
.lecture__user {
  color: #7d7d7d;
  font-size: 0.9rem;
}
.lecture__price {
  font-size: 19.5px;
  font-weight: 700;
  color: #175cbe;
}
.star-ratings-number {
  font-size: 10px;
  margin-left: 78px;
}
.hover__context {
  position: absolute;
  background-color: #454545;
  color: white;
  width: 100%;
  height: 100%;
}
/* .context {
  display: none;
} */
</style>
