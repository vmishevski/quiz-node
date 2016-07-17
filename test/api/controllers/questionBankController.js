/**
 * Created by Voislav on 7/17/2016.
 */

var should = require('should');
var request = require('supertest');
var server = require('../../../.build/app');

describe('controllers', function() {
  describe('questionBank', function () {
    describe('POST /questionBanks', function () {
      it('should return 200 when provided valid identifier', function(done){
        request(server)
          .post('/questionBanks')
          .send({identifier: 'valididentifier'})
          .expect(200)
          .end(function(err, res){
            res.body.identifier.should.equal('valididentifier');

            done(err);
          });
      });

      it('should return 400 when missing identifier', function(done){
        request(server)
          .post('/questionBanks')
          .expect(400, done);
      });
    });
  });
});
