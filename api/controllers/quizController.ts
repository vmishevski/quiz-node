/**
 * Created by Voislav on 7/17/2016.
 */
import express = require('express');
import mongoose = require('mongoose');
import {QuestionBank, Quiz, Question, Answer, QuizModel, QuestionModel} from '../models/index';
import {SwaggerRequest} from '../helpers/SwaggerRequest';
import debug =  require('debug');
import async = require('async');
import * as _ from 'lodash';

export function addQuizz(req: SwaggerRequest, res: express.Response, next: express.NextFunction): void {
  let quiz : Quiz = new QuizModel<Quiz>(req.swagger.params.quiz.value);
  quiz.questions = [];

  if (req.swagger.params.quiz.value.questions) {
    async.each(req.swagger.params.quiz.value.questions, function (item: any, cb: any): void {
      if (!item.id) {
        // create new question
        let newQuestion: Question = new QuestionModel<Question>(item);
        generateIds(newQuestion.answers);
        newQuestion.save(function (err) {
          quiz.questions.push(newQuestion._id);
          cb(err);
        });
      } else {
        QuestionModel.findOne({_id: item.id}, (err: any, question: Question) => {
          if (err) {
            return cb(err);
          }

          if (question) {
            // question exists, update it and it's answers
            question.questionDescription = item.questionDescription;
            generateIds(item.answers);
            question.answers = item.answers;
            question.save(function (err) {
              quiz.questions.push(question._id);
              return cb(err);
            });
          } else {
            // create new question
            let newQuestion: Question = new QuestionModel<Question>(item);
            generateIds(newQuestion.answers);
            newQuestion.save(function (err) {
              quiz.questions.push(newQuestion._id);
              cb(err);
            });
          }
        });
      }

    }, function done(err) {
      if (err) {
        return next(err);
      }

      quiz.save(function (err) {
        if (err) {
          return next(err);
        }

        res.status(200).json(quiz);
      })
    });
  }

  function generateIds(answers: Array<Answer>): void {
    // _.forEach(answers, (answer : Answer) => {
    //   if (!answer.id) {
    //     answer.id = new mongoose.Types.ObjectId().toString();
    //   }
    // });
  }
}
