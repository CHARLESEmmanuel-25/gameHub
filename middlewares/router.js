
const express = require('express');
const loggerMiddleware = require('./loggerMiddlewares');


//const games = require('../data/games.json');

//const router = express.Router();

router.use(loggerMiddleware);