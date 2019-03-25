var Hapi = require('hapi'),
  Path = require('path');

var server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'ui')
      }
    }
  }
});

var port = process.env.PORT || 8080;

require('./lib/api').initPort(port);

server.connection({ port: port });

// setting up socket.io connection
var io = require('socket.io')(server.listener);
require('./events').register(io);

server.register([require('inert'), require('vision')], function (err) {
  if (err) throw err;

  server.views({
    engines: { html: require('handlebars') },
    relativeTo: __dirname,
    path: 'ui/templates',
    helpersPath: 'ui/helpers'
  });

  require('./lib/dataStore').init();

  server.route(require('./routes'));
  server.start(function (err) {
    if (err) throw err;
    console.log('Connected on ' + server.info.uri);
  });
});
