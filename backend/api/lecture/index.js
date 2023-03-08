const express = require('express');
const app = express();
const dbController = require("../../dbController");

app.post('/', (req, res) => {
    const body = req.body;

    if (!body?.title && !body?.context && !body?.videoUrl && !body?.price) {
        return res.status(400).json({ message: '제대로 보내세오' });
    }

    const { title, context, videoUrl, price } = body;

    dbController.insertLecture(title, context, videoUrl, price)
        .then((_) => {
            res.status(200).json({ isUploaded: true })
        })
        .catch((error) => {
            return res.status(500).json(error);
        });

});

app.get('/list', (req, res) => {
    dbController.getLectureList()
        .then((lectureList) => {
            res.status(200).json({ lectureList });
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

module.exports = app;