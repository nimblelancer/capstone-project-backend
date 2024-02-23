const express = require('express');
const bodyParser = require('body-parser');
const Disease = require('../models/Disease');
const diseaseRouter = express.Router();
diseaseRouter.use(bodyParser.json());

//Create Read Delete -disease
diseaseRouter.route('/')
    .get((req, res, next) => {
        Disease.find({})
            .then((Disease) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Disease);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Disease.create(req.body)
            .then((disease) => {
                console.log('disease Created: ', disease);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(disease);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /Disease');
    })
    .delete((req, res, next) => {
        Disease.deleteMany()
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

    //Create Read Delete -disease-by ID
diseaseRouter.route('/:diseaseId')
    .get((req, res, next) => {
        Disease.findById(req.params.diseaseId)
            .then((disease) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(disease);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post( (req, res, next) => {
        res.end("POST operation not supported on /Disease/" + req.params.diseaseId);
    })
    .put((req, res, next) => {
        Disease.findByIdAndUpdate(req.params.diseaseId, {$set: req.body}, {new: true})
            .then((disease) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(disease);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete( (req, res, next) => {
        Disease.findByIdAndRemove(req.params.diseaseId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
module.exports = diseaseRouter;

