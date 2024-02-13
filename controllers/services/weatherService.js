// controllers/weatherController.js

const axios = require("axios");
require('dotenv').config();
const moment = require("moment")
const { locations } = require("../services/locationService");
const { weatherCache } = require("../utils/weatherCache");
const logger = require("../utils/logger");

//const API_KEY = "c66e3ede31214244935133250241202";  //uncomment this while running without env
const API_KEY = process.env.API_KEY //comment this while running 

const getWeatherForecast = async (req, res) => {
  const { id } = req.params;
  try {
    const allLocations = locations
    if (allLocations.length === 0) {
      return res.status(400).json({ error: "Please add locations first" })
    }
    const location = allLocations.find(loc => loc.id === parseInt(id));

    if (!location) {
      return res.status(404).json({ error: "Location not found!" })
    }

    // Extract latitude and longitude from location
    const { latitude, longitude } = location;

    logger.info("Fetching weather forecast data from external API");
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}`);
    //console.log(response)
    if (response.status === 200) {   
      const data = await response.data;
      const forecast = {
        current: data.current,
        forecast: data.forecast,
        location: data.location
      };
      weatherCache.set(`weather_forecast_${id}`, forecast); /// setting in cache with id
      
      logger.info("Weather forecast data from https://api.weatherapi.com fetched successfully");
      return res.status(200).json(forecast);
    } else {
      throw new Error("Failed to fetch weather data: " + response.statusText);
    }
  } catch (error) {
    console.log(JSON.stringify(error))
    logger.error("Failed to fetch weather forecast data from external API", { error: error.message });
    //if (error.code === "ERR_BAD_REQUEST") {
      return res.status(400).json({ error: `${error.response.data.error.message}` });
  //  } 
  }
};

const getWeatherHistory = async (req, res) => {
  const { id } = req.params;
  const { days } = req.query;
  try {
    const allLocations = locations
    if (allLocations.length === 0) {
      return res.status(400).json({ error: "Please add locations first" })
    }
    const location = allLocations.find(loc => loc.id === parseInt(id));

    if (!location) {
      return res.status(404).json({ error: "Location not found!" })
    }

    // Extract latitude and longitude from location
    const { latitude, longitude } = location;

    let startDate;
    if (days && ["7", "15", "30"].includes(days)) {
      startDate = moment().subtract(parseInt(days), "days");
    } else {
      startDate = moment().subtract(7, "days");
    }
    const previousDate = moment().subtract(1, "days");

    const previousDateFormatted = previousDate.format("YYYY-MM-DD");

    const startDateFormatted = startDate.format("YYYY-MM-DD");

    logger.info("Fetching weather history data from external API https://api.weatherapi.com...");

    const url = `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${latitude},${longitude}&dt=${startDateFormatted}&end_dt=${previousDateFormatted}`
    const response = await axios.get(url);

    if (response.status === 400) {
      return res.status({ error: response.data.error.message })
    }
    // console.log(response)
    if (response.status === 200) {
      
      const data = await response.data;
      const forecast = {
        current: data.current,
        forecast: data.forecast,
        location: data.location
      };
      weatherCache.set(`weather_history_${id}`, forecast); /// setting in cache with id
      
      logger.info('Weather forecast data from https://api.weatherapi.com fetched successfully');
      return res.status(200).json(forecast);
    } else {
      throw new Error("Failed to fetch weather data: " + response.statusText);
    }

  } catch (error) {
   // console.log(error)
    logger.error('Failed to fetch weather forecast data from external API', { error: error.message });
   // if (error.code === "ERR_BAD_REQUEST") {
      return res.status(400).json({ error: `${error.response.data.error.message}` });
 //   } 
  }
};


module.exports = {
  getWeatherForecast, getWeatherHistory
};
