const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create express server
const app = express();

app.options('*', cors());
app.use(cors({ exposedHeaders: ['Content-Disposition', 'content-disposition'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  try {
    next();
  } catch (error) {
    res.status(404).send({});
  }
});

const library = require('./src/library');
app.use('/api/v1/library', cors({}), library.routes);

const transcription = require('./src/transcription');
app.use('/api/v1/transcription', cors({}), transcription.routes);

app.use((req, res, next) => {
  console.log('Sorry cant find that: ', req.path);
  res.status(404).send('Sorry cant find that!');
});

const httpServer = require('http').Server(app);
httpServer.listen('8080', () => {
  console.log('server running on port 8080');
});
