var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'cdf'
    },
    port: 3003,
    db: 'mongodb://localhost/cdf-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'cdf'
    },
    port: 3003,
    db: 'mongodb://localhost/cdf-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'cdf'
    },
    port: 3003,
    db: 'mongodb://localhost/cdf-production'
  }
};


module.exports = config[env];
