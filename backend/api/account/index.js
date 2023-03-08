const express = require('express');
const app = express();
const dbController = require("../../dbController");
const jwt = require("jsonwebtoken");

app.get("/", (req, res) => {
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

app.post("/", (req, res) => {
    const body = req.body;
    const { loginId, loginPw } = body;

    dbController
        .getUserInfo(loginId, loginPw)
        .then((member) => {
            // member.type = MEMBER_TYPE_MAP[member.type];
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

app.post("../signup", (req, res) => {
    const body = req.body;
    const { signId, signPw, signType } = body;
    dbController
        .insertUser(signId, signPw, signType)
        .then((_) => {
            res.send("회원가입 완료");
        })
        .catch((error) => {
            res.status(401).json(error);
        });
});

app.delete("/", (req, res) => {
    if (req.cookies && req.cookies.token) {
        res.clearCookie("token");
    }
    res.sendStatus(200);
});

module.exports = app;