<template>
  <aside class="mycourses__aside">
    <p>HOME</p>
    <ul>
      <li><a>대시보드</a></li>
      <li><a>프로필</a></li>
      <li><a>알림</a></li>
    </ul>
    <p>학습 관리</p>
    <ul>
      <li><a>내 학습</a></li>
      <li><a>강의 노트</a></li>
      <li><a>멘토링</a></li>
      <li><a>작성한 게시글</a></li>
      <li><a>수강전 문의</a></li>
    </ul>
    <p>수강신청 관리</p>
    <ul>
      <li><a>수강바구니</a></li>
      <li><a>좋아요</a></li>
      <li><a>쿠폰함</a></li>
      <li><a>포인트</a></li>
      <li><a>구매내역</a></li>
    </ul>
    <p>설정</p>
    <ul>
      <li><a>계정 정보</a></li>
      <li><a>알림 설정</a></li>
    </ul>
  </aside>
</template>

<script>
export default {};
</script>

<style scoped>
.mycourses__aside {
  width: 12%;
  padding: 1rem;
}
.mycourses__aside p {
  color: #cfcfcf;
  font-size: 0.8rem;
  padding: 0.5 rem;
}
.mycourses__aside li {
  padding: 10px 0px 10px 0px;
}
.mycourses__aside a {
  font-size: 14px;
}
</style>
