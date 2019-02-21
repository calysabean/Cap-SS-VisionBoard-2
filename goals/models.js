'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var goalSchema = mongoose.Schema({
  category: 'string',
  goal: 'string'
});

goalSchema.methods.serialize = function() {
  return {
    id: this._id,
    category: this.category,
    goal: this.goal
  };
};
 
  const Goal = mongoose.model('Goal', goalSchema, );
  
  module.exports = { Goal};

  // Original Code
/*const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var goalSchema = mongoose.Schema({
  category: 'string',
  goal: 'string'
});

goalSchema.methods.serialize = function() {
  return {
    id: this._id,
    category: this.category,
    goal: this.goal
  };
};

const goalPostSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: String, required: true },
    comments: { type: String, required: true }
  });
  
  goalPostSchema.methods.serialize = function() {
    return {
      id: this._id,
      category: this.category,
      comments: this.comments
    };
  };
  
  const Goal = mongoose.model('Goal', goalSchema, );
  const GoalPost = mongoose.model('GoalPost', goalPostSchema);
  
  module.exports = { Goal, GoalPost};*/