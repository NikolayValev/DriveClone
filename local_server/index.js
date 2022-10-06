const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./router.js');
const fileUpload = require('express-fileupload');

const app = express();

const APP_PORT =
  (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

app.use(bodyParser.json());
//app.use(errorHandler.bodyParser);
app.use(express.json());
app.use(fileUpload());
// API Routes
app.use('/api', routes);

app.listen(app.get('port'), app.get('host'), () => {
  console.log(`Server started at http://${app.get('host')}:${app.get('port')}/api`);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaught exception', err);
  process.exit(1);
});