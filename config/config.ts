/**
 * Created by Voislav on 7/16/2016.
 */
let convict = require('convict');
let fs = require('fs');

let config = convict({
  env: {
    doc: 'Application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'node-env'
  },
  server: {
    ip: {
      doc: 'IP address to bind',
      format: 'ipaddress',
      default: '0.0.0.0'
    },
    port: {
      doc: 'port to bind',
      format: 'port',
      default: 9000
    }
  },
  database: {
    host: {
      doc: 'Database host name/IP',
      format: String,
      default: 'testing'
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'users'
    }
  }
});

let env = config.get('env');

config.loadFile('./config/' + env + '.json');

if (fs.existsSync('./' + env + '.local.json')) {
  config.loadFile('./config/' + env + '.local.json');
}

export = config;
