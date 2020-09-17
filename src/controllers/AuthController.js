const { User } = require('../models');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const config = require('../../config');

const AuthController = () => {
  const register = async (req, res) => {
    const {
      email,
      password,
      password2,
      firstName,
      lastName,
    } = req.body;

    if (password === password2) {
      try {
        const user = await User.create({
          email,
          password,
          firstName,
          lastName,
        });
        const token = authService().issue({ id: user.id });

        return res.status(200).json({ token, user });
      } catch (err) {
        console.log(err);
        return res.status(500).json(config.errorCodes.general.internalServerError);
      }
    }

    return res.status(400).json(config.errorCodes.auth.passwordsDontMatch);
  };

  const login = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      try {
        const user = await User.findOne({
          where: {
            email,
          },
        });

        if (!user) {
          return res.status(400).json(config.errorCodes.auth.userNotFound);
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });

          return res.status(200).json({ token, user });
        }

        return res.status(401).json(config.errorCodes.general.unauthorized);
      } catch (err) {
        console.log(err);
        return res.status(500).json(config.errorCodes.general.internalServerError);
      }
    }

    return res.status(400).json(config.errorCodes.auth.emailPasswordDoesntMatch);
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({
          isvalid: false,
          err: config.errorCodes.general.invalidToken,
        });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  return {
    register,
    login,
    validate,
  };
};

module.exports = AuthController;
