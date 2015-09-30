var HomeController = function(rapido) {
    var express = require('express');
    this.router = express.Router();
    var Cdf = rapido.getModel('cdf');

    //Listen for route /
    this.router.get('/', function(req, res) {
        return res.render('new', {
            title: "CDF"
        });
    });

    this.router.get('/cdf/:id', function(req, res) {
        //console.log(req.params.id)
        return Cdf.findById(req.params.id).exec(function(err, cdf) {
            if (err) {
                //return next(err);
            }

            return res.render('cdf', {
                title: "CDF",
                cdf: cdf
            });
        });
    });

    this.router.get('/cdf/:id/:v', function(req, res) {
        //console.log(req.params.id, req.params.v)
        return Cdf.findOne( { _id: req.params.id }, function(err, cdf){
        //return Cdf.findById(req.params.id).exec(function(err, cdf) {
            if (err) {
                //return next(err);
            }
            var content = cdf.content_version[req.params.v-1];
            //console.log(content)
            return res.render('cdf-v', {
                title: "CDF",
                version: req.params.v,
                num_versions: cdf.content_version.length,
                cdf: cdf,
                content:content
            });
        });
    });

    //Listen for route /
    this.router.get('/about', function(req, res) {
        return res.render('about', {
            title: "CDF",
            h2: "About",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        });
    });

    //Listen for route /
    this.router.get('/contact', function(req, res) {
        return res.render('contact', {
            title: "CDF",
            h2: "Contact",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        });
    });

    return this;
};

module.exports = HomeController;