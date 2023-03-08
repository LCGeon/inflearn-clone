<template>
  <div>
    {{ userLecture }}
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userLecture"]),
  },
};
</script>

<style></style>
