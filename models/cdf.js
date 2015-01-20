var mongoose = require('mongoose');
var Cdf = require('../config/schemas/cdf');
module.exports = mongoose.model('Cdf', Cdf);
