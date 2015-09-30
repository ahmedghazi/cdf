var ApiController = function(rapido) {
	var express = require('express');
    this.router = express.Router();
    //var ObjectId = mongoose.Schema.ObjectId;
    var Cdf = rapido.getModel('cdf');
    //var Helpers = require('helpers');

    // Routes



    // POST UPDATE
    this.router.post('/c', function(req, res, next){
        var cdf = new Cdf({
            title:req.body.title,
            pages:req.body.pages,
            date: new Date()
        });

        cdf.save(function (err) {
            if (!err) {
                //sess.user = user;
                return res.send({ success: true, response: cdf });
            } else {
                return console.log(err);
            }
        });
    });


    // POST UPDATE
    this.router.post('/u/:id', function(req, res, next){
        //console.log("params : ",req.body);
        return Cdf.findById(req.body.id, function (err, cdf) {
            if (err) {
                return next(err);
            }
//console.log(Helpers)
            cdf.title = req.body.title;
            cdf.pages = req.body.pages;
            //cdf.content = req.body.content;
            console.log(req.body.content)
            cdf.content_version.push(req.body.content);
//console.log(cdf.content_version.length)
            cdf.save(function (err) {
                if (!err) {
                    var version = cdf.content_version.length
                    return res.send({ success: true, response: "Updated", version:version });
                    //return console.log("updated");
                } else {
                    return console.log(err);
                    
                }
            });
            
            //
        });
    });

  


    return this;
};


module.exports = ApiController;