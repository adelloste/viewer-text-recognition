const express = require('express');
const routes = express.Router();
const data = require('./payloads/data-transcription');

let currentTranscription = {
  ...data.transcription
};

const handler = {
  routes: routes
};

routes
  .route('/:id')
  .get((req, res) => {
    setTimeout(() => {
      res.setHeader('content-type', 'application/json');
      res.status(200).send(currentTranscription);
    }, 300);
  })
  .post((req, res) => {
    setTimeout(() => {
      const itemId = req.params.id;
      const data = req.body;

      currentTranscription = {
        ...currentTranscription,
        annotations: [...data]
      };
      res.setHeader('content-type', 'application/json');
      res.status(200).send();
    }, 300);
  });

module.exports = handler;
