var express = require('express');
var redirect = require('../index.js');

var app = express();

app.get('/', function (request, response) {
  response.send('hello world');
});

app.get('/thing', function (request, response) {
  response.send('this is /thing');
});

app.use(redirect({
  '/google': 'https://google.com',
  '/twitter': 'https://twitter.com',
  '/some': '/thing'
}));

app.listen(3000, function () {
  console.log('listening on port 3000');
});
