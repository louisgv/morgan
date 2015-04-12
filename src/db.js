var mongo = require('mongodb'),
    monk =  require('monk');

module.exports = monk("localhost:27017/whosturndb");
