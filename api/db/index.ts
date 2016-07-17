/**
 * Created by Voislav on 7/16/2016.
 */

let mongoose = require('mongoose');
let config = require('../../config/config');
import debug = require('debug');
let log = debug('app:db');
let dbHost = config.get('database.host');
let connection;

export let connect = () => {
  if (connection) {
    return;
  }

  mongoose.connect(dbHost);

  connection = mongoose.connection;

  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', () => {
    log('we are connected');
  });

  // when the connection is disconnected
  connection.on('disconnected', () => {
    console.log('Mongoose default connection to DB :' + dbHost + ' disconnected');
  });
};

let gracefulExit = () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection with DB :' + dbHost + ' is disconnected through app termination');
    process.exit(0);
  });
};

// if the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
