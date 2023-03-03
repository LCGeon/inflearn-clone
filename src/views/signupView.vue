<template>
  <div class="sign__main">
    <h2>회원 가입</h2>
    <h3>인프런에서 가치를 높이세요</h3>

    <p class="sign__p-email">아이디</p>

    <input
      class="sign__input"
      type="text"
      placeholder="아이디"
      maxlength="32"
      v-model="signConst.account.email"
    />
    <p v-show="signup.email" class="input-error">
      이메일 형식이 올바르지 않습니다.
    </p>
    <p class="sign__p-pwd">비밀번호</p>
    <input
      class="sign__input-pwd"
      placeholder="비밀번호"
      :type="pwd"
      v-model="signConst.account.pwd"
    />

    <p class="sign__pwd-hint">
      <span id="sign__pwdCheck1" :class="{ pwdCheck1: passwordHasError }"
        >영문/숫자/특수문자 2가지 이상 포함</span
      >
      <br />
      <span id="sign__pwdCheck2">8자 이상 32자 이하 입력 (공백 제외)</span>
      <br />
      <span id="sign__pwdCheck3">연속 3자 이상 동일한 문자/숫자</span>
      제외
    </p>

    <div class="pwd__icon-pwd">
      <i
        class="bi-eye"
        id="pwd"
        v-if="pwdValue === true"
        @click="pwdShow()"
      ></i>
      <i
        class="bi-eye-slash"
        id="repwd"
        v-if="pwdValue === false"
        @click="pwdHide()"
      ></i>
    </div>

    <p class="sign__p-repwd">비밀번호 확인</p>
    <input
      class="sign__input"
      placeholder="비밀번호 확인"
      :type="pwd2"
      v-model="signup.pwdInputValueCheck"
    />
    <div class="pwd__icon">
      <i
        class="bi-eye"
        id="pwd2"
        v-if="pwdValue2 === true"
        @click="pwdShow2()"
      ></i>
      <i
        class="bi-eye-slash"
        id="repwd2"
        v-if="pwdValue2 === false"
        @click="pwdHide2()"
      ></i>
    </div>

    <p>
      <span
        class="sign__pwdCheck"
        v-if="signConst.account.pwd != signup.pwdInputValueCheck"
        >비밀번호가 일치하지 않습니다.</span
      >
    </p>
    <br />
    <div>
      <input
        type="radio"
        name="type"
        checked
        @change="typeChange($event)"
        value="1"
      />학생
      <input
        type="radio"
        name="type"
        @change="typeChange($event)"
        value="2"
      />강사
    </div>
    <br />
    <button class="sign__btn" @click="signups(), refresh()">가입하기</button>
    <p class="sign__agree">
      가입 시, 통합 계정으로 인프랩이 제공하는 서비스를 모두 이용하실 수
      있습니다. <br />통합 계정 및 서비스 이용약관 ( 인프런 / 랠릿 ),
      개인정보처리방침에 동의합니다.
    </p>
    <p class="sign__agree">
      <input type="checkbox" name="news" />
      통합회원 할인 혜택 및 유용한 채용 소식을 받아볼래요.
    </p>
    <p class="sign__agree">간편 회원가입</p>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "@vue/reactivity";

export default {
  setup() {
    const signConst = reactive({
      account: {
        email: "",
        pwd: "",
        type: 1,
      },
    });
    const signups = () => {
      const args = {
        signId: signConst.account.email,
        signPw: signConst.account.pwd,
        signType: signConst.account.type,
      };
      axios
        .post("/api/signup", args)
        .then((res) => {
          signConst.account = res.data;
          alert("회원가입이 정상적으로 완료되었습니다.");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return { signConst, signups };
  },

  data() {
    return {
      pwd: "password",
      pwd2: "password",
      pwdValue: true,
      pwdValue2: true,
      signup: {
        email: false,
        password: false,
        pwdInputValueCheck: "",
      },
      emailHasError: false,
      passwordHasError: false,
      pwdCheckFlag: false,
      email: "",
      password: "",
    };
  },
  watch: {
    email: function () {
      this.checkEmail();
    },
    password: function () {
      this.checkPassword();
    },
  },
  methods: {
    pwdHide() {
      this.pwd = "password";
      this.pwdValue = true;
    },
    pwdShow() {
      this.pwd = "";
      this.pwdValue = false;
    },
    pwdHide2() {
      this.pwd2 = "password";
      this.pwdValue2 = true;
    },
    pwdShow2() {
      this.pwd2 = "";
      this.pwdValue2 = false;
    },

    checkEmail() {
      // 이메일 형식 검사
      const validateEmail = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!validateEmail.test(this.signup.email) || !this.signup.email) {
        this.signup.email = true;
        this.emailHasError = true;
        return;
      }
      this.signup.email = false;
      this.emailHasError = false;
    },
    checkPassword() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;

      if (!validatePassword.test(this.password) || !this.password) {
        this.signup.password = true;
        this.passwordHasError = true;
        return;
      }
      this.signup.password = false;
      this.passwordHasError = false;
    },
    typeChange(event) {
      this.signConst.account.type = event.target.value;
    },
    refresh() {
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
.sign__main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
}
.sign__btn {
  margin-bottom: 10px;
  width: 300px;
  height: 45px;
  border-radius: 10px;
  border: none;
  background-color: #00c471;
  color: white;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}
.sign__agree {
  font-size: 10px;
}
.sign__input,
.sign__input-pwd {
  width: 300px;
  height: 45px;
  border-radius: 5px;
  border: 1px solid rgb(206, 205, 205);
  padding-left: 5px;
}
.sign__p-email {
  position: relative;
  right: 130px;
  font-size: 13px;
  font-weight: bold;
}
.sign__p-pwd {
  position: relative;
  right: 125px;
  font-size: 13px;
  font-weight: bold;
}
.sign__p-repwd {
  position: relative;
  right: 110px;
  font-size: 13px;
  font-weight: bold;
}
::placeholder {
  padding-left: 5px;
  color: rgb(184, 184, 184);
}

#pwd,
#repwd {
  position: absolute;
  left: 58%;
  top: 49.8%;
  font-size: 18px;
}
#pwd2,
#repwd2 {
  position: absolute;
  left: 58%;
  top: 61.8%;
  font-size: 18px;
}
.sign__pwd-hint {
  display: none;
  position: relative;
  font-size: 10px;
  right: 65px;
}
.sign__input-pwd:focus ~ .sign__pwd-hint {
  display: block;
}
.sign__input-pwd:focus ~ .pwd__icon-pwd {
  position: relative;
  left: 120px;
  bottom: 96px;
}
.sign__verify-pwd {
  padding: none;
}
.input-error {
  line-height: 16px;
  font-size: 8px;
  color: red;
}
.pwd__icon,
.pwd__icon-pwd {
  position: relative;
  left: 120px;
  bottom: 35px;
}
.sign__pwdCheck1 {
  color: #00c471;
}

#pwdCheck1 {
  color: red;
}
.sign__pwdCheck {
  position: relative;
  font-size: 10px;
  right: 77px;
  color: red;
  bottom: 17px;
}
</style>
