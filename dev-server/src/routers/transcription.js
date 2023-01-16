import { Router } from 'express';
import { transcription } from '../payloads/data-transcription';

export const transcriptionRouter = Router();

let currentTranscription = { ...transcription };

// get transcription by id
transcriptionRouter.get('/:id', (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.status(200).send(currentTranscription);
});

// get transcription's segmentations by id
transcriptionRouter.get('/:id/segmentations', (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.status(200).send(currentTranscription);
});

// get transcription's annotations by id
transcriptionRouter.get('/:id/annotations', (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.status(200).send(currentTranscription.annotations);
});

// update transcription
transcriptionRouter.post('/:id', (req, res) => {
  const itemId = req.params.id;
  const data = req.body;

  currentTranscription = {
    ...currentTranscription,
    annotations: [...data]
  };
  res.setHeader('content-type', 'application/json');
  res.status(200).send();
});
