const express = require('express');
const routes = express.Router();
const data = require('./payloads/data-library');
const uuid = require('uuid');

let currentLibrary = {
  ...data.library
};

const handler = {
  routes: routes
};

routes.route('/').get((req, res) => {
  setTimeout(() => {
    res.setHeader('content-type', 'application/json');
    res.status(200).send(currentLibrary);
  }, 300);
});

routes.route('/collection').post((req, res) => {
  setTimeout(() => {
    currentLibrary = {
      ...currentLibrary,
      collections: [
        ...currentLibrary.collections,
        {
          id: uuid.v4(),
          date: '18/12/2022',
          ...req.body
        }
      ]
    };
    res.setHeader('content-type', 'application/json');
    res.status(200).send();
  }, 300);
});

routes.route('/collection/:id').delete((req, res) => {
  setTimeout(() => {
    const { id } = req.params;

    currentLibrary = {
      ...currentLibrary,
      collections: [...currentLibrary.collections.filter(c => c.id !== id)]
    };
    res.setHeader('content-type', 'application/json');
    res.status(200).send();
  }, 300);
});

module.exports = handler;
