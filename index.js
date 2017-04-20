const express = require('express');
const bodyParser = require('body-parser');
const api = require('./src/api.js');
const indexRoute = require('./src/indexRoute.js');
const app = express();

app.set('port', process.env.PORT || 3000);

//  Disable X-Powered-By Header
app.disable('x-powered-by');

//  Configure express to use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  Static file
app.use(express.static(__dirname + '/public'));

//  Api Routers
app.use('/api', api);

//  React Routers   error routers will be resolved by React
app.use(indexRoute);

app.listen(app.get('port'), () => {
    console.log('Server listening on ' + app.get('port'));
});
