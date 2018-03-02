const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const db = process.env.MONGODB_URI || 'mongodb://localhost/stuff'

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
  const Stuff = require('../models/stuff.js');
  const router = express.Router();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  app.use(bodyParser.urlencoded({ extended : true }));
  app.use(bodyParser.json());
  app.use(cors());

  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });
  // check to see I if I need this...

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
  router.route('/stuff')
    .post(({body}, res) => {
      const stuff = new Stuff();
      stuff.storyPremise = body.storyPremise;
      stuff.optionOne = body.optionOne;
      stuff.optionTwo = body.optionTwo;
      stuff.keyValue = body.keyValue;
      stuff.save(err => {
        if (err)
          res.send(err);
        res.json({
          message: 'Posted things!'
        });
      });
    })
    .get((req, res) => {
    console.log("it works");
    Stuff.find((err, stuff) => {
      console.log(err);
      if (err)
        res.send(err);

      res.json(stuff);
    });
  });
  router.route('/stuff/:stuff_id')

    .get(({params}, res) => {
      Stuff.findById(params.stuff_id, (err, stuff) => {
        if (err)
          res.send(err);
        res.json(stuff);
      });
    })
    .put(({params, body}, res) => {

    Stuff.findById(params.stuff_id, (err, stuff) => {

      if (err)
        res.send(err);

        stuff.storyPremise = body.storyPremise;
        stuff.optionOne = body.optionOne;
        stuff.optionTwo = body.optionTwo;
        stuff.keyValue = body.keyValue;
      stuff.save(err => {
        if (err)
          res.send(err);

        res.json({
          message: 'Stuff updated!'
        });
      });
    });
  })

  .delete(({params}, res) => {
    Stuff.remove({
      _id: params.stuff_id
    }, (err, stuff) => {
      if (err)
        res.send(err);

      res.json({
        message: 'Successfully stuffed'
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
