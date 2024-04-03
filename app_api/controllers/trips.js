const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// get: /trips - lists all the trips
// regardless of outcome, response must include HTML status code
//and JSON message to the requesting client
const tripsList = async (req, res) => {
    //model.find({}).then((err, trips) => {
    //    if (!trips) {
    //        return res.status(404).json({ "message": "trip not found" });
    //    } else {
    //        return res.status(200).json(trips);
    //    }
    //});


    const q = await Model
        .find({})
        .exec();

    // uncomment the following line to show results of querey
    // on the console
    //console.log();

    if (!q) {
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};

const tripsFindCode = async (req, res) => {
    const v = await Model
        .find({ 'code': req.params.tripCode })
        .exec();

    if (!v) {
        return res.status(404).json(err);
    } else {
        return res.status(200).json(v);
    }
};

module.exports = {
    tripsList,
    tripsFindCode
};