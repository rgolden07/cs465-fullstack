const express = require('express');
const router = express.Router();

//import statement for the controllers
const tripsController = require('../controllers/trips');

router.route('/trips').get(tripsController.tripsList).post(tripsController.tripsAddTrip);
router.route('/trips/:tripCode').get(tripsController.tripsFindCode).put(tripsController.tripsUpdateTrip);

module.exports = router;