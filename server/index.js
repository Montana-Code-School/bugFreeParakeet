const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const db = process.env.MONGODB_URI || 'mongodb://localhost/adventure'

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  mongoose.Promise = require('bluebird');
  const Adventure = require('../models/adventure.js');
  const router = express.Router();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  app.use(bodyParser.urlencoded({ extended : true }));
  app.use(bodyParser.json());
  app.use(cors());

  // connect to database
  mongoose.connection.openUri(db);

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  router.use(function(res, req, next) {
    console.log("something is happening");
    next();
  })

  router.get('/', (req, res) => {
    res.json({
      message: 'I did it!'
    });
  });
  router.route('/adventure')
    .post(({body}, res) => {
      const adventure = new Adventure();
      adventure.storyPremise = body.storyPremise;
      adventure.optionOne = body.optionOne;
      adventure.optionTwo = body.optionTwo;
      adventure.keyValue = body.keyValue;
      adventure.save(err => {
        if (err)
          res.send(err);
        res.json({
          message: 'Posted things!'
        });
      });
    })
    .get((req, res) => {
    console.log("it works");
    Adventure.find((err, adventure) => {
      console.log(err);
      if (err)
        res.send(err);

      res.json(adventure);
    });
  })
  .delete((req, res) => {
    Adventure.remove({}, (err)=>{
      console.log("all your data belongs to us")
    })
  })
  router.route('/adventure/:adventure_id')
    .get(({params}, res) => {
      Adventure.findById(params.adventure_id, (err, adventure) => {
        if (err)
          res.send(err);
        res.json(adventure);
      });
    })
    .put(({params, body}, res) => {

    Adventure.findById(params.adventure_id, (err, adventure) => {

      if (err)
        res.send(err);

        adventure.storyPremise = body.storyPremise;
        adventure.optionOne = body.optionOne;
        adventure.optionTwo = body.optionTwo;
        adventure.keyValue = body.keyValue;
      adventure.save(err => {
        if (err)
          res.send(err);

        res.json({
          message: 'Adventure updated!'
        });
      });
    });
  })

  .delete(({params}, res) => {
    Adventure.remove({
      _id: params.adventure_id
    }, (err, adventure) => {
      if (err)
        res.send(err);

      res.json({
        message: 'Successfully adventured'
      });
    });
  });

  router.route('/adventure/keyValue/:adventure_keyValue')
    .get(({params}, res) => {
      console.log("this is the correct route")
      Adventure.findOne({"keyValue":params.adventure_keyValue}, (err, adventure) => {
        if (err)
          res.send(err);
        res.json(adventure);
      });
    })
    router.route('/adventure/keyValue/:adventure_keyValue/:adventure_optionOne')

  .put(({params, body}, res) => {
  let query = {"keyValue":params.adventure_keyValue};
  Adventure.findOneAndUpdate(query, {optionOne: params.adventure_optionOne},  (err, adventure) => {

      res.json({
        message: 'Adventure was put for optionOne!'
      });
    });
});

router.route('/adventure/keyValue2/:adventure_keyValue/:adventure_optionTwo')

.put(({params, body}, res) => {
let query = {"keyValue":params.adventure_keyValue};
Adventure.findOneAndUpdate(query, {optionTwo: params.adventure_optionTwo},  (err, adventure) => {

  res.json({
    message: 'Adventure was put for optionTwo!'
  });
});
});


  app.use('/api', router);

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
