const express = require('express');
const conn = require('./db/conn/conn');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const app = express();
app.use(express.json());
require('dotenv').config();

app.use(cors())
app.use(express.urlencoded({ extended: false }));

app.listen(3042, () => {
    console.log('Server is running on http://localhost:3042');
  });
  