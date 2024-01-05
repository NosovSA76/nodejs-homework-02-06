const bcrypt = require("bcryptjs");
const { User } = require("../../models/users");
const {HttpError, ctrlWrapper} = require("../../helpers/index");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar")
const {SECRET_KEY} = process.env;

 const register = async (req, res, next) => {
    const { password, email } = req.body;
  
    const generateToken = async (newUser, statusCode, res) => {
      const user = await User.findOne({ email });
  
      if (!user) throw HttpError(401, 'Email or password is wrong');
  
      const payload = {
        id: user._id,
      };
  
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
      await User.findByIdAndUpdate(user._id, { token });
  
      res.status(statusCode).json({
        
          user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL: newUser.avatarURL,
        },
      });
    };
  
    try {
      const user = await User.findOne({ email }).exec();
  
      if (user) throw HttpError(409, 'Email in use');
  
      const passwordHash = await bcrypt.hash(password, 10);
      const avatarURL = gravatar.url(email);
  
      const newUser = await User.create({
        ...req.body,
        password: passwordHash,
        avatarURL,
      });
  
      generateToken(newUser, 201, res);

    } catch (error) {
      next(error);
    }
  };


module.exports = {
    register: ctrlWrapper(register)
};