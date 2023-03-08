const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(cookieParser());

const API = require('./api/api');
app.use('/api', API);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
