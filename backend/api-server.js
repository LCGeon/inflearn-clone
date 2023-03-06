const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbController = require("./dbController");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/account", (req, res) => {
  if (req.cookies && req.cookies.token) {
    jwt.verify(req.cookies.token, "abc1234", (err, decoded) => {
      if (err) {
        return res.send(401);
      }
      res.send(decoded);
    });
  } else {
    res.send(401);
  }
});

app.post("/api/account", (req, res) => {
  const body = req.body;
  const { loginId, loginPw } = body;

  dbController
    .getUserInfo(loginId, loginPw)
    .then((member) => {
      const options = {
        domain: "localhost",
        path: "/",
        httpOnly: true,
      };
      const token = jwt.sign(
        {
          id: member.id,
          name: member.name,
          type: member.type,
        },
        "abc1234",
        {
          expiresIn: "30m",
          issuer: "corjs",
        }
      );

      res.cookie("token", token, options);
      res.send(member);
    })
    .catch((error) => {
      console.log(error);
      res.status(401).json(error);
    });
});

app.post("/api/signup", (req, res) => {
  const body = req.body;
  const { signId, signPw, signType } = body;
  console.log(signType);
  dbController
    .insertUser(signId, signPw, signType)
    .then((_) => {
      res.send("회원가입 완료");
    })
    .catch((error) => {
      res.status(401).json(error);
    });
});

app.delete("/api/account", (req, res) => {
  if (req.cookies && req.cookies.token) {
    res.clearCookie("token");
  }
  res.sendStatus(200);
});

app.post("/api/lecture", (req, res) => {
  const body = req.body;
  console.log(body);
  if (
    !body?.title &&
    !body?.context &&
    !body?.videoUrl &&
    !body?.price &&
    !body?.user
  ) {
    return res.status(400).json({ message: "제대로 보내세오" });
  }

  const { title, context, videoUrl, price, imgUrl, user } = body;

  dbController
    .insertLecture(title, context, videoUrl, price, imgUrl, user)
    .then((_) => {
      res.status(200).json({ isUploaded: true });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json(error);
    });
});

app.get("/api/lecture/list", (req, res) => {
  dbController
    .getLectureList()
    .then((lectureList) => {
      res.status(200).json({ lectureList });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
