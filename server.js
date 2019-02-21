'use strict';

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
var cors = require('cors');

const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { router: goalsRouter } = require('./goals');
// New code
const { router: goalspostsRouter } = require('./goalsposts');


mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config');
//const { Goal } = require('./models');

const app = express();

app.use(morgan('common'));
app.use(express.static('public'));
app.use(cors());


passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/api/goals', goalsRouter);
//New Code
app.use('/api/goals/posts', goalspostsRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

//The below line blocks my GET request
/*app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});*/

let server;

function runServer(DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };