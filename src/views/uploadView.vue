<template>
  <section>
    <div class="upload__container">
      <div class="upload__header">
        <div class="upload__title"><span>내 강의 만들기</span></div>
        <div>
          <button class="upload__watch">강의 보기</button>
          <button class="upload__save" @click="submit">제출하기</button>
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
              <button class="upload__lecture-info-Btn" @click="NextPage">
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
              <button class="upload__lecture-info-Btn" @click="PrevPage">
                이전
              </button>
              <button class="upload__lecture-info-Btn" @click="NextPage">
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
              v-for="(sectionData, sectionIndex) in section"
              :key="sectionIndex"
            >
              <div class="upload__curriculum-section-title">
                <div class="upload__curriculum-section-title-menu">
                  <div>
                    <h3>
                      섹션 {{ sectionIndex + 1 }} :
                      <input
                        type="text"
                        onfocus="this.value =''"
                        v-model="sectionData.title"
                        placeholder="제목을 입력해주세요."
                      />
                    </h3>
                  </div>
                  <div class="curriculum-icon">
                    <span>
                      <i class="bi bi-plus-circle"></i
                      ><button @click="addLesson(sectionIndex)">
                        수업 추가하기
                      </button></span
                    >
                    <span><i class="bi bi-pencil"></i></span>
                    <span @click="deleteSection">
                      <i class="bi bi-trash3"></i
                    ></span>
                  </div>
                </div>
                <div
                  v-for="(lessonData, lessonIndex) in sectionData.lessons"
                  :key="lessonIndex"
                  class="lesson"
                >
                  <input
                    type="text"
                    onfocus="this.value =''"
                    v-model="lessonData.title"
                    placeholder="수업 제목"
                  />
                  <label>파일 제목</label>
                  <label
                    @click="addLessonVideo"
                    for="file"
                    @change="uploadVideo($event, sectionIndex, lessonIndex)"
                    class="fileLabel"
                    ><i class="bi bi-plus-circle-dotted"></i>영상 추가
                    <input type="file" id="file"
                  /></label>
                </div>
              </div>
              <!-- <button @click="asdasd">sadsadasd</button> -->
            </div>
            <div class="nextBtn">
              <button class="upload__lecture-info-Btn" @click="PrevPage">
                이전
              </button>
              <button class="upload__lecture-info-Btn" @click="NextPage">
                저장 후 다음 이동
              </button>
            </div>
          </div>

          <div class="upload__cover-image" v-if="uploadPage === 4">
            <div class="upload__lecture-info-title">
              <p>강의 제작</p>
              <h1>커버 이미지</h1>
            </div>
            <div class="upload__cover-image-notice">
              <h2>커버 이미지 - 썸네일 및 홍보영상 등록</h2>
              <h5>
                강의 커버 이미지(썸네일)를 직접 제작하실 경우, 이미지 규정에
                맞춰주세요 <br />
                이미지가 규정에 맞지 않을 경우, 운영팀 판단하에 임의로 변경될 수
                있습니다. <br />
                홍보동영상 등록에 홍보동영상이나 강의 첫번째 영상(무료공개)을
                등록해주세요.
              </h5>
            </div>
            <div class="upload__cover-image-h">
              <img
                :src="selectImg"
                ref="thumbnail"
                class="thumbnail_img"
                @error="ImageError"
              />
              <div>
                <p>강의를 대표하는 이미지</p>
                <p>이미지 크기 : 768 x 500(px), 확장자:jpg,jpeg,png</p>
                <p>이미지에 한글을 포함할 수 없습니다.</p>
                <input
                  type="file"
                  accept="img/jpg,img/png,img/*"
                  ref="imgInput"
                  @change="previewImg()"
                />
              </div>
            </div>
            <div class="nextBtn">
              <button class="upload__lecture-info-Btn" @click="PrevPage">
                이전
              </button>
              <button class="upload__lecture-info-Btn" @click="NextPage">
                저장 후 다음 이동
              </button>
            </div>
          </div>
          <div class="upload__setting" v-if="uploadPage === 5">
            <div class="upload__lecture-info-title">
              <p>설정</p>
              <h1>강의 설정</h1>
            </div>
            <div class="upload__setting-notice">
              <h3>강의 설정 - 가격 및 수강 기한</h3>
              <h5>
                설정해 주신 강의 가격은 부가세 미포함 가격입니다.<br />
                수강 기한에 제한을 두실 경우 반드시 개월 단위로 표시해주세요.
              </h5>
              <h3><br />강의 계약정보 체크</h3>
              <h5>
                유료 강의의 경우, 체크해주신 계약정보 동의 여부에 따라 계약서가
                발송됩니다.<br />
                오픈 전, 계약정보 수정을 원하시면 인프런 운영팀으로 문의 주세요.
              </h5>
            </div>
            <div class="upload__setting-price">
              <p>가격 설정</p>
              \<input type="text" class="input-price" />
              <p>
                1.가격 설정 후 제출하신 후에는, 가격 변경이 되지 않아요! 바꾸고
                싶은 경우에는 운영팀에 문의해주세요 :)
              </p>
              <p style="color: red">
                2.입력하신 가격은 부가세 미포함 가격입니다. 실제 수강생에게는
                부가세 10% 합산된 가격으로 보입니다.
              </p>
              <p>
                3.가격은 무료인 경우 0원으로, 유료인 경우 10,000원 이상 1,000원
                단위로 설정할 수 있습니다.
              </p>
            </div>
            <div class="nextBtn">
              <button class="upload__lecture-info-Btn" @click="PrevPage">
                이전
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      selectImg: "",
      section: [{ title: "제목을 입력해주세요.", lessons: [] }],
      uploadPage: 3,
      typeIndex: null,
      difficultyIndex: null,
      difficulty: ["입문", "초급", "중급 이상"],
      title: "sad",
      context: "asd",
      level: "1",
      category: "1",
      price: "9999",
    };
  },
  methods: {
    previewImg() {
      const file = this.$refs.imgInput.files[0];
      const imgUrl = URL.createObjectURL(file);
      this.selectImg = imgUrl;
    },
    ImageError() {
      this.selectImg = require("../assets/thumbnail.png");
    },
    addSection() {
      if (this.section.length < 5) {
        this.section.push({ title: "제목을 입력해주세요.", lessons: [] });
      } else {
        alert("섹션은 최대 5개까지 가능합니다.");
      }
    },
    deleteSection(sectionIndex) {
      this.section.splice(sectionIndex, 1);
    },
    addLesson(sectionIndex) {
      const section = this.section[sectionIndex];
      if (section.lessons.length < 5) {
        section.lessons.push({
          title: "수업 제목",
          editing: false,
          videos: [],
        });
      } else {
        alert("수업은 최대 5개까지 가능합니다.");
      }
    },
    uploadVideo(event, sectionIndex, lessonIndex) {
      const file = event.target.files[0];
      const videoUrl = URL.createObjectURL(file);
      this.section[sectionIndex].lessons[lessonIndex].videos.push(videoUrl);
    },
    changeLessonTitle(lessonData) {
      lessonData.editing = !lessonData.editing;
    },
    changeType(index) {
      this.typeIndex = index;
    },
    changeDifficulty(index) {
      this.difficultyIndex = index;
    },
    NextPage() {
      this.uploadPage++;
    },
    PrevPage() {
      this.uploadPage--;
    },
    asdasd() {
      console.log(this.section);
    },

    submit() {
      const formData = new FormData();
      console.log(this.$refs.imgInput.files[0]);

      // 이미지 파일 추가
      formData.append("img", this.$refs.imgInput.files[0]);

      // 텍스트 데이터 추가
      formData.append("title", this.title);
      formData.append("context", this.context);
      formData.append("level", this.level);
      formData.append("category", this.category);
      formData.append("price", this.price);

      // FormData를 서버로 전송하는 HTTP 요청을 보낼 수 있습니다.
      // 예를 들어 axios를 사용하는 경우:
      axios
        .post("/api/lecture", formData)
        .then((response) => {
          // 요청 성공 시 처리
          console.log(response);
        })
        .catch((error) => {
          // 요청 실패 시 처리
          console.error(error);
        });
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
.bi {
  padding: 0px 3px 0px 3px;
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
  padding: 25px 40px 40px 90px;
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
}
.upload__curriculum-section-title-menu {
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
.upload__lecture-info-Btn {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 30px 6px 0px 0px;
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
  text-align: center;
  width: 100%;
  height: 200px;
  background-color: rgb(237, 237, 237);
}
.upload__setting-notice {
  text-align: left;
  width: 100%;
  height: 200px;
  background-color: rgb(237, 237, 237);
}
.upload__cover-image {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.thumbnail_img {
  width: 40%;
  height: 200px;
  margin: 0px 25px 0px 0px;
}
.upload__cover-image-h {
  display: flex;
  padding: 10px;
  margin: 15px 0px 0px 0px;
}
.upload__setting {
  width: 100%;
  margin: 0px 40px 0px 0px;
}
.input-price {
  border-bottom: 1px solid;
  width: 260px;
  height: 40px;
  text-align: right;
  padding: 5px;
}
.upload__setting-price {
  margin: 40px 0px;
}
.lesson {
  display: flex;
  justify-content: space-between;
}
.fileLabel {
  cursor: pointer;
}
.lesson input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
</style>
