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
  '/example': 'http://example.com',
  '/some': '/thing',
  '/email': 'mailto:email@example.com'
}));

app.listen(3000, function () {
  console.log('listening on port 3000');
});
