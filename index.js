module.exports = function (urls, status) {
  var VALID_STATUSES = [301, 302, 307, 308];
  var DEFAULT_STATUS = 307;

  if (urls === undefined || !(urls instanceof Object)) {
    console.error("ERROR: Parameter 'urls' must be an Object. express-simple-redirect disabled.");
    return failure;
  }

  var httpStatus = status || DEFAULT_STATUS;
  if (VALID_STATUSES.indexOf(httpStatus) === -1) {
    console.error('WARN: Invalid status supplied to express-simple-redirect. Using code 307 for redirects.');
    httpStatus = DEFAULT_STATUS;
  }

  // Make sure all keys start with '/'
  Object.keys(urls).forEach(function (key) {
    var newKey = key;
    if (key.indexOf('/') !== 0) {
      newKey = '/' + key;
      urls[newKey] = urls[key];
      urls[key] = undefined;
    }
  });

  return function (request, response, next) {
    if (urls[request.originalUrl]) {
      response.redirect(httpStatus, urls[request.originalUrl]);
    } else {
      next();
    }
  }
}

/** This function is used if the provided 'urls' parameter is invalid. */
function failure(request, response, next) {
  next();
}
