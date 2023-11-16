const bcrypt = require("bcrypt");
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

      const {
        password,
        events,
        followers,
        following,
        friends,
        photos,
        posts,
        private,
        ...userDetails
      } = user._doc;

      return res.status(200).json({ user: userDetails });
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

      //Return only main details
      const userDetails = {
        _id: newUserDoc._id,
        firstName: newUserDoc.firstName,
        lastName: newUserDoc.lastName,
        username: newUserDoc.username,
        profilePicture: newUserDoc.profilePicture,
      };

      //Create coverPictures and profilePictures albums for a newly created user.
      await Album.insertMany([
        { name: "Profile pictures", userId: newUserDoc._id },
        { name: "Cover pictures", userId: newUserDoc._id },
      ]);

      return res.status(201).json({ user: userDetails });
    } catch (err) {
      next(err);
    }
  },
};
