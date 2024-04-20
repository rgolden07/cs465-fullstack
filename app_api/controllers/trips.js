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
    getUser(req, res, (req, res) => {
        Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, (err, trip) => {
                if (err) {
                    return res.status(400).json(err);
                } else {
                    return res.status(201).json(trip);
                }
            });
        }
    );
}



const getUser = async (req, res, callback) => {
    if (req.auth && req.auth.email) {
        try {
            const user = await User.findOne({ email: req.auth.email }).exec();
            if (!user) {
                return res.status(404).json({ message: "User not found1" });
            }
            callback(req, res, user.name);
        } catch (err) {
            console.log(err);
            return res.status(404).json({ message: "User not found2" });
        }
    }
};

//put /trips/:tripCode - adds a new trip
// regardless of outcome, response must include HTML status code
//and JSON message to the requesting client

const tripsUpdateTrip = async (req, res) => {

    getUser(req, res, (req, res) => {

    })
    Trip.findOneAndUpdate(
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
        }, { new: true }).then(trip => {
            if (!trip) {
                return res.status(404).send({ message: "Trip not found with code " + req.params.tripCode });
            }
            res.send(trip);
        }).catch(err => {
            if (err.kind == 'ObjectId') {
                return res.status(404).send({ message: 'Trip not found with code ' + req.params.tripcode });
            }
            return res.status(500).json(err);
        });

}

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip
};