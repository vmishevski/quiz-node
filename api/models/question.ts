import mongoose = require('mongoose');

let QuestionSchema: any = new mongoose.Schema({
  questionDescription: {type: String, required: true},
  answers: [{
    // id: {type: mongoose.Schema.Types.ObjectId, required: true},
    answerDescription: {type: String, required: true},
    isCorrect: {type: Boolean, default: false}
  }]
});

if (!QuestionSchema.options.toJSON) {
  QuestionSchema.options.toJSON = {};
}

QuestionSchema.options.toJSON.transform = (doc, ret, c): any => {
  ret.id = doc.id;
  delete ret._id;
  return ret;
};

export let QuestionModel = mongoose.model('Question', QuestionSchema);

export {QuestionSchema};

export interface Question extends mongoose.Document {
  questionDescription: string;
  answers: Array<Answer>;
}

export interface Answer {
  id: string;
  answerDescription: string;
  isCorrect: boolean;
}
