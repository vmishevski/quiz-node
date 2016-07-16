/**
 * Created by Voislav on 7/16/2016.
 */
import express = require('express');

export class QuestionBankController {
  get(req: express.Request, res: express.Response): void {
    res.send('<h1>Hello!</h1>');
  }
}
