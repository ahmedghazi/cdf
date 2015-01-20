var mongoose = require('mongoose');
var Pages = require('../config/schemas/pages');
module.exports = mongoose.model('Pages', Pages);
