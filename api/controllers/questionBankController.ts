/**
 * Created by Voislav on 7/16/2016.
 */
import express = require('express');
import mongoose = require('mongoose');
import {QuestionBank} from '../models/questionBank';
import {SwaggerRequest} from '../helpers/SwaggerRequest';
import debug =  require('debug');

let log = debug('app:ctrl:questionBank');

export function add(req: express.Request, res: express.Response, next: express.NextFunction): void {
  let QuestionBank = mongoose.model('QuestionBank');

  let model = new QuestionBank(req.body);

  model.save((err: any, saved: any): void => {
    if (err) {
      return next(err);
    }

    res.json(saved);
  });
}

export function getByIdentifier(req: SwaggerRequest, res: express.Response, next: express.NextFunction): void {
  let QuestionBankModel: mongoose.Model<QuestionBank> = mongoose.model<QuestionBank>('QuestionBank');

  let identifier: string = req.swagger.params.identifier.value;
  log('searching for ', identifier);
  QuestionBankModel.findOne({'identifier': identifier}, (err: any, questionBank: QuestionBank) => {
    if (err) {
      return next(err);
    }

    log('found question bank:', questionBank);
    if (questionBank) {
      return res.json(questionBank);
    }

    res.status(404).json({message: 'QuestionBank with id "' + identifier + '" not found'});
  });
}

export function deleteByIdentifier(req: SwaggerRequest, res: express.Response, next: express.NextFunction): void {
  let QuestionBank = mongoose.model('QuestionBank');

  let identifier: string = req.swagger.params.identifier.value;
  log('removing qustion bank:', identifier);
  QuestionBank.findOne({identifier: identifier}, (err: any, questionBank: QuestionBank) => {
    if (err) {
      return next(err);
    }

    if (!questionBank) {
      return res.status(404).json({message: 'QuestionBank with id "' + identifier + '" not found'});
    }

    questionBank.remove((error: any) => {
      if (error) {
        return next(error);
      }

      res.status(200).json();
    });
  });
}
