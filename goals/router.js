'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const { Goal } = require('./models');

const router = express.Router();


const passport = require('passport')
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth, (req, res) => {
    Goal
    .find({
        user: req.user.id
    })
    .then(goals => {
        console.log(goals)
        res.json(goals.map(goal => goal.serialize()));
    })

    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
  });

  module.exports = {router};
