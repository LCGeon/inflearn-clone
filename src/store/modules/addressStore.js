const storage = "https://ifh.cc/g/";
const HashImg = "https://cdn.inflearn.com/public/curation/";
const HashLink = "https://www.inflearn.com/tag-curation/";

const addressStore = {
  namespaced: true,
  state: {
    userImg: "https://cdn.inflearn.com/public/main/profile/default_profile.png",
    slides: [
      `${storage}vLHOrD.jpg"`,
      `${storage}0O7WYH.jpg`,
      `${storage}7XodWv.jpg`,
      `${storage}jhaXN6.jpg`,
      `${storage}4LOBMG.jpg`,
      `${storage}syN1kv.jpg`,
      `${storage}8Brotq.jpg`,
      `${storage}AY4anQ.jpg`,
      `${storage}lQm66h.jpg`,
      `${storage}8HAqPj.jpg`,
    ],
    hashCarousel: [
      `${HashImg}byManage.png`,
      `${HashImg}_byMyself.png`,
      `${HashImg}spring.png`,
      `${HashImg}game.png`,
      `${HashImg}ux-ui.png`,
      `${HashImg}work-skills.png`,
      `${HashImg}dev-ops.png`,
      `${HashImg}front-end.png`,
      `${HashImg}python.png`,
      `${HashImg}marketing.png`,
      `${HashImg}mobile.png`,
      `${HashImg}excel.png`,
      `${HashImg}datascience.png`,
      `${HashImg}security.png`,
    ],
    hashCarouselTitle: [
      "관리형 부트캠프",
      "독학형 부트캠프",
      "스프링",
      "게임개발",
      "UX UI",
      "코딩테스트",
      "데브옵스",
      "프론트엔드",
      "파이썬",
      "마케팅",
      "모바일",
      "엑셀",
      "데이터",
      "보안",
    ],
    hashCarouselLink: [
      `${HashLink}common_tag/managed-bootcamp`,
      `${HashLink}common_tag/dc-bootcamp-2023`,
      `${HashLink}skill/66`,
      "",
      "",
      `${HashLink}skill/483`,
      `${HashLink}category/devops-infra`,
      `${HashLink}category/front-end`,
      `${HashLink}skill/57`,
      "",
      `${HashLink}category/mobile-app`,
    ],
    lectureType: [
      "개발 · 프로그래밍",
      "보안 · 네트워크",
      "데이터 사이언스",
      "게임 개발",
      "크리에이티브",
      "비즈니스 · 마케팅",
      "학문 · 외국어",
      "커리어",
      "자기 계발",
    ],
  },
};

export default addressStore;
