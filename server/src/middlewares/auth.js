const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

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
