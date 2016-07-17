/**
 * Created by Voislav on 7/16/2016.
 */

import mongoose = require('mongoose');

let questionBank: any = new mongoose.Schema({
    identifier: 'string'
  });

if (!questionBank.options.toJSON) {
  questionBank.options.toJSON = {};
}

questionBank.options.toJSON.transform = (doc, ret, c): any => {
  delete ret._id;
  return ret;
};

mongoose.model('QuestionBank', questionBank);

export interface QuestionBank extends mongoose.Document {
  identifier: string;
}
