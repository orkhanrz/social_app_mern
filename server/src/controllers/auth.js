const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Album = require("../models/album");

module.exports = {
  login: async (req, res, next) => {
    const { email: emailInput, password: passwordInput } = req.body;

    try {
      const user = await User.findOne({ email: emailInput });

      if (!user) {
        return res.status(403).json({ email: "User not found!" });
      }

      const verify = await bcrypt.compare(passwordInput, user.password);

      if (!verify) {
        return res.status(403).json({ password: "Password is not valid!" });
      }

      const { password, ...userDetails } = user._doc;
      const token = jwt.sign(userDetails, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
      });

      return res
        .cookie("token", token, {
          maxAge: 20 * 1000,
          httpOnly: true,
          secure: true,
          sameSite: true,
        })
        .status(200)
        .json({ user: userDetails });
    } catch (err) {
      next(err);
    }
  },
  signup: async (req, res, next) => {
    const { firstName, lastName, email, gender } = req.body;
    const { month, day, year } = req.body.dob;
    //Update date to JS date
    const dob = new Date(`${month}/${Number(day) + 1}/${year}`);
    //Create username
    const username = email.split("@")[0];

    console.log(res);

    try {
      //Check if user with same email exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(500).json({ message: "User already exists" });
      }

      //Hash password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        username,
        dob,
        gender,
        password: hashedPassword,
      });

      await newUser.save();
      const newUserDoc = newUser._doc;

      //Create coverPictures and profilePictures albums for a newly created user.
      await Album.insertMany([
        { name: "Profile pictures", userId: newUserDoc._id },
        { name: "Cover pictures", userId: newUserDoc._id },
      ]);

      //Return only main details
      const { password, ...userDetails } = newUserDoc;
      const token = jwt.sign(userDetails, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
      });

      return res
        .cookie("token", token, {
          maxAge: 5 * 60 * 1000,
          httpOnly: true,
          secure: true,
          sameSite: true,
        })
        .status(201)
        .json({ user: userDetails });
    } catch (err) {
      next(err);
    }
  },
};
