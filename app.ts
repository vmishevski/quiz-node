/**
 * Created by Voislav on 7/16/2016.
 */

import express = require('express');
import config = require('./config/config');

let app = express();

app.get('/', (req: any, res: any) => {
  res.send('<h1>Hello World!</h1>');
});

app.listen(config.get('server.port'), () => {
  console.log('Server listening to localhost:' + config.get('server.port'));
});
