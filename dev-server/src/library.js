const express = require('express');
const routes = express.Router();
const data = require('./payloads/data-library');
const path = require('path');
const uuid = require('uuid');
const multer = require('multer');
const upload = multer();

const root = path.resolve('.');
const assetsFolder = root + '/assets';

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
          creation_date: '18/12/2022',
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

routes.route('/collection/:id').get((req, res) => {
  setTimeout(() => {
    const { id } = req.params;
    current_collection = [...currentLibrary.collections.filter(c => c.id === id)];
    res.setHeader('content-type', 'application/json');
    res.status(200).send(current_collection);
  }, 300);
});

routes.route('/collection/:id/upload').post(upload.any(), (req, res) => {
  setTimeout(() => {
    const { id } = req.params;

    console.log(id);
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.status(200).send();
  }, 300);
});

routes.route('/collection/:id/download').get((req, res) => {
  const args = req.params.args;
  const file = `${assetsFolder}/dummy.pdf`;
  res.download(file);
});

module.exports = handler;
