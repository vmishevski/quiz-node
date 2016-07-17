'use strict';
import express = require('express');
let saggerExpress = require('swagger-express-mw');
let swaggerUi = require('swagger-tools/middleware/swagger-ui');
let app: express.Application = express();
let bodyParser = require('body-parser');
import config = require('./config/config');
import db = require('./api/db/index');

module.exports = app; // for testing

app.use(bodyParser.json());

db.connect();
require('./api/models/index');

saggerExpress.create({appRoot: __dirname}, (err: any, se: any) => {
  if (err) { throw err; }

  app.use(swaggerUi(se.runner.swagger));

  // install middleware
  se.register(app);

  app.listen(config.get('server.port'), () => {
    console.log('Server listening to localhost:' + config.get('server.port'));
  });

});
