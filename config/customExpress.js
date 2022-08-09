const express = require('express');
const consing = require('consign');
const bodyParser = require('body-parser');
var cors = require('cors');

module.exports = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  app.use(cors());

  consing().include('controllers').into(app);

  return app;
};
