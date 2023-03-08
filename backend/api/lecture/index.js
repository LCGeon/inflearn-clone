const express = require('express');
const app = express();

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: 'db/main.db'
    },
    useNullAsDefault: true
});

app.post('/', async (req, res) => {
    const body = req.body;

    if (!body?.title && !body?.context && !body?.videoUrl && !body?.price) {
        return res.status(400).json({ message: '제대로 보내세오' });
    }

    const { title, context, videoUrl: video_url, price, imgUrl: image_url, user } = body;

    try {
        await knex('lecuture').insert({ title, context, video_url, price, image_url, user });
        res.status(200).json({ isUploaded: true });
    } catch (err) {
        res.status(500).json({ message: '통신 오류' });
    }

    // dbController.insertLecture(title, context, videoUrl, price)
    //     .then((_) => {
    //         res.status(200).json()
    //     })
    //     .catch((error) => {
    //         return res.status(500).json(error);
    //     });

});

app.get('/list', async (req, res) => {

    try {
        const lectureList = await knex('lecture').select('*');
        res.status(200).json({ lectureList });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = app;