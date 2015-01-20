var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cdf = mongoose.Schema({
    date: {type: Date, default: Date.now},
    title: {type: String},
    pages: {type: Number},
 	content: {type: String},
 	content_version: {type: Array}
}, {
    //versionKey: false
});
module.exports = Cdf;