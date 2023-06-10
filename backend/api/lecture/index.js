const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const utils = require('../../utils');
const dotenv = require('dotenv');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const firebase = require('firebase/app');
const firebaseStorage = require('firebase/storage');
const firebaseConfig = require('../../../firebaseConfig.js');
const firebaseApp = firebase.initializeApp(firebaseConfig);

dotenv.config();

const jwtSecretKey = process.env.jWT_SECRET_KEY || '';

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: 'db/main.db'
    },
    useNullAsDefault: true
});
const defaultStorage = firebaseStorage.getStorage(firebaseApp);

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

app.post('/', upload.fields([
        { name: 'img', maxCount: 1 },
    ]), async (req, res) => {
    const fields = req.files;
    const body = JSON.parse(JSON.stringify(req.body));

    if (!utils.checkRequiredProperties(['title',
                                        'category',
                                        'level',
                                        'context',
                                        'price'
                                    ], body)) {
        return res.status(400).json({ message: '제대로 보내세오' });
    }

    const { title, 
        context, 
        price, 
        category : category_id, 
        level : level_id
    } = body;

    try {
        const uploadPromises = Object.values(fields).map(async files => {
            const result = await Promise.all(files.map(async file => {
                const uploadRef = firebaseStorage.ref(defaultStorage, file.originalname);
                await firebaseStorage.uploadBytes(uploadRef, file.buffer);
                const downloadUrl = await firebaseStorage.getDownloadURL(uploadRef);
                return { fieldName : file.fieldname, originalname: file.originalname, downloadUrl };
            }));
            return result;
        });

        const uploadResults = await Promise.all(uploadPromises);

        const uploadUrls = uploadResults.reduce((uploadUrls,results) => {
            const [first] = results;
            uploadUrls[first.fieldName] ??= [];
            results.forEach(result => uploadUrls[first.fieldName].push(result.downloadUrl));
            return uploadUrls;
        },{});

        await knex('lecture').insert({ title, context, level_id, price, category_id, user : 'test', image_url : uploadUrls.img[0] });
        res.status(200).json({ isUploaded: true });
    } catch (err) {
        console.log(err);
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