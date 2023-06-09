<template>
  <section>
    <div class="upload__container">
      <div class="upload__header">
        <div class="upload__title"><span>내 강의 만들기</span></div>
        <div>
          <button class="upload__watch">강의 보기</button>
          <button class="upload__save">저장</button>
        </div>
      </div>
      <div class="upload__main">
        <aside class="upload__aside">
          <div>
            <div><p>강의 제작</p></div>
            <div class="upload__lecture-craft">
              <div>
                <ul>
                  <li>강의 정보</li>
                  <li>상세소개</li>
                  <li>커리큘럼</li>
                  <li>커버 이미지</li>
                </ul>
              </div>
            </div>
            <div><p>설정</p></div>
            <div class="upload__lecture-craft">
              <div>
                <ul>
                  <li>강의 설정</li>
                  <li>지식공유자 설정</li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
        <div class="upload__lecture-main-view">
          <div class="upload__lecture-info" v-if="uploadPage === 1">
            <div class="upload__lecture-info-title">
              <p>강의 제작</p>
              <h1>강의 정보</h1>
            </div>
            <div>
              <p>강의 제목</p>
              <input type="text" class="upload__lecture-info-lecture-title" />
            </div>
            <div>
              <p>카테고리</p>
              <button
                v-for="(data, index) in type"
                :key="data"
                class="typeBtn"
                :class="{ typeActive: typeIndex === index }"
                @click="changeType(index)"
              >
                {{ data }}
              </button>
              <p v-show="typeIndex === null" class="warningMessage">
                카테고리를 선택해주세요.
              </p>
            </div>
            <div>
              <p>강의 수준</p>
              <button
                class="typeBtn"
                v-for="(item, index) in difficulty"
                :key="item"
                :class="{ typeActive: difficultyIndex === index }"
                @click="changeDifficulty(index)"
              >
                {{ item }}
              </button>
            </div>
            <p v-show="difficultyIndex === null" class="warningMessage">
              강의 난이도를 선택해주세요.
            </p>
            <div class="nextBtn">
              <button class="upload__lecture-info-nextBtn">
                저장 후 다음 이동
              </button>
            </div>
          </div>
          <div class="upload__detail-info" v-if="uploadPage === 2">
            <div class="upload__lecture-info-title">
              <p>강의 제작</p>
              <h1>상세 정보</h1>
            </div>
            <div>
              <p>
                강의 두줄 요약
                <span class="warningMessage"
                  >(해당 내용은 강의리스트와 강의소개 상단에 보여집니다.)</span
                >
              </p>
              <textarea class="detail-summary" />
            </div>
            <div>
              <p>
                강의 상세 내용
                <span class="warningMessage"
                  >(해당 내용은 강의 소개에서 보여집니다.)</span
                >
              </p>
              <textarea class="detail-input" />
            </div>
            <div class="nextBtn">
              <button class="upload__lecture-info-nextBtn">
                저장 후 다음 이동
              </button>
            </div>
          </div>

          <div class="upload__curriculum" v-if="uploadPage === 3">
            <div>
              <p>강의 제작</p>
              <p>커리큘럼</p>
            </div>
            <div class="upload__curriculum-btn">
              <div>
                <i class="bi bi-cloud-plus"></i
                ><button>여러 동영상 업로드 관리</button>
              </div>
              <div class="upload__curriculum-btn-add-section">
                <i class="bi bi-plus-circle"></i
                ><button @click="addSection">섹션 추가하기</button>
              </div>
            </div>
            <div
              class="upload__curriculum-section"
              v-for="(data, index) in section"
              :key="data"
            >
              <div class="upload__curriculum-section-title">
                <div>
                  <h3>섹션 {{ index }} : 제목을 입력해주세요.</h3>
                </div>
                <div class="curriculum-icon">
                  <span>
                    <i class="bi bi-plus-circle"></i
                    ><button>수업 추가하기</button></span
                  >
                  <span><i class="bi bi-pencil"></i></span>
                  <span @click="deleteSection">
                    <i class="bi bi-trash3"></i
                  ></span>
                </div>
              </div>
            </div>
          </div>

          <div class="upload__cover-image" v-if="uploadPage === 4">
            <div class="upload__lecture-info-title">
              <p>강의 제작</p>
              <h1>커버 이미지</h1>
            </div>
            <div class="upload__cover-image-notice">
              <h2>커버 이미지 - 썸네일및 홍보영상 등록</h2>
              <h5>
                강의 커버 이미지(썸네일)를 직접 제작하실 경우, 이미지 규정에
                맞춰주세요 <br />
                이미지가 규정에 맞지 않을 경우, 운영팀 판단하에 임의로 변경될 수
                있습니다. <br />
                홍보동영상 등록에 홍보동영상이나 강의 첫번째 영상(무료공개)을
                등록해주세요.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      section: ["1"],
      uploadPage: 4,
      typeIndex: null,
      difficultyIndex: null,
      difficulty: ["입문", "초급", "중급 이상"],
    };
  },
  methods: {
    addSection() {
      this.section.push("add");
    },
    deleteSection() {
      this.section.splice(1, 1);
    },
    changeType(index) {
      this.typeIndex = index;
    },
    changeDifficulty(index) {
      this.difficultyIndex = index;
    },
  },
  computed: {
    ...mapState("addressStore", {
      type: (state) => state.lectureType,
    }),
  },
};
</script>

<style scoped>
section {
  padding: 10px;
  background-color: rgb(235, 235, 235);
}
p {
  font-size: 13px;
  color: rgb(116, 116, 116);
}
textarea {
  resize: none;
}
.upload__container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.upload__header {
  padding: 8px;
  display: flex;
  justify-content: space-between;
  width: 85%;
  height: 4.4rem;
  color: white;
  background-color: rgb(80, 80, 80);
}
.upload__title {
  color: white;
  font-size: 22px;
  font-weight: 600;
  padding: 10px 0px 0px 25px;
}
.upload__watch,
.upload__save {
  width: 150px;
  height: 55px;
  border-radius: 7px;
  font-size: 16px;
  font-weight: 700;
}
.upload__watch {
  background: white;
  color: black;
  margin: 0px 5px 0px 0px;
}
.upload__save {
  background-color: rgb(8, 200, 88);
}

.upload__main {
  display: flex;
  width: 70%;
}
.upload__aside {
  width: 23%;
}
.upload__lecture-craft {
  display: flex;
}
.upload__lecture-main-view {
  margin: 10px;
  padding: 35px;
  background-color: white;
  width: 100%;
  display: flex;
  box-shadow: 3px 3px 3px 3px gray;
}
.upload__curriculum-btn {
  width: 100%;
  display: flex;
  color: rgb(117, 117, 117);
}

.upload__curriculum {
  width: 100%;
}
.upload__curriculum-btn-add-section {
  margin: 0px 0px 0px 10px;
}
.upload__curriculum-section {
  border: 1px solid rgb(8, 200, 88);
  display: flex;
  margin: 10px;
  padding: 10px;
}
.upload__curriculum-section-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.upload__lecture-info input {
  background-color: rgb(231, 231, 231);
  margin: 0px 0px 20px 0px;
  height: 35px;
}
.typeBtn {
  border: 1px solid rgb(221, 221, 221);
  margin: 5px;
  padding: 10px;
}
.upload__lecture-info-lecture-title {
  width: 45%;
}

.nextBtn {
  display: flex;
  justify-content: center;
}
.upload__lecture-info-nextBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 30px 0px 0px 0px;
  border: 1px solid rgb(214, 214, 214);
  padding: 10px;
  font-weight: 800;
}
.typeActive {
  background-color: rgb(8, 200, 88);
  color: white;
  font-weight: 700;
}
.warningMessage {
  color: red;
  font-size: 12px;
  margin: 0px 0px 20px 15px;
}
.upload__lecture-info-title {
  margin: 0px 0px 40px 0px;
}
.detail-summary {
  border: 1px solid gray;
  width: 650px;
  height: 80px;
  margin: 10px 0px 30px 0px;
}
.detail-input {
  border: 1px solid gray;
  width: 650px;
  height: 600px;
  margin: 10px 0px 30px 0px;
  vertical-align: top;
}
.upload__cover-image-notice {
  width: 100%;
  height: 400px;
  background-color: rgb(180, 180, 180);
}
.upload__cover-image {
  width: 100%;
}
</style>
