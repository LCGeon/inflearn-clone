import axios from "axios";
const getDataStore = {
  namespaced: true,
  state: {
    mycourses: [],
    lectureList: [],
    enrolment: {},
  },
  mutations: {
    getLectureList(state) {
      axios.get("/api/lecture/list").then((res) => {
        state.lectureList = res.data.lectureList;
      });
    },

    getEnrolment(state, id) {
      axios.get(`/api/lecture?lectureId=${id}`).then((res) => {
        state.enrolment = res.data;
      });
    },
    getMycourses(state) {
      axios.get("/api/member/lecture/list").then((res) => {
        state.mycourses = res.data.memberLectureList;
      });
    },
  },
};

export default getDataStore;
