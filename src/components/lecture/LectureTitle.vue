<template>
  <div class="title">
    <div>
      <img :src="enrolment.image_url" class="img" />
    </div>
    <div class="lecture">
      <div class="lecture-title">{{ enrolment.title }}</div>
      <div class="star-ratings">
        <StarRatings></StarRatings>
        <span class="star-ratings-number">(5.0)</span>
      </div>
      <div class="lecture-master">
        <i class="bi bi-person"></i> <span> {{ enrolment.user }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import StarRatings from "../common/StarRatings.vue";
export default {
  components: { StarRatings },
  computed: {
    ...mapState("getDataStore", {
      enrolment: (state) => state.enrolment,
    }),
  },
  mounted() {
    this.$store.commit("getDataStore/getEnrolment", this.$route.params.id);
  },
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: #002333;
  height: 400px;
}
.img {
  width: 450px;
  height: 300px;
  border: 1px solid;
  border-radius: 10px;
  margin: 0px 30px 0px 0px;
}
.lecture-title {
  color: #fff;
  font-weight: 600;
  font-size: 26px;
  margin-bottom: 10px;
  width: 500px;
}
.lecture-master {
  margin-bottom: 10px;
  color: white;
}
.star-ratings {
  margin: 30px 0px 0px 0px;
}
.star-ratings-number {
  color: white;
  margin-left: 83px;
}
.bi-person {
  font-size: 19px;
}
</style>
