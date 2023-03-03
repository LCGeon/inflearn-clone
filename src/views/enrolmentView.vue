<template>
  <body>
    <div class="title">
      <div class="title-container">
        <div><img :src="enrolment.image_url" class="img" /></div>
        <div class="lecture-title">
          <span>{{ enrolment.title }}</span>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["enrolment"]),
  },
  mounted() {
    this.$store.commit("getEnrolment", this.$route.params.id);
    // this.$store.commit("loginCheck");
  },
};
</script>

<style scoped>
body {
  text-align: center;
}
.title {
  display: flex;
  justify-content: center;
  background-color: #002333;
}
/* .title-container {
  display: inline-block;
} */

.img {
  width: 500px;
  height: 280px;
  padding: 40px;
}
.lecture-title {
  color: #fff;
  font-weight: 700;
  font-size: 26px;
}
</style>
