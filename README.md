# express-simple-redirect

[![Build Status](https://travis-ci.org/danielthepope/express-simple-redirect.svg?branch=master)](https://travis-ci.org/danielthepope/express-simple-redirect) [![Dependency Status](https://dependencyci.com/github/danielthepope/express-simple-redirect/badge)](https://dependencyci.com/github/danielthepope/express-simple-redirect)

This module takes express routes and redirects them to external or internal URLs.

It is very similar to `redirects` on [NPM](https://libraries.io/npm/redirects). In fact, I based my tests on the tests in `redirects`. The difference between the two is my one doesn't rely on any other external libraries, so doesn't have as many features, hence the name 'simple'.

```
npm install express-simple-redirect --save
```

## Basic usage

``` javascript
var redirect = require('express-simple-redirect');

// a bunch of express route definitions

app.use(redirect({
  '/my-url': 'http://example.com',  // Redirect to external URL
  '/info': '/about'                 // Internal redirect to /about page
}));
```

## Custom response code

You can also add a [redirect HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#3xx_Redirection). By default, this code is 307 (Temporary Redirect). You may wish to change it to 301 for a permanent redirection by doing:

``` javascript
app.use(redirect({
  // urls
}, 301));
```

*Note: Response code 301 adds an entry to the client browser cache, meaning that the browser won't hit your server again. 301 is not recommended for routes that may change.*

## Loading from a file

You may want to separate your redirects even further by putting them in a different file. This library doesn't have any special way of parsing files, so you need to convert it into a JavaScript object first. The easiest way to do this is by writing your redirects as a JSON file, then you can load it by using `require()`.

`redirects.json`

``` json
{
  "/url": "http://www.example.com",
  "/info": "/about",
  ...
}
```

`app.js`

``` javascript
app.use(redirect(require('./redirects.json')));
```

