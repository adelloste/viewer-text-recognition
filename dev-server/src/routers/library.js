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
  currentLibrary = {
    ...currentLibrary,
    collections: [
      ...currentLibrary.collections,
      {
        id: uuidv4(),
        creation_date: '18/12/2022',
        ...req.body
      }
    ]
  };
  res.setHeader('content-type', 'application/json');
  res.status(200).send();
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
  const currentCollection = currentLibrary.collections.filter(c => c.id === id);
  res.setHeader('content-type', 'application/json');
  res.status(200).send(currentCollection);
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
