<template>
  <body>
    <div class="lds-facebook" v-if="loading">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </body>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
body {
  position: relative;
  width: 100%;
  height: 100%;
}
.lds-facebook {
  display: inline-block;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  background: rgba(11, 19, 30, 0.37);
  z-index: 11;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  background: #42b883;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  z-index: 11;
}
.lds-facebook div:nth-child(1) {
  left: 6px;
  animation-delay: -0.24s;
  margin-top: 24%;
  margin-left: 47%;
}
.lds-facebook div:nth-child(2) {
  left: 26px;
  animation-delay: -0.12s;
  margin-top: 24%;
  margin-left: 47%;
}
.lds-facebook div:nth-child(3) {
  left: 45px;
  animation-delay: 0;
  margin-top: 24%;
  margin-left: 47%;
}
@keyframes lds-facebook {
  0% {
    top: 6px;
    height: 51px;
  }
  50%,
  100% {
    top: 19px;
    height: 26px;
  }
}
</style>
