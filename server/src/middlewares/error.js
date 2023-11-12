errorMiddleware = (err, req, res, next) => {
  const message = err.message || "Something went wrong!";
  const status = err.status || 500;
  const stack = err.stack || {};

  console.log(err);

  res.status(status).json({ message, stack });
};

module.exports = errorMiddleware;