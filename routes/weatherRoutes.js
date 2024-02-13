const express = require("express");
const router = express.Router();
const { weatherController } = require('../controllers');
const {cacheWeatherForecast} = require('../middlewares/cacheMiddleware')
const customMiddleware = require("../middlewares/rateLimitMiddleware")

router.get('/:id', cacheWeatherForecast, customMiddleware,  weatherController.getWeatherForecast);

module.exports = router;