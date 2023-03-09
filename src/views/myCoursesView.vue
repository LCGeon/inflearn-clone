<template>
  <div>
    {{ mycourses }}
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["mycourses"]),
  },
  mounted() {
    this.$store.commit("getMycourses");
  },
};
</script>

<style></style>
