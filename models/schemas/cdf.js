var Cdf = function (rapido) {
    var schema = new rapido.mongoose.Schema({
        date: {type: Date, default: Date.now},
        title: {type: String},
        pages: {type: Number},
     	content: {type: String},
     	content_version: {type: Array}
    });
    return schema;
};

module.exports = Cdf;
