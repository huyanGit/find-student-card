const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const HttpError = require('some-http-error');
const controllers = require('./controllers');
const middlewares = require('./middlewares');

mongoose.connect('mongodb://localhost/findcard');
app.set('views', './views/pages')
app.set('view engine', 'pug')
app.use(bodyParser.json());
app.use(middlewares.response);
app.locals.moment = require('moment')
app.use(express.static(path.join(__dirname, 'public')))
app.use(controllers);
app.use(() => {throw new HttpError.NotFoundError('Path not found!')});
app.use(middlewares.errorHandling);

if ('production' !== process.env.NODE_ENV) {
  app.set('json spaces', 4);
  app.set('showStackError', true);
}

app.listen(3000);

console.log('App started on port ' + 3000);
module.exports = app;
