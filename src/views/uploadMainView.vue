<template>
  <div class="upload__main">
    <img src="../assets/inflearn.png" class="upload__logo" />
    <div class="upload__video">
      <h2 class="upload__sentence">
        <i class="bi bi-cloud-arrow-up"></i>강의 영상 업로드
      </h2>
      <input
        id="video_input"
        type="file"
        accept="video/mp4,video/mkv, video/x-m4v,video/*"
        ref="videoInput"
        @change="previewVideo()"
      />
      <h3><i class="bi bi-camera-reels"></i>영상 미리보기</h3>
      <video
        class="upload__video-preview"
        :src="selectVideo"
        autoplay
        controls
        loop
      ></video>
    </div>
    <div class="upload__thumbnail">
      <h2 class="upload__sentence">
        <i class="bi bi-card-image"></i>영상 썸네일 업로드
      </h2>
      <input
        type="file"
        accept="img/jpg,img/png,img/*"
        ref="imgInput"
        @change="previewImg()"
      />
      <h3><i class="bi bi-emoji-sunglasses"></i>썸네일 미리보기</h3>
      <img :src="selectImg" id="thumbnail" />
    </div>
    <div class="upload__info">
      <h3 class="upload__sentence">강의 제목</h3>
      <input
        type="text"
        class="upload__lecture-title"
        v-model="account.title"
      />
      <h3 class="upload__sentence"><i class="bi bi-coin"></i>가격</h3>
      <input type="text" v-model="account.price" /> <br />

      <h3 class="upload__sentence">강의 설명</h3>
      <textarea
        class="upload__lecture-description"
        wrap="on"
        rows="0"
        cols="10"
        v-model="account.detail"
      >
      </textarea>
      <br />
    </div>
    <LoadingSpinner :loading="loadingStatus"></LoadingSpinner>
    <button class="upload__btn" @click="uploadVideo()">업로드</button>
  </div>
</template>
<script>
import axios from "axios";
import { storage } from "../firebase";
import { mapState } from "vuex";
import LoadingSpinner from "../components/common/LoadingSpinner.vue";
export default {
  components: {
    LoadingSpinner,
  },
  computed: {
    ...mapState(["loadingStatus"]),
  },
  data() {
    return {
      lectureVideo: null,
      selectVideo: "",
      selectImg: "",
      account: {
        address: "",
        title: "",
        detail: "",
        price: "",
        img: "",
      },
      form: {
        VideoAddress: "",
        VideoTitle: "",
        VideoDetail: "",
        VideoPrice: "",
        imgThumbnail: "",
      },
    };
  },
  methods: {
    previewVideo() {
      const file = this.$refs.videoInput.files[0];
      const videoUrl = URL.createObjectURL(file);
      this.selectVideo = videoUrl;
    },
    previewImg() {
      const file = this.$refs.imgInput.files[0];
      const imgUrl = URL.createObjectURL(file);
      this.selectImg = imgUrl;
    },
    uploadVideo() {
      const file = this.$refs.videoInput.files[0];
      const fileImg = this.$refs.imgInput.files[0];
      const storageRef = storage.ref();
      const storageRoad = storageRef.child("video/" + file.name);
      const storageImgRoad = storageRef.child("img/" + fileImg.name);
      const upload = storageRoad.put(file);
      const uploadImg = storageImgRoad.put(fileImg);
      this.$store.state.loadingStatus = true;
      upload.on(
        "state_changed",

        null,

        (error) => {
          console.error(error);
        },

        () => {
          uploadImg.on(
            "state_changed",

            null,

            (error) => {
              console.error(error);
            },

            () => {
              Promise.all([
                upload.snapshot.ref.getDownloadURL(),
                uploadImg.snapshot.ref.getDownloadURL(),
              ]).then(([videoUrl, imgUrl]) => {
                const args = {
                  videoUrl,
                  imgUrl,
                  title: this.account.title,
                  context: this.account.detail,
                  price: this.account.price,
                };
                axios
                  .post("/api/lecture", args)
                  .then((res) => {
                    this.account = res.data;
                    alert("업로드에 성공하였습니다.");
                    this.$store.state.loadingStatus = false;
                    this.$router.replace("/");
                  })
                  .catch(() => {
                    alert("error");
                  });
              });
            }
          );
        }
      );
    },
  },
};
</script>
<style scoped>
.upload__video-preview,
#thumbnail {
  width: 700px;
  height: 350px;
}
.upload__main {
  text-align: center;
  border: 3px solid #00c471;
  border-top: none;
  border-bottom: none;
  border-radius: 50px;
  margin-left: 250px;
  margin-right: 250px;
}
.upload__logo {
  width: 100px;
  height: 30px;
}
.upload__lecture-description {
  width: 300px;
  height: 500px;
  border: 1px solid #333;
  overflow: scroll;
}
.upload__btn {
  width: 100px;
  height: 45px;
  color: white;
  background-color: rgb(2, 200, 88);
  border-radius: 10px;
  border: none;
}
.upload__thumbnail,
.upload__video,
.upload__info {
  padding-top: 50px;
  margin-left: 100px;
  margin-top: 40px;
  padding-bottom: 35px;
  margin-bottom: 20px;
  border: 3px solid #06c435;
  border-radius: 50px;
  border-width: 30%;
  width: 80%;
}
.upload__sentence {
  color: #00c471;
}
.bi-cloud-arrow-up,
.bi-card-image {
  position: relative;
  top: 5px;
  color: black;
  font-size: 40px;
  padding-right: 10px;
}
.bi-camera-reels,
.bi-emoji-sunglasses {
  font-size: 30px;
  padding-right: 10px;
}
.bi-coin {
  color: black;
  font-size: 22px;
  padding-right: 10px;
}
</style>
