<template>
  <button class="carousel-control left" @click="$emit('prev')">〈</button>
  <button class="carousel-control right" @click="$emit('next')">〉</button>
</template>

<script>
export default {
  emits: ['prev', 'next']
}
</script>

<style scoped>
.carousel-control {
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  /* display: inline-block; */
  position: relative;
  height: 50px;
  width: 70px;
  /* top: calc(50%); */
  top: 250px;
  color: #f3f3f3;
  cursor: pointer;
}

.left {
  left: 0;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.right {
  right: 0;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
>
