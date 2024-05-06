const { weatherCache } = require("../utils/weatherCache");

let locations = [];

const getAllLocations = (req, res) => {
  res.json({"msg":"Hello sam"});
};

const login = (req, res) => {
  return res.json({
    "access_token": {
        "aud": "http://api.example.com",
        "iss": "https://krakend.io",
        "sub": "1234567890qwertyuio",
        "jti": "mnb23vcsrt756yuiomnbvcx98ertyuiop",
        "roles": ["user", "admin"],
        "exp": 1735689600
    },
    "refresh_token": {
        "aud": "http://api.example.com",
        "iss": "https://krakend.io",
        "sub": "1234567890qwertyuio",
        "jti": "mnb23vcsrt756yuiomn12876bvcx98ertyuiop",
        "exp": 1735689600
    },
    "exp": 1735689600
})
}

const addLocation = (req, res) => {
  const { name, latitude, longitude } = req.body;
  if(!name || !latitude || !longitude) {
    return res.status(400).json({error: "Pleaes enter all 3 fields"})
  }
  const newLocation = { id: locations.length + 1, name, latitude, longitude };
  locations.push(newLocation);
  return res.status(200).json(newLocation);
};

const getLocationById = (req, res) => {
  const { id } = req.params;
  const location = locations.find(loc => loc.id === parseInt(id));
  if (location) {
    return res.status(200).json(location);
  } else {
    return res.status(404).json({ error: 'Location not found' });
  }
};

const updateLocation = (req, res) => {
  const { id } = req.params;
  const { name, latitude, longitude } = req.body;
  const locationIndex = locations.findIndex(loc => loc.id === parseInt(id));
  if (locationIndex !== -1) {
    locations[locationIndex] = { ...locations[locationIndex], name, latitude, longitude };
    const cacheKey = `weather_forecast_${id}` || `weather_history_${id}}`;
    weatherCache.del(cacheKey); ///clearing cache of existing location because latitude and longitude may have been updated
    return res.status(200).json(locations[locationIndex]);
  } else {
    return res.status(404).json({ error: 'Location not found' });
  }
};

const deleteLocation = (req, res) => {
  const { id } = req.params;
  const locationIndex = locations.findIndex(loc => loc.id === parseInt(id));

  // If the location does not exist, return an error response
  if (locationIndex === -1) {
    return res.status(404).json({ error: 'Location not found' });
  }

  // Delete the location from the locations array
  locations.splice(locationIndex, 1);
  return res.status(200).json({ message: 'Location deleted successfully' });
};


module.exports = {
  getAllLocations,
  addLocation,
  getLocationById,
  updateLocation,
  deleteLocation, 
  locations,
  login
};