<template>
  <section>
    <div class="container">
      <div class="lecture__type_container">
        <div class="lecture__type">전체 강의</div>
        <div v-for="data in lectureType" :key="data" class="lecture__type">
          <div>{{ data }}</div>
          <div><i class="bi bi-chevron-right"></i></div>
        </div>
      </div>

      <div class="lecture">
        <header class="lecture__header">
          <p class="lecture__header_p">전체 강의</p>
          <div class="lecture__header_search">
            <input
              type="text"
              placeholder="전체 강의 검색"
              class="lecture__header_search_input"
            />
            <button class="lecture__header_search_btn">검색</button>
          </div>
        </header>
        <div class="lecture__box">
          <div
            id="box"
            v-for="(lectureItem, index) in lectureList"
            :key="lectureItem"
            @mouseover="hoverContext(index)"
            @mouseleave="hoverOut(index)"
          >
            <router-link :to="`/enrolment/${lectureItem.id}`">
              <div v-show="lectureContext === index" class="hover__context">
                <div class="context__title">{{ lectureItem.title }}</div>
                <br />
                <div>{{ lectureItem.context }}</div>
              </div>
              <div class="lecture__item">
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import StarRatings from "../common/StarRatings.vue";
export default {
  components: { StarRatings },
  computed: {
    ...mapState(["lectureList", "lectureContext", "lectureType"]),
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
section {
  padding: 10px 64px 64px 130px;
}
.container {
  display: flex;
  padding: 64px;
}
.lecture__type_container {
  width: 16%;
}
.lecture__type {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-left: 1px solid #e4e4e4;
  color: #595959;
  background: #fafafa;
  font-weight: 500;
  padding: 0.85rem;
  border-radius: 0;
  height: 65px;
}

.lecture {
  width: 80%;
}
.lecture__box {
  margin: 0;
  padding: 0px 0px 0px 16px;
}
.lecture__header {
  display: flex;
  justify-content: space-between;
  padding: 0px 32px 32px 24px;
}
.lecture__header_p {
  font-size: 20px;
  margin-left: 15px;
  font-weight: 800;
}
.lecture__header_search {
  border: 1px solid #c7c7c7;
  border-radius: 6px;
  height: 40px;
  font-size: 14px;
}
.lecture__header_search_input {
  border: 1px solid #c7c7c7;
  width: 222px;
  height: 100%;
}
.lecture__header_search_btn {
  background-color: #f1f3f5;
  font-weight: 800;
  width: 55px;
  height: 93%;
  font-size: 12px;
}
#box {
  display: inline-block;
  width: 244px;
  height: 331px;
  padding: 12px 8px;
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
  /* border: 1px solid; */
  cursor: pointer;
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
  background-color: #222222;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.85;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1;
  font-size: 15px;
}
.context__title {
  font-size: 18px;
  font-weight: 800;
}
.bi-chevron-right {
  font-size: 14px;
}
</style>
