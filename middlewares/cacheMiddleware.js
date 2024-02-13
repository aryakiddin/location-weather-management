const NodeCache = require('node-cache');
//const weatherCache = new NodeCache();
const {weatherCache} = require('../controllers/utils/weatherCache');

const cacheWeatherForecast = (req, res, next) => {
    const { id } = req.params;
    const cacheKey = `weather_forecast_${id}`;
  
    // Check if weather forecast data for the location is already cached
    const cachedData = weatherCache.get(cacheKey);
    if (cachedData) {
      // Return cached weather forecast data if available
      return res.status(200).json(cachedData);
    }
  
    // If weather forecast data is not cached, continue with the next middleware
    next();
  };
  const cacheWeatherHistory = async (req, res, next) => {
    const { id } = req.params;
    const { days } = req.query;
    const cacheKey = `weather_history_${id}_${days || '7'}`;
  
    // Check if weather history data for the location and days is already cached
    const cachedData = weatherCache.get(cacheKey);
    if (cachedData) {
      // Return cached weather history data if available
      return res.status(200).json(cachedData);
    }
  
    // If weather history data is not cached, continue with fetching the data
    next();
  };

  module.exports = { cacheWeatherForecast, cacheWeatherHistory };