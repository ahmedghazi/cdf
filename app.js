
/**
 * This is an Express app instance, extended by express rapido
 * @type ExpressRapido
 */
var app = require('./config/expressRapido.js')();

app.set('title', 'CDF');
app.set('appDbName', 'cdf');

//boot the app
app.boot();

console.log("start app")

//register some models
app.registerModel('User', 'user');
app.registerModel('Option', 'option');
app.registerModel('Cdf', 'cdf');
app.registerModel('Pages', 'pages');

//register some controllers
app.registerController('request');
app.registerController('security');
app.registerController('home');
app.registerController('api');

app.registerController('error404');
app.registerController('error');

//register some route
app.registerRouteConfig('', app.getController('request'));
app.registerRouteConfig('/security', app.getController('security').router);
app.registerRouteConfig('/', app.getController('home').router);
app.registerRouteConfig('/api', app.getController('api').router);

app.registerRouteConfig('', app.getController('error404').router);
app.registerRouteConfig('', app.getController('error'));

module.exports = app;
