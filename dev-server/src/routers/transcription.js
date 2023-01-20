import { Router } from 'express';
import { assets } from '../config';
import { transcription } from '../payloads/data-transcription';

export const transcriptionRouter = Router();

let currentTranscription = { ...transcription };

// get transcription by id
transcriptionRouter.get('/:id', (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.status(200).send(currentTranscription);
});

// add segmentations to transcription
transcriptionRouter.patch('/:id/segmentations', (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.status(200).send(currentTranscription);
});

// add annotations to transcription
transcriptionRouter.patch('/:id/annotations', (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.status(200).send(currentTranscription);
});

// update transcription
transcriptionRouter.post('/:id', (req, res) => {
  const itemId = req.params.id;
  const data = req.body;

  currentTranscription = data;
  res.setHeader('content-type', 'application/json');
  res.status(200).send(data);
});

// donwload transcription
transcriptionRouter.get('/:id/download', (req, res) => {
  const file = `${assets}/dummy.pdf`;
  res.download(file);
});
