'use strict';


const express = require('express');
const bodyParser = require('body-parser');

const { Goal } = require('./models');

const router = express.Router();


const passport = require('passport')
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', { session: false });

//code I want to add but can't because of authentication
/*.find({
    user: req.user.id
})*/

router.get('/', (req, res) => {
    Goal
    .find()
    .then(goals => {
      res.json(goals.map(item => {
        return {
          id: item._id,
          category: item.category,
          goal: item.goal
        };
      }));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
  });

  /*router.get('/:id', (req, res) => {
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
});/


router.delete('/:id', (req, res) => {
    GoalPost
        .findByIdAndRemove(req.params.id)
        .then(goal => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Internal server error' }));
}); */

  module.exports = {router};

//Original Code
/*const express = require('express');
const bodyParser = require('body-parser');

const { GoalPost, Goal } = require('./models');

const router = express.Router();*/

/*.find({
    user: req.user.id
})*/

/*const passport = require('passport')
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', { session: false });*/

/*router.get('/', jwtAuth, (req, res) => {
    Goal
    .find({
        user: req.user.id
    })
    .then(goals => {
      res.json(goals.map(item => {
        return {
          id: item._id,
          category: item.category,
          goal: item.goal
        };
      }));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
  });*/
/*
  router.get('/', (req, res) => {
    GoalPost
        .find({
            userId: req.users.id
        })
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

/*router.get('/:id', (req, res) => {
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

router.post('/posts', jsonParser, (req, res) => {
    const requiredFields = ['goal', 'comments'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            return res.status(400).send(message);
        }
    }

    GoalPost
        .create({
            goal: req.body.goal,
            comments: req.body.comments,
            userId: req.user.id
        })
        .then(goal => res.status(201).json(goal.serialize()))
        .catch(err => {
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.put('/:id', jsonParser, (req, res) => {
    const toUpdate = {};
    const updateableFields = ['goal', 'comments'];

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
});*/

  
  
  /*app.post('/goals', (req, res) => {
    console.log(req.body);
    const requiredFields = ['category', 'goal'];
    requiredFields.forEach(field => {
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
    });
  
    GoalPost
    .create({
      category: req.body.category,
      goal: req.body.goal,
      comment: req.body.comment
    })
    .then(goalS => res.status(201).json(goalS.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something in Post request in server file went wrong' });
    });
  
  });*/
  

  /*router.options('*', cors())
  app.options('/goals/:id', cors()) // enable pre-flight request for DELETE request*/
  
 /* module.exports = {router};*/

