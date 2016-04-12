# express-simple-redirect
This module takes express routes and redirects them to external URLs.

```
npm install express-simple-redirect --save
```

``` javascript
var redirects = require('express-simple-redirect');

// a bunch of express route definitions

app.use(redirects({
  '/my-url':'http://example.com'
}));
```

You can also add a [redirect HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#3xx_Redirection). By default, this code is 307 (Temporary Redirect). You may wish to change it to 301 for a permanent redirection by doing:

``` javascript
app.use(redirects({
  // urls
}, 301));
```
