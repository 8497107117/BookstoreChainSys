const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const api = require('./src/api.js');
const indexRoute = require('./src/indexRoute.js');
const app = express();

app.set('port', process.env.PORT || 3000);

//  Disable X-Powered-By Header
app.disable('x-powered-by');

//  Configure express to use bodyParser
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Token");
  next();
});

//  Static file
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/semantic'));

//  Api Routers
app.use('/api', api);

//  React Routers   error routers will be resolved by React
app.use(indexRoute);

app.listen(app.get('port'), () => {
  console.log('Server listening on ' + app.get('port'));
});
