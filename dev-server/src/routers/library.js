import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import { assets } from '../config';
import { library } from '../payloads/data-library';

export const libraryRouter = Router();

let currentLibrary = { ...library };

// get current library
libraryRouter.get('/', (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.status(200).send(currentLibrary);
});

// create collection
libraryRouter.post('/collection', (req, res) => {
  const collection = {
    id: uuidv4(),
    creation_date: '18/12/2022',
    last_update: '18/12/2022',
    count_pages: 0,
    count_lines: 0,
    children: [],
    ...req.body
  };
  currentLibrary = {
    ...currentLibrary,
    collections: [...currentLibrary.collections, collection]
  };
  res.setHeader('content-type', 'application/json');
  res.status(200).send(collection);
});

// edit collection
libraryRouter.patch('/collection/:id', (req, res) => {
  const { id } = req.params;
  currentLibrary = {
    ...currentLibrary,
    collections: currentLibrary.collections.map(c => ({
      ...c,
      ...(c.id === id && req.body)
    }))
  };
  const currentCollection = currentLibrary.collections.find(c => c.id === id);
  res.setHeader('content-type', 'application/json');
  res.status(200).send(currentCollection);
});

// delete collection by id
libraryRouter.delete('/collection/:id', (req, res) => {
  const { id } = req.params;
  currentLibrary = {
    ...currentLibrary,
    collections: currentLibrary.collections.filter(c => c.id !== id)
  };
  res.setHeader('content-type', 'application/json');
  res.status(200).send();
});

// get collection by id
libraryRouter.get('/collection/:id', (req, res) => {
  const { id } = req.params;
  const currentCollection = currentLibrary.collections.find(c => c.id === id);
  res.setHeader('content-type', 'application/json');
  res.status(200).send(currentCollection);
});

// delete node by id form collection
const recursiveRemove = (list, id) => {
  return list
    .map(item => {
      return { ...item };
    })
    .filter(item => {
      if ('children' in item) {
        item.children = recursiveRemove(item.children, id);
      }
      return item.id !== id;
    });
};

libraryRouter.delete('/collection/:idCollection/node/:idNode', (req, res) => {
  const { idCollection, idNode } = req.params;
  currentLibrary = {
    ...currentLibrary,
    collections: recursiveRemove(currentLibrary.collections, idNode)
  };
  res.setHeader('content-type', 'application/json');
  res.status(200).send(currentLibrary);
});

// upload file
const upload = multer();

libraryRouter.post('/collection/:id/upload', upload.any(), (req, res) => {
  const { id } = req.params;
  res.setHeader('content-type', 'application/json');
  res.status(200).send();
});

// donwload file
libraryRouter.get('/collection/:id/download', (req, res) => {
  const file = `${assets}/dummy.pdf`;
  res.download(file);
});
