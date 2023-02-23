<template>
  <div id="box" v-for="lectureItem in data" :key="lectureItem">
    <img class="lecture__box-img" :src="lectureItem.image_url" />
    <h3 class="heading">{{ lectureItem.title }}</h3>
    <div class="data">
      <span class="date">₩ {{ lectureItem.price }} </span>
    </div>
    <p class="texts">
      {{ lectureItem.context }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  setup() {},
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    axios.get("/api/lecture/list").then((res) => {
      this.data = res.data.lectureList;
    });
  },
  methods: {
    innerLecture() {},
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
