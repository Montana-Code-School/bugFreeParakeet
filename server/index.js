//call the packages we need
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//base setup for API
const mongoose  = require('mongoose');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const cors = require('cors');
//this is all localhost setup
const PORT = process.env.PORT || 5000;
const db = process.env.MONGODB_URI || 'mongodb://localhost/adventure';
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

    res.send('{"message":"Hello from the server!"}');
  });
  router.use(function(res, req, next) {
    next();
  });
  router.get('/', (req, res) => {
    res.json({
      message: 'process complete'
    });
  });
  router.route('/adventure')
    .post(({body}, res) => {
      const adventure = new Adventure();
      adventure.storyPremise = body.storyPremise;
      adventure.optionOne = body.optionOne;
      adventure.optionTwo = body.optionTwo;
      adventure.keyValue = body.keyValue;
      adventure.branchEnded = body.branchEnded;
      //error checker
      adventure.save(err => {
        if (err)
          res.send(err);
        res.json({
          message: 'Posted things!'
        });
      });
    })
    .get((req, res) => {
      Adventure.find((err, adventure) => {
        if (err)
          res.send(err);

        res.json(adventure);
      });
    })
    .delete((req, res) => {
      Adventure.remove({}, (err)=>{
      });
    });
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
        adventure.branchEnded = adventure.branchEnded;
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
          message: 'Successfully deleted'
        });
      });
    });
  router.route('/adventure/keyValue/:adventure_keyValue')
    .get(({params}, res) => {
      Adventure.findOne({"keyValue":params.adventure_keyValue}, (err, adventure) => {
        if (err)
          res.send(err);
        res.json(adventure);
      });
    });
  router.route('/adventure/keyValue/:adventure_keyValue/:adventure_optionOne')
    .put(({params, body}, res) => {
      let randBS = res; //scoping bullshit
      let query = {"keyValue":params.adventure_keyValue};
      let newKeyValue = params.adventure_keyValue + "1"; //newKeyValue that onSubmit is trying to create
      Adventure.findOne({keyValue:newKeyValue}, (err, response)=>{
        if (response === null) { //if it doesn't allows to post new option
          Adventure.findOneAndUpdate(query, {optionOne: params.adventure_optionOne},  (err, adventure) => {
            randBS.json({//yep pretty much
              message: 'Adventure was added for optionOne!'
            });
          });
        }else{
          let glad = "we did it";
        }
      }); //checks to see if newKeyValue exists

    });
  router.route('/adventure/keyValue2/:adventure_keyValue/:adventure_optionTwo')
    .put(({params, body}, res) => {
      let randBS = res;
      let query = {"keyValue":params.adventure_keyValue};
      let newKeyValue = params.adventure_keyValue + "2"; //newKeyValue that onSubmit is trying to create
      Adventure.findOne({keyValue:newKeyValue}, (err, response)=>{
        if (response === null) { //if it doesn't allows to post new option
          Adventure.findOneAndUpdate(query, {optionTwo: params.adventure_optionTwo},  (err, adventure) => {
            randBS.json({
              message: 'Adventure was added for optionTwo!',
            });
          });
        }else{
          let gladAgain = "we did it again";
        }
      }); //checks to see if newKeyValue exists

    });
  router.route('/adventure/:adventure_keyValue/reset')
    .put(({params, body}, res) => {
      let query = {"keyValue": params.adventure_keyValue};
      Adventure.findOneAndUpdate(query, {optionOne: ""}, (err, adventure) => {
        res.json({
          message: 'option one reset'
        });
      });
    });
  router.route('/adventure/:adventure_keyValue/reset2')
    .put(({params, body}, res) => {
      let query = {"keyValue": params.adventure_keyValue};
      Adventure.findOneAndUpdate(query, {optionTwo: ""}, (err, adventure) => {
        res.json({
          message: 'option two reset'
        });
      });
    });
  router.route('/adventure/:adventure_keyValue/endBranch')
    .put(({params, body}, res) => {
      let query = {"keyValue": params.adventure_keyValue};
      Adventure.findOneAndUpdate(query, {branchEnded: "yes"}, (err, adventure) => {
        res.json({
          message: 'branch ended'
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
