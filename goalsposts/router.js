'use strict';


const express = require('express');
const bodyParser = require('body-parser');

const { GoalPost } = require('./models');

const router = express.Router();

const passport = require('passport')
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth, (req, res) => {
    GoalPost
    .find({
        user: req.user.id
    })
    .then(goals => {
      res.json(goals.map(item => {
        return {
          id: item._id,
          category: item.category,
          comments: item.comments
        };
      }));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
  });

  /*router.get('/', (req, res) => {
    GoalPost
        .find()
        .then(goals => {
            res.json({
                goals: goals.map(
                    (goals) => goals.serialize())
            });
        })
        .catch(err => {
            res.status(500).json({ message: 'Internal server error' });
        });
});*/

router.get('/:id', (req, res) => {
    GoalPost
        .findById(req.params.id)
        .then(goal => {
            res.json(
                goal.serialize()
            );
        })
        .catch(err => {
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['category', 'comments', ];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            return res.status(400).send(message);
        }
    }

    GoalPost
        .create({
            category: req.body.category,
            comments: req.body.comments,
          //userId: req.user.id
        })
        .then(goal => res.status(201).json(goal.serialize()))
        .catch(err => {
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.put('/:id', jsonParser, (req, res) => {
    const toUpdate = {};
    const updateableFields = ['category', 'comments'];

    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    GoalPost
        .findByIdAndUpdate(req.params.id, { $set: toUpdate })
        .then(goal => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

router.delete('/:id', (req, res) => {
    GoalPost
        .findByIdAndRemove(req.params.id)
        .then(goal => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Internal server error' }));
});


 module.exports = {router};

