import { Router } from 'express';
import { transcription } from '../payloads/data-transcription';

export const transcriptionRouter = Router();

let currentTranscription = { ...transcription };

// get transcription by id
transcriptionRouter.get('/:id', (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.status(200).send(currentTranscription);
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
