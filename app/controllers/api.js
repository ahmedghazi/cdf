var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Cdf = mongoose.model('Cdf');

module.exports = function (app) {
    app.use('/api', router);
};

router.get('/', function (req, res, next) {
    Cdf.find(function (err, articles) {
        if (err) return next(err);
        res.send(articles);
    });
});

router.post('/c', function (req, res, next) {
    var cdf = new Cdf({
        title:req.body.title,
        pages:req.body.pages,
        size:"small",
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

router.post('/u/:id', function (req, res, next) {
    return Cdf.findById(req.body.id, function (err, cdf) {
        if (err) {
            return next(err);
        }
//console.log(Helpers)
        cdf.title = req.body.title;
        cdf.pages = req.body.pages;
        //cdf.size = req.body.size.toLowerCase();
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