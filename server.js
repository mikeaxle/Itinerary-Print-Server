var express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  bodyParser = require('body-parser'),
  cors = require('cors');
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors())
  
  var routes = require('./api/routes/print');
  var routes2 = require('./api/routes/liveUrl');

  routes(app); //register the route
  routes2(app)

  app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

  app.listen(port, () => {
      console.log('print server api started on: ' + port);
  });
  
