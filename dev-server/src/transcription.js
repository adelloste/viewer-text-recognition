const express = require('express');
const routes = express.Router();
const data = require('./payloads/data-transcription');

const handler = {
  routes: routes
};

routes.route('/').get((req, res) => {
  setTimeout(() => {
    res.setHeader('content-type', 'application/json');
    res.status(200).send(data.transcription);
  }, 300);
});

module.exports = handler;
