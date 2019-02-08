'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
var cors = require('cors');

mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config');
//const { Goal } = require('./models');

const { User, Goal } = require('./models');
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

const app = express();

app.use(morgan('common'));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

var whitelist = ['/goals']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
 
app.get('/goals/:id', cors(corsOptionsDelegate), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
})

// use cors middleware instead
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

/*app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});*/

app.get('/goals', (req, res) => {
  Goal
  .find()  
  .then(goals => {
    console.log(goals);
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


app.get('/goals/:id', (req, res) => {
  Goal
    .findById(req.params.id)
    .then(item => {
      res.json({
        id: item._id,
        category: item.category,
        goal: item.goal
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went horribly awry' });
    });
});


app.post('/goals', (req, res) => {
  const requiredFields = ['category', 'goal'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });

  Goal
  .create({
    category: req.body.category,
    goal: req.body.goal
  })
  .then(goalS => res.status(201).json(goalS.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });

});

app.post('/my-vision', (req, res) => {
  const requiredFields = ['category'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });

  Goal
  .create({
    category: req.body.category,
    goal: req.body.goal
  })
  .then(goalS => res.status(201).json(goalS.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });

});


app.put('/goals/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['category', 'goal'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Goal
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPost => res.status(200).json({
      id: updatedPost.id,
      category: updatedPost.category,
      goal: updatedPost.goal
    }))
    .catch(err => res.status(500).json({ message: err }));
});

app.options('*', cors())
app.options('/goals/:id', cors()) // enable pre-flight request for DELETE request
app.delete('/goals/:id', cors(), (req, res) => {
  Goal
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted  post with id \`${req.params.id}\``);
      res.status(204).end();
    });
});

app.get('/career', (req, res) => {
  Goal
  .find({category: "career"})  
  .then(goals => {
    console.log(goals);
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

app.post('/career', (req, res) => {
  const requiredFields = ['category', 'goal'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });

  Goal
  .create({
    category: req.body.category,
    goal: req.body.goal
  })
  .then(goalS => res.status(201).json(goalS.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });

});

app.delete('/career/:id', (req, res) => {
  Goal
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted  post with id \`${req.params.id}\``);
      res.status(204).end();
    });
});

app.get('/financial', (req, res) => {
  Goal
  .find({category: "financial"})  
  .then(goals => {
    console.log(goals);
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

app.post('/financial', (req, res) => {
  const requiredFields = ['category', 'goal'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });

  Goal
  .create({
    category: req.body.category,
    goal: req.body.goal
  })
  .then(goalS => res.status(201).json(goalS.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });

});

app.delete('/financial/:id', (req, res) => {
  Goal
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted  post with id \`${req.params.id}\``);
      res.status(204).end();
    });
});

app.get('/physical', (req, res) => {
  Goal
  .find({category: "physical"})  
  .then(goals => {
    console.log(goals);
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

app.post('/physical', (req, res) => {
  const requiredFields = ['category', 'goal'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });

  Goal
  .create({
    category: req.body.category,
    goal: req.body.goal
  })
  .then(goalS => res.status(201).json(goalS.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });

});

app.delete('/physical/:id', (req, res) => {
  Goal
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted  post with id \`${req.params.id}\``);
      res.status(204).end();
    });
});

app.get('/personal-development', (req, res) => {
  Goal
  .find({category: "personal-development"})  
  .then(goals => {
    console.log(goals);
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

app.post('/personal-development', (req, res) => {
  const requiredFields = ['category', 'goal'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });

  Goal
  .create({
    category: req.body.category,
    goal: req.body.goal
  })
  .then(goalS => res.status(201).json(goalS.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });

});

app.delete('/personal-development/:id', (req, res) => {
  Goal
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted  post with id \`${req.params.id}\``);
      res.status(204).end();
    });
});

app.get('/spiritual', (req, res) => {
  Goal
  .find({category: "spiritual"})  
  .then(goals => {
    console.log(goals);
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

app.post('/spiritual', (req, res) => {
  const requiredFields = ['category', 'goal'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });

  Goal
  .create({
    category: req.body.category,
    goal: req.body.goal
  })
  .then(goalS => res.status(201).json(goalS.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });

});

app.delete('/spiritual/:id', (req, res) => {
  Goal
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted  post with id \`${req.params.id}\``);
      res.status(204).end();
    });
});

app.get('/experiential', (req, res) => {
  Goal
  .find({category: "experiential"})  
  .then(goals => {
    console.log(goals);
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

app.post('/experiential', (req, res) => {
  const requiredFields = ['category', 'goal'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });

  Goal
  .create({
    category: req.body.category,
    goal: req.body.goal
  })
  .then(goalS => res.status(201).json(goalS.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });

});

app.delete('/experiential/:id', (req, res) => {
  Goal
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted  post with id \`${req.params.id}\``);
      res.status(204).end();
    });
});


app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});


let server;

/*function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      })
      .on("error", err => {
        reject(err);
      });
  });
}

// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("Closing server");
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}*/

/*function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {*/

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