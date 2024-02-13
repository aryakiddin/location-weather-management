

const express = require('express');
const router = express.Router();
const { weatherController } = require('../controllers');
// const { cacheWeatherHistory } = require('../controllers/services/weatherService');

const {cacheWeatherHistory} = require('../middlewares/cacheMiddleware')

const customMiddleware = require("../middlewares/rateLimitMiddleware")

 router.get('/:id', cacheWeatherHistory, customMiddleware, weatherController.getWeatherHistory);
//enter number of days 7, 15 or 30 in query params parameter days to specify number of days in history

module.exports = router;
