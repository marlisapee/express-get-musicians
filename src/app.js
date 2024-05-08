const express = require('express');
const app = express();
const { Musician } = require('../models/index');
const { db } = require('../db/connection');
const musicianRouter = require('../routes/musician_router');

app.use(express.json());
app.use(express.urlencoded());

app.use('/routes/musician_router', musicianRouter);

//TODO: Create a GET /musicians route to return all musicians

module.exports = app;
