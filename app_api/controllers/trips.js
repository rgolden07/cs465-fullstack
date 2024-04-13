const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// get: /trips - lists all the trips
// regardless of outcome, response must include HTML status code
//and JSON message to the requesting client
const tripsList = async (req, res) => {

    const q = await Model
        .find({})
        .exec();    

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

// post: /trips - adds a new trip
// regardless of outcome, response must include HTML status code
//and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    })

    const r = await newTrip.save();

        if (!r) {
            return res.status(400).json(err);
        } else {
            return res.status(201).json(r);
        }
}

//put /trips/:tripCode - adds a new trip
// regardless of outcome, response must include HTML status code
//and JSON message to the requesting client

const tripsUpdateTrip = async (req, res) => {

    console.log(req.params);
    console.log(req.body);

    const t = await Model.findOneAndUpdate(
        { 'code': req.params.tripCode },
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }
    ).exec();

    if (!t) {
        return res.status(400).json(err);
    } else {
        return res.status(201).json(t)
    }
}

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip
};