/**
 * Created by Voislav on 7/16/2016.
 */
import express = require('express');
import mongoose = require('mongoose');

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

export function getByIdentifier(req: any, res: any, next: express.NextFunction): void {
  let QuestionBank = mongoose.model('QuestionBank');

  let identifier: string = req.swagger.params.identifier.value;
  console.log('searching for ', identifier);
  QuestionBank.findOne({'identifier': identifier}, (err: any, questionBank: any) => {
    if (err) {
      return next(err);
    }

    console.log('found question bank:', questionBank);
    if (questionBank) {
      return res.json(questionBank);
    }

    res.status(404).json({message: 'QuestionBank with id ' + req.params.identifier + ' not found'});
  });
}
