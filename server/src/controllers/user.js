const userController = require("../controllers/user");
const User = require("../models/user");

module.exports = {
  getUser: async (req, res, next) => {
    const username = req.params.username;

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      const { password, ...userDetails } = user._doc;

      return res.status(200).json(userDetails);
    } catch (err) {
      next(err);
    }
  },
};
