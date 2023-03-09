const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtSecretKey = process.env.jWT_SECRET_KEY || '';

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: 'db/main.db'
    },
    useNullAsDefault: true
});

app.get('/', async (req, res) => {
    const cookies = req.cookies;
    const token = cookies?.token;
    const query = req.query;
    let user = {};

    if (!query?.lectureId) {
        return res.status(400).json({ message: '제대로 보내세오' });
    }
    if (!token) {
        return res.status(401).json({ message: '로그인 해주세요.' });
    }

    const { lectureId } = query;

    try {
        user = jwt.verify(token, jwtSecretKey);
    } catch (err) {
        return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }

    try {
        const [lectureInfo, userLecture] = await Promise.all([
            knex('lecture').select('*').where({ id: lectureId }).first(),
            knex('student_courses').select('lecture_id').where({ lecture_id: lectureId, user_id: user.id }).first()
        ]);
        const isEnrolled = !!userLecture;

        res.status(200).json({ ...lectureInfo, isEnrolled });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/list', async (req, res) => {
    try {
        const lectureList = await knex('lecture').select('*');
        res.status(200).json({ lectureList });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post('/', async (req, res) => {
    const body = req.body;

    if (!body?.title || !body?.context || !body?.videoUrl || !body?.price) {
        return res.status(400).json({ message: '제대로 보내세오' });
    }

    const { title, context, videoUrl: video_url, price, imgUrl: image_url, user } = body;

    try {
        await knex('lecture').insert({ title, context, video_url, price, image_url, user });
        res.status(200).json({ isUploaded: true });
    } catch (err) {
        res.status(500).json({ message: '통신 오류' });
    }
});

app.post('/enrolment', async (req, res) => {
    const body = req.body;
    const cookies = req.cookies;
    const token = cookies?.token;
    let user = {};

    if (!token) {
        return res.status(401).json({ message: '로그인 해주세요.' });
    }

    if (!body?.lectureId) {
        return res.status(400).json({ message: '제대로 보내세오' });
    }

    try {
        user = jwt.verify(token, jwtSecretKey);
    } catch (err) {
        return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }

    const { lectureId } = body;

    try {
        await knex('student_courses').insert({ lecture_id: lectureId, user_id: user.id });
        res.status(200).json({ isEnrolled: true });
    } catch (err) {
        res.status(500).json({ message: '통신 오류' });
    }
});

module.exports = app;