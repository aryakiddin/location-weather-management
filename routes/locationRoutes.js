const express = require("express");
const router = express.Router();
const {locationController} = require("../controllers");


router.get('/', locationController.getAllLocations);
router.post('/login', locationController.login)
router.post('/', locationController.addLocation);
router.get('/:id', locationController.getLocationById);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);

module.exports = router;