var redirect = require('../');
var express = require('express');
var request = require('supertest');

describe('redirect middleware', function () {

  it('skips the middleware if there are no redirects configured', function (done) {
    var app = express()
      .use(redirect({}));

    request(app)
      .get('/')
      .expect(404)
      .end(done);
  });

  it('skips middleware when there are no matching redirects', function (done) {
    var app = express()
      .use(redirect({
        '/source': '/redirect'
      }));

    request(app)
      .get('/none')
      .expect(404)
      .end(done);
  });

  it('redirects to a configured redirects object with a default status code of 307', function (done) {
    var app = express()
      .use(redirect({
        '/source': '/redirect'
      }));

    request(app)
      .get('/source')
      .expect(307)
      .expect('location', '/redirect')
      .end(done);
  });

  it('redirects to a configured path with a custom status code', function (done) {
    var app = express()
      .use(redirect({
        '/source': '/redirect'
      }, 301));

    request(app)
      .get('/source')
      .expect(301)
      .expect('location', '/redirect')
      .end(done);
  });

  it('adds leading slash to source paths', function (done) {
    var app = express()
      .use(redirect({
        'source': '/redirect'
      }));

    request(app)
      .get('/source')
      .expect(307)
      .expect('location', '/redirect')
      .end(done);
  });

  it('redirects to external url', function (done) {
    var app = express()
      .use(redirect({
        '/source': 'http://example.com'
      }));

    request(app)
      .get('/source')
      .expect(307)
      .expect('Location', 'http://example.com')
      .end(done);
  });

  it('redirects to external url over https', function (done) {
    var app = express()
      .use(redirect({
        '/source': 'https://example.com'
      }));

    request(app)
      .get('/source')
      .expect(307)
      .expect('Location', 'https://example.com')
      .end(done);
  });
});

describe('bad inputs', function () {
  it('redirects using 307 if the provided status is invalid', function (done) {
    var app = express()
      .use(redirect({
        '/source': 'https://example.com'
      }, 123));

    request(app)
      .get('/source')
      .expect(307)
      .expect('Location', 'https://example.com')
      .end(done);
  });

  it('redirects using 307 if the provided status is the wrong type', function (done) {
    var app = express()
      .use(redirect({
        '/source': 'https://example.com'
      }, {}));

    request(app)
      .get('/source')
      .expect(307)
      .expect('Location', 'https://example.com')
      .end(done);
  });

  it('doesn\'t break if the provided url object is the wrong type', function (done) {
    var app = express()
      .use(redirect("invalid data"));

    request(app)
      .get('/0')
      .expect(404)
      .end(done);
  });
});
