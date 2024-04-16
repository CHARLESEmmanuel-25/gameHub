// Le role du routeur sera de rediriger vers le bon controlleur
const express = require('express');
const loggerMiddleware = require('../middlewares/loggerMiddlewares');
const mainController = require('./controller/mainController');


const router = express.Router();

router.get('/', mainController.home);
router.get('/game/:name', mainController.game);

router.use(loggerMiddleware);


module.exports = router;