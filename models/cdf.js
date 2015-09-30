var Cdf = function (rapido) {
	//console.log("=========================== ASS")
    var Schema = require('./schemas/cdf');
   
    var cdf = new Schema(rapido);
    return rapido.mongoose.model('Cdf', cdf);
};
module.exports = Cdf;