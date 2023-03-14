<template>
  <section>
    <div class="progress-container">
      <div class="progress-item" :class="{ 'header-none': uploadPage != 1 }">
        강의 정보
      </div>
      <div class="progress-item" :class="{ 'header-none': uploadPage != 2 }">
        썸네일
      </div>
      <div class="progress-item" :class="{ 'header-none': uploadPage != 3 }">
        강의 등록
      </div>
    </div>
    <div class="upload__container">
      <div v-show="uploadPage === 1">
        <h2>강의 정보</h2>
        <div class="upload__info">
          <div>
            <div class="upload__info-title">
              <i class="bi bi-pen"></i>
              <h3>강의 제목&nbsp;</h3>
              <input type="text" />
            </div>
            <div class="upload__info-type">
              <i class="bi bi-list-task"></i>
              <h3>강의 분류&nbsp;</h3>

              <select class="lecture__type">
                <option value="">강의 종류 선택</option>
                <option
                  v-for="data in this.$store.state.lectureType"
                  :key="data"
                >
                  {{ data }}
                </option>
              </select>
            </div>
            <div class="upload__info-price">
              <i class="bi bi-cash"></i>
              <h3>강의 가격&nbsp;</h3>
              <input type="text" />
            </div>
          </div>
          <div class="upload__info-context">
            <h3><i class="bi bi-file-earmark-text"></i>강의 설명</h3>
            <input type="text" />
          </div>
        </div>
      </div>

      <div class="upload__thumbnail" v-show="uploadPage === 2">
        <h2>썸네일</h2>
        <h3><i class="bi bi-card-image"></i>강의 썸네일 업로드</h3>
        <input
          type="file"
          accept="img/jpg,img/png,img/*"
          ref="imgInput"
          @change="previewImg()"
        />
        <h3><i class="bi bi-emoji-sunglasses"></i>썸네일 미리보기</h3>
        <img :src="selectImg" id="thumbnail" @error="ImageError" />
      </div>

      <div v-show="uploadPage === 3" class="upload__video">
        <h2>강의 등록</h2>
        <div class="upload__video-container">
          <div>
            <h3><i class="bi bi-file-earmark-play"></i>동영상 파일</h3>
            <input
              type="file"
              ref="fileInput"
              @change="previewVideo()"
              accept="video/mp4,video/mkv, video/x-m4v,video/*"
            />
          </div>
        </div>
        <div>
          <h3><i class="bi bi-camera-reels"></i>영상 미리보기</h3>
          <video
            class="upload__video-preview"
            :src="selectVideo"
            autoplay
            controls
            loop
          ></video>
        </div>
        <div>
          <div class="tit_lecture">
            <h3><i class="bi bi-pen"></i>강의 영상 제목</h3>
            <input
              class="upload__lecture-title"
              type="text"
              v-model="videoName"
              placeholder="영상 주제를 입력해주십시오."
              ref="lectureName"
            />
          </div>
        </div>
        <div><button class="upload__btn" @click="addVideo">추가</button></div>
        <div>
          <table class="upload__table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>길이</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(video, index) in videoList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ video.title }}</td>
                <td>{{ video.length }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <label
          >영상을 모두 추가한 후 등록 버튼을 눌러주세요. <br />
          영상은 최대 5개까지 업로드 가능합니다.</label
        >
        <button class="upload__btn" @click="uploadVideos">등록</button>
      </div>
    </div>
    <div class="upload__page-btn">
      <button
        class="prev-page"
        :class="{ none: uploadPage === 1 }"
        @click="prevPage"
      >
        이전 단계
      </button>
      <button
        class="next-page"
        @click="nextPage"
        :class="{ none: uploadPage === 3 }"
      >
        다음 단계
      </button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selectImg: "",
      selectVideo: "",
      videoList: [], // 영상 정보를 저장할 배열
      videoName: "",
      videoLength: [],
      uploadPage: 1,
    };
  },
  methods: {
    previewImg() {
      const file = this.$refs.imgInput.files[0];
      const imgUrl = URL.createObjectURL(file);
      this.selectImg = imgUrl;
    },
    previewVideo() {
      const file = this.$refs.fileInput.files[0];
      const videoUrl = URL.createObjectURL(file);
      this.selectVideo = videoUrl;
    },
    async uploadVideos() {
      const files = this.$refs.fileInput.files;
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        const video = this.videoList[i];
        formData.append(`video_${i}`, files[i]);
        formData.append(`video_${i}_title`, video.title);
      }
      try {
        await axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (err) {
        console.log(err);
        console.log(files, this.videoList);
      }
    },
    async addVideo() {
      const files = this.$refs.fileInput.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append(`video_${i}`, files[i]);
        const video = {
          title: this.videoName,
          length: "",
        };
        this.videoList.push(video);
      }
      for (let i = 0; i < this.videoList.length; i++) {
        try {
          const url = URL.createObjectURL(files[i]);
          const videoElement = document.createElement("video");
          videoElement.addEventListener("loadedmetadata", function () {
            this.videoList[i].length = videoElement.duration;
          });
          videoElement.setAttribute("src", url);
        } catch (err) {
          console.log(err);
        }
      }
      this.videoName = "";
      this.selectVideo = "";
      this.$refs.fileInput.value = "";
    },
    ImageError() {
      this.selectImg = require("../assets/thumbnail.png");
    },
    prevPage() {
      if (this.uploadPage > 1) {
        this.uploadPage--;
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    },
    nextPage() {
      if (this.uploadPage < 3) {
        this.uploadPage++;
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    },
  },
};
</script>
<style scoped>
section {
  padding: 30px 360px 40px;
}
h2 {
  color: rgb(2, 200, 88);
  font-size: 38px;
  margin-bottom: 50px;
  text-align: center;
}
label {
  font-size: 12px;
  color: rgb(255, 8, 8);
  margin: 0px 0px 10px 0px;
}
.bi {
  font-size: 29px;
  margin-right: 20px;
}
.progress-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  position: relative;
  margin: 30px 0px 100px 0px;
}

.progress-item {
  width: 100px;
  height: 100px;
  border: 1px solid white;
  border-radius: 50%;
  background-color: rgb(2, 200, 88);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  box-shadow: 3px 3px 3px 3px gray;
}

.progress-item:before {
  content: "";
  position: absolute;
  left: calc(50% - 1px);
  top: 50%;
  width: 50%;
  height: 3px;
  background-color: #59ee6f;
  z-index: -1;
}

.progress-item:first-child:before {
  left: 0;
}

.progress-item:last-child:before {
  right: 0;
}
.upload__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 10px;
  padding: 30px;
  margin: 0px 0px 40px 0px;
  box-shadow: 5px 5px 5px 5px gray;
}
.upload__video {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.upload__video-preview,
#thumbnail {
  width: 600px;
  height: 500px;
}
.upload__lecture-title {
  width: 360px;
  height: 40px;
  border: 1px solid;
  border-radius: 8px;
}
.upload__video-container {
  margin-bottom: 60px;
}
.upload__page-btn {
  display: flex;
  justify-content: space-evenly;
}
.prev-page,
.next-page {
  width: 75px;
  height: 50px;
  background-color: rgb(2, 200, 88);
  border: 1px solid;
  border-radius: 10px;
  color: white;
  font-size: 13px;
  font-weight: bold;
}
.none {
  display: none;
}
.header-none {
  background-color: white;
  color: black;
  border: 1px solid rgb(156, 156, 156);
  box-shadow: 1px 1px 1px 1px gray;
}
.upload__thumbnail,
.upload__thumbnail h2,
.upload__thumbnail h3,
bi {
  text-align: center;
  align-items: center;
  margin: 20px 0px;
}
.upload__btn {
  width: 100px;
  height: 45px;
  color: white;
  background-color: rgb(2, 200, 88);
  border-radius: 10px;
  border: none;
}

table {
  border: 1px #a39485 solid;
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 700px;
  height: 100px;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
  margin: 50px 0px;
}

th {
  text-align: left;
}

thead {
  font-weight: bold;
  font-size: 17px;
  color: #fff;
  background: rgb(2, 200, 88);
}

td,
th {
  padding: 1em 0.5em;
  vertical-align: middle;
}

td {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  font-size: 16px;
}
.tit_lecture {
  font-weight: bold;
  padding-bottom: 110px;
}
.upload__info-title,
.upload__info-type,
.upload__info-price {
  display: flex;
  padding-bottom: 50px;
}
.upload__info input,
.lecture__type {
  border: 1px solid;
  border-radius: 6px;
}
.upload__info-context {
  text-align: center;
}
.upload__info-context input {
  width: 500px;
  height: 500px;
}
.upload__info-title input {
  width: 350px;
}
.upload__info-price input {
  width: 110px;
}
</style>
