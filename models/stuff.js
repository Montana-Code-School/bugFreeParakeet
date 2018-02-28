var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StuffSchema   = new Schema({
  storyPremise: String,
  optionOne: String,
  optionTwo: String
});

module.exports = mongoose.model('Stuff', StuffSchema);
