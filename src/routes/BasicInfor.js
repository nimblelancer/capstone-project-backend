const express = require('express');
const bodyParser = require('body-parser');
//const authenticate = require('../authenticate');
const BasicInfo = require('../models/BasicInfo');
const basicInfoRouter = express.Router();
basicInfoRouter.use(bodyParser.json());

basicInfoRouter.route('/')
.get((req, res, next) => {
    BasicInfo.find({})
        .then((basicInfos) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(basicInfos);
        })
        .catch((err) => next(err));
})
.post(//authenticate.verifyUser, 
(req, res, next) => {
    BasicInfo.create(req.body)
        .then((basicInfo) => {
            console.log('BasicInfo Created: ', basicInfo);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(basicInfo);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.put(//authenticate.verifyUser, 
(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /basicInfo');
})
.delete(//authenticate.verifyUser, 
(req, res, next) => {
    BasicInfo.deleteMany()
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

basicInfoRouter.route('/:basicInfoId')
.get((req, res, next) => {
    BasicInfo.findById(req.params.basicInfoId)
        .then((basicInfo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(basicInfo);
        }, (err) => next(err))
        .catch((err) => next(err));
}) 
.post(//authenticate.verifyUser, 
(req, res, next) => {
    res.end("POST operation not supported on /basicInfo/" + req.params.basicInfoId);
})
.put(//authenticate.verifyUser,
 (req, res, next) => {
    BasicInfo.findByIdAndUpdate(req.params.basicInfoId, {$set: req.body}, {new: true})
        .then((basicInfo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(basicInfo);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.delete(//authenticate.verifyUser,
 (req, res, next) => {
    BasicInfo.findByIdAndRemove(req.params.basicInfoId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = basicInfoRouter;
