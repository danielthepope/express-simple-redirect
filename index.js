module.exports = function(urls, status) {
  var VALID_STATUSES = [301, 302, 307, 308];
  var DEFAULT_STATUS = 307;
  var redirects = {};
  
  if (urls === undefined || !(urls instanceof Object)) {
    console.error("ERROR: Parameter 'urls' must be an Object. Express-simple-redirect disabled.");
    return failure;
  }
  
  var httpStatus = status || DEFAULT_STATUS;
  if (VALID_STATUSES.indexOf(httpStatus) === -1) {
    console.error('WARN: Invalid status supplied. Using code 307 for redirects.');
    httpStatus = DEFAULT_STATUS;
  }
  
  console.log('express-simple-redirect {');
  Object.keys(urls).forEach(function(key) {
    var newKey = key;
    if (key.indexOf('/') !== 0) {
      newKey = '/' + key;
    }
    var newUrl = urls[key];
    if (urls[key].indexOf('/') !== 0 && urls[key].match(/^https?:\/\//i) === null) {
      newUrl = '/' + newUrl;
    }
    redirects[newKey] = newUrl;
    console.log('  ' + newKey + ' -> ' + newUrl);
  });
  console.log('}');

  return function(request, response, next) {
    if (redirects[request.originalUrl]) {
      response.writeHead(httpStatus, {
        Location: redirects[request.originalUrl]
      });
      response.end();
    } else {
      next();
    }
  }
}

/** This function is used if the provided 'urls' parameter is invalid. */
function failure(request, response, next) {
  next();
}
