/**
 * Created by Voislav on 7/16/2016.
 */

import mongoose = require('mongoose');

export let questionBankSchema: any = new mongoose.Schema({
    identifier: String
  });

if (!questionBankSchema.options.toJSON) {
  questionBankSchema.options.toJSON = {};
}

questionBankSchema.options.toJSON.transform = (doc, ret, c): any => {
  delete ret._id;
  return ret;
};

export let QuestionBankModel = mongoose.model('QuestionBank', questionBankSchema);

export interface QuestionBank extends mongoose.Document {
  identifier: string;
}
