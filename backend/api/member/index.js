const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: 'db/main.db'
    },
    useNullAsDefault: true
});

dotenv.config();

const jwtSecretKey = process.env.jWT_SECRET_KEY || '';


app.get('/lecture/list', async (req, res) => {
    const cookies = req.cookies;
    const token = cookies?.token;
    let user = {};

    if (!token) {
        return res.status(401).json({ message: '로그인 해주세요.' });
    }

    try {
        user = jwt.verify(token, jwtSecretKey);
    } catch (err) {
        return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }

    try {
        const memberLectureList = await knex('student_courses')
            .select('id', 'user', 'title', 'context')
            .leftJoin('lecture', 'student_courses.lecture_id', 'lecture.id')
            .where({ user_id: user.id })
        res.status(200).json({ memberLectureList });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = app;