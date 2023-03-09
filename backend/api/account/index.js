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

app.get('/', (req, res) => {
    if (!req.cookies || !req.cookies.token) {
        res.status(401);
    }

    try {
        const decoded = jwt.verify(req.cookies.token, jwtSecretKey);
        res.status(200).json(decoded);
    } catch (err) {
        return res.status(401);
    }

});

app.post('/', async (req, res) => {
    const body = req.body;
    const { loginId, loginPw } = body;

    try {
        const member = await knex('member')
            .select('*')
            .where({ id: loginId, password: loginPw })
            .first();

        if (!member) {
            return res.status(401).json({ message: '없는 회원입니다.' });
        }

        const options = {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
        };
        const token = jwt.sign(
            {
                id: member.id,
                name: member.name,
                type: member.type,
            },
            jwtSecretKey,
            {
                expiresIn: '30m',
                issuer: 'corjs',
            }
        );

        res.cookie('token', token, options);
        res.status(200).json(member)
    } catch (err) {
        res.status(500).json({ message: '통신 오류' });
    }
});

app.post('/signup', async (req, res) => {
    const body = req.body;
    const { signId, signPw, signType } = body;
    try {
        await knex('member').insert({ id: signId, password: signPw, type: signType });

        res.status(200).json({ isSignUp: true });
    } catch (err) {
        res.status(500).json({ message: '통신 오류' });
    }
});

app.delete('/', (req, res) => {
    if (req.cookies && req.cookies.token) {
        res.clearCookie('token');
    }

    res.sendStatus(200);
});

module.exports = app;