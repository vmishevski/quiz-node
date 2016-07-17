/**
 * Created by Voislav on 7/18/2016.
 */

 var expect = require('chai').expect;
 var request = require('supertest');
 var server = require('../../../.build/app');
 var mongoose = require('mongoose');

 describe('controllers', function(){
   describe('quizController', function(){
     describe('POST /questionBank/{identifier}', function(){
       it('should return 200 and create valid quiz');

       it('should generate id for the quiz, questions and answers');

       it('should return 400 when quiz doesn have any questions');

       it('should return 400 when name is missing');

       it('should return 400 when any question has questionDescription missing');

       it('should return 400 when any question doesnt have answers');

       it('should return 400 when any question doesnt have a valid answer');

       it('should return 400 when any answer has answerDescription missing');

       it('should create quiz with one new question');

       it('should create quiz with one existing question');

       it('should crate quiz with one existing question and one new answer');

       it('should crate quiz with one existing question and one removed answer');

       it('should crate quiz with one existing question updated IsCorrect of answers');
     });

     describe('GET /questionBank/{identifier}', function(){
       it('should return 200 and all quizzes when valid question bank');

       it('should return 404 when question bank doesnt exist');
     });

     describe('GET /questionBank/{identifier}/{quizId}', function(){
       it('should return 200 and the quiz when quiz exist');

       it('should return 404 when quiz doesnt exist');
     });

     describe('PUT /questionBank/{identifier}/{quizId}', function(){
       it('should return 404 when quiz doesnt exist');

       it('should update quiz and remove one question');

       it('should update quiz and add one new question');

       it('should update quiz and add one existing question');

       it('should update quiz and add one existing and remove one question');

       it('should update quiz and add one answer to first question');

       it('should update quiz and remove one answer to first question');

       it('should update quiz and add one and remove one answer to first question');

       it('should update quiz and add one answer to first and second question');

       it('should update quiz and update IsCorrect to all answers');
     });

     describe('DELETE /questionBank/{identifier}/{quizId}', function(){
       it('should return 200 when quiz exists');

       it('should return 404 after quiz has been deleted');

       it('should return 404 when quiz does not exist');
     });
   })
 });
