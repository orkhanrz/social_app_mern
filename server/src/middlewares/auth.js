const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const {cookie} = req.headers;
  const token = cookie?.split(";")[1]?.split('=')[1];

  console.log('token:', token);
  console.log('cookie:', cookie);

  if (!token) {
    return res.status(403).json({ message: "You are not authorized!" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!verified) {
        return res.status(403).json({ message: "Token expired!" });
    }

    const user = jwt.decode(token);

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
