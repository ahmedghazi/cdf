// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CdfSchema = new Schema({
	date: {type: Date, default: Date.now},
	title: {type: String},
	pages: {type: Number},
	size: {type: String},
	content: {type: String},
	content_version: {type: Array}
});

/*
CdfSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });
*/

mongoose.model('Cdf', CdfSchema);

