export default {
  personModal(state) {
    state.isPersonModal = true;
  },
  personModalOut(state) {
    state.isPersonModal = false;
  },
  setHoveredBox(state, lectureItem) {
    state.lectureContext = lectureItem;
  },
};
