/**
 * Created by Voislav on 7/16/2016.
 */

let mongoose = require('mongoose');
let config = require('../../config/config');

export let connect = () => {
  mongoose.connect(config.get('database.host'));

  let connection = mongoose.connection;

  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', () => {
    console.log('we are connected');
  });
};
