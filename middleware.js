function logRequest(req, res, next) {
  const logString = `[${new Date().toISOString()}] ${req.method} ${req.url}`;
  console.log(logString);
  next();
}

module.exports = { logRequest };
