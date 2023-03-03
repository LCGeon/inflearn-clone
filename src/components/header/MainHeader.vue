<template>
  <HeaderMenu></HeaderMenu>
  <HeaderBtn></HeaderBtn>
</template>

<script>
import HeaderBtn from "../header/HeaderBtn.vue";
import HeaderMenu from "../header/HeaderMenu.vue";
export default {
  components: { HeaderBtn, HeaderMenu },
};
</script>

<style>
.header__icon-play,
.header__icon-cart,
.header__icon-user {
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 100%;
  width: 30px;
}
.header__icon-cart {
  padding-left: 15px;
}
.header__icon-user {
  top: 1px;
  padding-left: 30px;
}
.header__login-btn {
  position: relative;
  background-color: white;
  border-style: 1px solid;
  cursor: pointer;
  top: 5px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid;
  border-color: #5f5f5f;
  left: 20px;
  width: 65px;
}

.header__sign-btn {
  position: relative;
  background-color: white;
  border-style: 1px solid;
  cursor: pointer;
  top: 5px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid;
  border-color: #5f5f5f;
  left: 35px;
  width: 70px;
  background-color: rgb(239, 140, 118);
  color: white;
}

.header__Ul {
  display: flex;
  position: relative;
  top: 10px;
}
.header__Ul li {
  padding: 5px 25px;
  padding-left: 0;
}

.header__lecture-Ul,
.header__community-ul,
.header__inf-ul {
  display: none;
  position: absolute;
  z-index: 1;
  transform: translate(-30%, 2%);
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}
.header__inf-ul {
  width: 140px;
  height: 130px;
}

.header__community-ul a,
.header__inf-ul a {
  cursor: pointer;
}
.header__lecture-Ul a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  cursor: pointer;
}

.header__Li:hover .header__lecture-Ul,
.header__community:hover .header__community-ul,
.header__inf:hover .header__inf-ul {
  display: block;
}
.header__search-box {
  position: relative;
  left: 235px;
  top: 5px;
  width: 140px;
  height: 30px;
  border-radius: 3px;
  box-shadow: none;
  background: #f6f6f6;
  color: #5f5f5f;
  border: 1px solid transparent;
}
.header__search-box:focus {
  border-color: green;
}
.header__search-Btn {
  position: relative;
  top: 5px;
  left: 235px;
  margin-left: -30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.bi-play {
  top: 3px;
  width: 40px;
}
.header__dash-bord {
  position: relative;
  background-color: white;
  border: 1px solid;
  border-radius: 10px;
  top: 5px;
  left: 120px;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
}
</style>
