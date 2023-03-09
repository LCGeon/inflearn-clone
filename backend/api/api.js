const express = require('express');
const app = express();

const apiAccount = require('./account/index');
app.use('/account', apiAccount);

const apiLecture = require('./lecture/index');
app.use('/lecture', apiLecture);

const apiMember = require('./member/index');
app.use('/member', apiMember);

module.exports = app;