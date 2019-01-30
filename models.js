'use strict';

const mongoose = require('mongoose');
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

const Goal = mongoose.model('Goal', goalSchema);

module.exports = { Goal};