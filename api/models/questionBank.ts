/**
 * Created by Voislav on 7/16/2016.
 */

let mongoose = require('mongoose');

let questionBank = mongoose.Schema({
    identifier: 'string'
  });

if (!questionBank.options.toJSON) questionBank.options.toJSON = {};
questionBank.options.toJSON.transform = (doc, ret, c): any => {
  console.log('transforming', doc, ret, c);
  delete ret._id;
  return ret;
};

mongoose.model('QuestionBank', questionBank);
