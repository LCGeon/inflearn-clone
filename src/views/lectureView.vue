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
          <LectureList></LectureList>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import LectureList from "../components/lecture/LectureList.vue";
export default {
  components: { LectureList },
  computed: {
    ...mapState("addressStore", {
      lectureType: (state) => state.lectureType,
    }),
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
  cursor: pointer;
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
.bi-chevron-right {
  font-size: 14px;
}
</style>
