const weatherController = require("./services/weatherService");
const locationController = require("./services/locationService")

console.log(locationController.locations)

module.exports = {
    weatherController, locationController
}