<template>
  <section>
    <div class="header">내 학습</div>
    <div class="container">
      <AsideMenu></AsideMenu>
      <div class="mycourses__container">
        <div class="courses__nav">
          <div class="courses__sort">
            <div class="courses__sort-std">
              <label>정렬 기준</label>
              <select>
                <option value="">최근 공부</option>
                <option value="">최근 수강신청</option>
                <option value="">제목순</option>
              </select>
            </div>
            <div class="courses__sort-progress">
              <label>진행률</label
              ><select>
                <option value="">학습중</option>
                <option value="">완강</option>
                <option value="">모두 보기</option>
              </select>
            </div>
          </div>
          <div class="courses__nav-search">
            <input
              type="text"
              placeholder="강의명 또는 지식공유자 이름으로 검색"
            />
            <button>검색</button>
          </div>
        </div>
        <div class="courses__items">
          <div v-for="courses in mycourses" :key="courses" class="courses__box">
            <div>
              <img :src="courses.image_url" alt="" class="courses__img" />
            </div>
            <div style="display: flex">
              <div class="courses__title">
                {{ courses.title }}
              </div>
              <div class="courses__play"><i class="bi bi-play-circle"></i></div>
            </div>
            <div style="width: 100%">
              <progress
                class="courses__progress-bar"
                value="32"
                max="100"
                min="0"
              ></progress>
            </div>
            <div class="courses__span">
              <span>진행률 : 30% | 기한 : 무제한</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import AsideMenu from "../components/menu/AsideMenu.vue";
export default {
  components: { AsideMenu },
  computed: {
    ...mapState(["mycourses"]),
  },
  mounted() {
    this.$store.commit("getMycourses");
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
.container {
  display: flex;
  justify-content: center;
  padding: 1.5rem;
}
.header {
  background-color: #333b3d;
  color: white;
  font-size: 22px;
  height: 3.5rem;
  padding: 0.7rem 0px 0px 10.5rem;
}

.mycourses__container {
  width: 75%;
  padding: 16px 14px 14px 15px;
}
.courses__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 99%;
  height: 75px;
}
.courses__sort {
  display: flex;
}
.courses__sort-std,
.courses__sort-progress {
  display: flex;
  flex-direction: column;
  padding: 6px;
}
.courses__sort-std label,
.courses__sort-progress label {
  font-size: 13px;
  color: #929292;
  padding-bottom: 5px;
}

.courses__sort-std select,
.courses__sort-progress select {
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  font-size: 14px;
  width: auto;
  padding: 5px;
}
.courses__nav-search {
  width: 50%;
  height: 49%;
  display: flex;
}

.courses__nav-search input {
  width: 80%;
  border: 1px solid #f6f6f6;
  background-color: #f6f6f6;
  border-radius: 7px 0px 0px 7px;
  font-size: 13px;
  padding: 0px 0px 0px 12px;
}
.courses__nav button {
  width: 10%;
  background-color: #3298dc;
  color: white;
  font-size: 14px;
  font-weight: 300;
  border-radius: 0px 7px 7px 0px;
}
.courses__items {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
}
.courses__box {
  width: 340px;
  padding: 15px;
}
.courses__img {
  width: 311px;
  height: 202px;
}
.courses__title {
  display: block;
  font-size: 16px;
  font-weight: 700;
  width: 85%;
  height: 45px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
}
progress {
  -webkit-appearance: none;
  appearance: none;
}
progress::-webkit-progress-bar {
  background-color: rgb(197, 197, 197);
  border: 1px solid rgb(197, 197, 197);
}
progress::-webkit-progress-value {
  background-color: rgb(2, 200, 88);
}
.courses__progress-bar {
  width: 100%;
  height: 6px;
}
.courses__span {
  font-size: 11px;
  color: #9e9e9e;
}
.courses__play {
  font-size: 34px;
  color: rgb(2, 200, 88);
  padding: 5px;
}
</style>
