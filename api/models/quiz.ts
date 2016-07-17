import * as mongoose from 'mongoose';
let ObjectId = mongoose.Schema.Types.ObjectId;
import {Question} from './question';

export let QuizSchema: any = new mongoose.Schema({
  name: String,
  description: String,
  questions: [{type: ObjectId, ref: 'QuestionSchema'}]
});

export let QuizModel = mongoose.model('Quiz', QuizSchema);

if (!QuizSchema.options.toJSON) {
  QuizSchema.options.toJSON = {};
}

QuizSchema.options.toJSON.transform = (doc, ret, c): any => {
  ret.id = doc.id;
  delete ret._id;
  return ret;
};

export interface Quiz extends mongoose.Document {
  name: string;
  description: string;
  questions: Array<typeof ObjectId> | Array<Question>;
}
