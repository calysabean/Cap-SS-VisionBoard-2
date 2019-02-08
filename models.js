'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

var commentSchema = mongoose.Schema({ content: 'string' });

var goalSchema = mongoose.Schema({
  category: 'string',
  goal: 'string',
  comments: [commentSchema]
});

goalSchema.methods.serialize = function() {
  return {
    id: this._id,
    category: this.category,
    goal: this.goal,
    comments: this.comments
  };
};

var goalPostSchema = mongoose.Schema({
  category: 'string',
  goal: 'string',
  comments: [commentSchema]
});

goalPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    category: this.category,
    goal: this.goal,
    comments: this.comments
  };
};

const Goal = mongoose.model('Goal', goalSchema, );
const GoalPost = mongoose.model('GoalPost', goalPostSchema);


module.exports = { Goal, GoalPost};
