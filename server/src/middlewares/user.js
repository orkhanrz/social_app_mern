module.exports = {
  signUpValidate(req, res, next) {
    const errors = {};

    const { firstName, lastName, password, email, gender } = req.body;

    if (!firstName) {
      errors.firstName = "Please enter your first name!";
    }

    if (!lastName) {
      errors.lastName = "Please enter your last name!";
    }

    if (!password) {
      errors.password = "Please enter your password!";
    }

    if (!email) {
      errors.email = "Please enter your email!";
    }

    if (!gender) {
      errors.gender = "Please enter your gender!";
    }

    return Object.keys(errors).length ? res.status(403).json(errors) : next();
  },
  loginValidate: (req, res, next) => {
    const errors = {};

    const { password, email } = req.body;

    if (!email) {
      errors.email = "Please enter your email!";
    }

    if (!password) {
      errors.password = "Please enter your password!";
    }

    return Object.keys(errors).length ? res.status(403).json(errors) : next();
  },
};
