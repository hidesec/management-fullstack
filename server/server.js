'use strict';

var path = require('path');
var loopback = require('loopback');
var boot = require('loopback-boot');
require('dotenv').config();

var app = module.exports = loopback();

// Middleware untuk menyajikan file statis
var publicPath = path.resolve(__dirname, '../public');
app.use(loopback.static(publicPath));

// Bootstrap the application, configure models, datasources, and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // Fallback ke index.html untuk Ember.js routes
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(publicPath, 'index.html'));
  });

  // Start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});

app.start = function() {
  // Start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
