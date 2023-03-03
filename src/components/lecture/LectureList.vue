<template>
  <div id="box" v-for="lectureItem in lectureList" :key="lectureItem">
    <router-link :to="`/enrolment/${lectureItem.id}`">
      <img class="lecture__box-img" :src="lectureItem.image_url" />
      <h3>{{ lectureItem.title }}</h3>
      <div>
        <span>₩ {{ lectureItem.price }} </span>
      </div>
      <p>
        {{ lectureItem.context }}
      </p>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["lectureList"]),
  },
  mounted() {
    this.$store.commit("getLectureList");
  },
};
</script>

<style scoped>
.lecture__list {
  margin: auto;
}
#box {
  display: inline-block;
  width: 300px;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid;
  cursor: pointer;
  margin: 30px;
}

#box:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  transform: translateY(-10px);
}
.lecture__box-img {
  width: 300px;
  height: 180px;
}
</style>
