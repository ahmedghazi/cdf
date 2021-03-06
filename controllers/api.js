var ApiController = function(app) {
	var express = require('express');
    this.router = express.Router();
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.ObjectId;
    var Cdf = app.getModel('Cdf');

    // Routes

    

    // FORM POST    
/*    this.router.get('/c', function(req, res){
        return res.render('create', {
            title: app.get('title'),
            description: "Create"
        });
    });
*/


    // POST UPDATE
    this.router.post('/c', function(req, res, next){
        var cdf = new Cdf({
            title:req.body.title,
            pages:req.body.pages,
            size:req.body.size.toLowerCase(),
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
            cdf.size = req.body.size.toLowerCase();
            //cdf.content = req.body.content;
            //console.log(req.body.content)
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
