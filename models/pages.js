var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pages = mongoose.Schema({
 	content: {type: String},
 	page: {type: Number}
}, {
    //versionKey: false
});
module.exports = Pages;