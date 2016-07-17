/**
 * Created by Voislav on 7/17/2016.
 */

var expect = require('chai').expect;
var request = require('supertest');
var server = require('../../../.build/app');
var mongoose = require('mongoose');

after(function(done){
  mongoose.connection.close(function(err){
    done(err);
  });
});

describe('controllers', function() {
  describe('questionBank', function () {
    describe('POST /questionBanks', function () {
      it('should return 200 when provided valid identifier', function(done){
        request(server)
          .post('/questionBanks')
          .send({identifier: 'valididentifier'})
          .expect(200)
          .end(function(err, res){
            expect(res.body.identifier).to.be.equal('valididentifier');

            done(err);
          });
      });

      it('should return 400 when missing identifier', function(done){
        request(server)
          .post('/questionBanks')
          .expect(400, done);
      });
    });

    describe('GET /questionBank/{identifier}', function(){
      it('should return 404 when question bank does not exist', function(done){
        request(server)
          .get('/qustionBanks/asd34to534t34560b0sdafg')
          .expect(404, done);
      });

      it('should return 200 with valid question bank in body when bank exist', function(done){
        request(server)
          .post('/questionBanks')
          .send({identifier: 'valididentifier'})
          .expect(200)
          .end(function(err, res){
            var identifier = res.body.identifier;

            request(server)
              .get('/questionBanks/'+ identifier)
              .expect(200)
              .end(function(err, res){
                if (err) {
                  return done(err);
                }

                expect(res.body.identifier).to.equal(identifier);
                done();
              });
          });
      });
    });

    describe('DELETE /questionBanks/{identifier}', function(){
      it('should return 404 when question bank does not exist', function(done){
        request(server)
          .delete('/questionBanks/sdfgsodfgherutcxvxcv')
          .expect(404, done);
      });

      it('should return 200 when question bank exists', function(done){
        request(server)
          .post('/questionBanks')
          .send({identifier: 'valididentifier'})
          .expect(200)
          .end(function(err, res){
            var identifier = res.body.identifier;

            request(server)
              .delete('/questionBanks/'+ identifier)
              .expect(200, done);
          });
      });
    });
  });
});
