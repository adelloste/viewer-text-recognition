import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { config } from './config';
import { delayer } from './middlewares/delayer';
import { errorHandler } from './middlewares/error-handler';
import { libraryRouter } from './routers/library';
import { transcriptionRouter } from './routers/transcription';

// create express server
const app = express();
// parse body request as json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('public'));
// set middlewares
app.use(morgan('dev'));
app.use(delayer(config.delay));
// routers
app.use('/api/v1/library', libraryRouter);
app.use('/api/v1/transcription', transcriptionRouter);
// set error handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log('server running on port 8080');
});
