const logger = require("./logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: err.message });
  }
  next(err);
};

const tokenExtractor = (req, res, next) => {
  const auth = req.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    req.token = auth.substring(7);
  }
  next()
};

module.exports = { errorHandler, tokenExtractor };
