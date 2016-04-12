module.exports = function(urls, status) {
  var httpStatus = status || 307;

  return function(request, response, next) {
    if (urls[request.originalUrl]) {
      response.writeHead(httpStatus, {
        Location: urls[request.originalUrl]
      });
      response.end();
    } else {
      next();
    }
  }
}
